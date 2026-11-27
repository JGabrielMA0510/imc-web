import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: 'list',
  use: {
    headless: true,
    launchOptions: {
      executablePath: '/usr/bin/google-chrome'
    }
  }
});