import { describe, it, expect } from 'vitest';
import { getPaginationPages } from '@/core/utils/pagination/getPaginationPages.ts';
import { ELLIPSIS } from '@/constants/constants.ts';
import { BASE_LIMIT_VISIBLE_PAGINATION } from '@/constants/constants.ts';

describe('getPaginationPages', (): void => {
  it('Should return all pages when totalPages is less than or equal to maxVisible', (): void => {
    expect(getPaginationPages(1, 1, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
    ]);
    expect(getPaginationPages(1, 2, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1, 2,
    ]);
    expect(getPaginationPages(2, 2, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1, 2,
    ]);
    expect(getPaginationPages(1, 3, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1, 2, 3,
    ]);
    expect(getPaginationPages(2, 3, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1, 2, 3,
    ]);
    expect(getPaginationPages(3, 3, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1, 2, 3,
    ]);
  });

  it('Should show ellipsis at the end when the current page is at the beginning (currentPage 1 or 2)', () => {
    expect(getPaginationPages(1, 5, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      2,
      3,
      ELLIPSIS,
      5,
    ]);

    expect(getPaginationPages(2, 5, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      2,
      3,
      ELLIPSIS,
      5,
    ]);

    expect(getPaginationPages(1, 10, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      2,
      3,
      ELLIPSIS,
      10,
    ]);
    expect(getPaginationPages(2, 10, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      2,
      3,
      ELLIPSIS,
      10,
    ]);
  });

  it('Should show ellipsis at the beginning when the current page is at the end (currentPage totalPages-1 or totalPages).', () => {
    expect(getPaginationPages(4, 5, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      ELLIPSIS,
      3,
      4,
      5,
    ]);
    expect(getPaginationPages(5, 5, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      ELLIPSIS,
      3,
      4,
      5,
    ]);

    expect(getPaginationPages(9, 10, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      ELLIPSIS,
      8,
      9,
      10,
    ]);
    expect(getPaginationPages(10, 10, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      ELLIPSIS,
      8,
      9,
      10,
    ]);
  });

  it('Should display ellipses on both sides when the current page is in the middle', () => {
    expect(getPaginationPages(3, 10, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      2,
      3,
      4,
      ELLIPSIS,
      10,
    ]);

    expect(getPaginationPages(5, 10, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      ELLIPSIS,
      4,
      5,
      6,
      ELLIPSIS,
      10,
    ]);

    expect(getPaginationPages(7, 10, BASE_LIMIT_VISIBLE_PAGINATION)).toEqual([
      1,
      ELLIPSIS,
      6,
      7,
      8,
      ELLIPSIS,
      10,
    ]);
  });
});
