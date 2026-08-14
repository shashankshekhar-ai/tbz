import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Insights pagination" className="flex items-center justify-center gap-2 pt-4">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
        className={`px-3 py-2 rounded-lg text-sm font-inter font-medium border border-[#D9E3E6] transition-colors ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "text-[#0c2940] hover:border-[#39918d] hover:text-[#39918d]"
        }`}
      >
        Previous
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-inter font-medium transition-colors ${
            page === currentPage
              ? "bg-[#0c2940] text-white"
              : "text-[#0c2940] border border-[#D9E3E6] hover:border-[#39918d]"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`px-3 py-2 rounded-lg text-sm font-inter font-medium border border-[#D9E3E6] transition-colors ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "text-[#0c2940] hover:border-[#39918d] hover:text-[#39918d]"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
