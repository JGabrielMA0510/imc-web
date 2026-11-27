import { test, expect } from '@playwright/test';

test('fluxo completo calcula IMC 20', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  await page.locator('#peso').fill('80');
  await page.locator('#altura').fill('2');

  await page.locator('button[type="submit"]').click();

  await expect(page.locator('#resultado'))
    .toHaveText('IMC: 20.00 — Peso adequado');
});

test('fluxo completo classifica IMC 25', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  await page.locator('#peso').fill('100');
  await page.locator('#altura').fill('2');

  await page.locator('button[type="submit"]').click();

  await expect(page.locator('#resultado'))
    .toHaveText('IMC: 25.00 — Sobrepeso');
});