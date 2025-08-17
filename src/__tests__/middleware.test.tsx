import { describe, it, vi, expect } from 'vitest';
import { config } from '../middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

vi.mock('next-intl/middleware', () => {
  return {
    __esModule: true,
    default: vi.fn((arg) => arg),
  };
});

describe('next-intl middleware', () => {
  it('should call createMiddleware with routing', () => {
    expect(createMiddleware).toHaveBeenCalledWith(routing);
  });

  it('should have correct matcher config', () => {
    expect(config).toEqual({
      matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    });
  });
});
