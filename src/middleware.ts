import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routeAccessMap } from './lib/settings'
import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher(['/admin', '/teacher'])
// In the setting.ts, route is the key, role is the value[]
// Add settings in .env, redirect to own page
const matchers = Object.keys(routeAccessMap).map(route => (
  {
    matcher: createRouteMatcher(route),
    allowedRoles: routeAccessMap[route]
  }
))

export default clerkMiddleware(async (auth, req) => {

  // get session
  const { sessionClaims } = await auth();

  // get role value from session
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // check if the role is allowed to access the route
  for (const { matcher, allowedRoles } of matchers) {
    // forces authentication for protected routes
    // reduces unnecessary authentication checks
    if (matcher(req)) {
      await auth.protect();

      if (!role || !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(`/${role || 'unauthorized'}`, req.url))
      }
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}