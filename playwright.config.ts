import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: './reports', open: 'never' }]],
  use: {
    trace: 'on-first-retry',
  },
});
