import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    plugins: [tsconfigPaths()],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx,js,jsx}',
        'src/**/*.spec.{ts,tsx,js,jsx}',
        'src/setupTests.{ts,js}',
        'src/**/*.d.ts',
        'src/i18n/**',
        'src/shared/type/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@core': resolve(__dirname, 'src/core'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
};
