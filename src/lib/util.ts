import { auth } from "@clerk/nextjs/server";

const { userId, sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role: string })?.role;
// Get role
export const getRole = async () => {
  return role;
};

// Get user id
export const getUserId = async () => {
  return userId;
};