'use client'
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage, count
}: {
  currentPage: number, count: number
}) => {

  // Get last page
  const lastPage = Math.ceil(count / ITEM_PER_PAGE);

  // Handle the page change, set page to query url
  const router = useRouter();
  const handleChangePage = (selectedPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', selectedPage.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-between items-center p-4 text-gray-500">
      <button
        onClick={() => handleChangePage(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage <= 1}
        className="py-2 px-4 rounded-md bg-slate-200 
      font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex justify-between items-center text-sm gap-2">
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                onClick={() => handleChangePage(pageIndex)}
                key={index}
                className={`px-2 rounded-sm ${pageIndex === currentPage ? "bg-CSky" : "bg-slate-200"}`}
              >{pageIndex}
              </button>
            )
          }
        )}
      </div>
      <button
        onClick={() => handleChangePage(currentPage < lastPage ? currentPage + 1 : lastPage)}
        disabled={currentPage >= lastPage}
        className="py-2 px-4 rounded-md bg-slate-200 
      font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
