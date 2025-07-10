import {
  BASE_LIMIT_VISIBLE_PAGINATION,
  ELLIPSIS,
} from '@/constants/constants.ts';

export const getPaginationPages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = BASE_LIMIT_VISIBLE_PAGINATION
): (number | string)[] => {
  const pages: (number | string)[] = [];

  const half: number = Math.floor(maxVisible / 2);
  let start: number = Math.max(2, currentPage - half);
  let end: number = Math.min(totalPages - 1, currentPage + half);

  if (currentPage <= half + 1) {
    start = 2;
    end = Math.min(totalPages - 1, maxVisible);
  }

  if (currentPage >= totalPages - half) {
    start = Math.max(2, totalPages - maxVisible + 1);
    end = totalPages - 1;
  }

  pages.push(1);

  if (start > 2) {
    pages.push(ELLIPSIS);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push(ELLIPSIS);
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};
