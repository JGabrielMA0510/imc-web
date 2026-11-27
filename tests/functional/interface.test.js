import { test, expect } from '@playwright/test';

test('interface calcula IMC usando API simulada', async ({ page }) => {
  await page.route('/api/imc', async (rota) => {
    const dados = rota.request().postDataJSON();

    const imc = dados.peso / (dados.altura * dados.altura);

    let situacao;

    if (imc < 18.5) {
      situacao = 'Baixo peso';
    } else if (imc < 25) {
      situacao = 'Peso adequado';
    } else if (imc < 30) {
      situacao = 'Sobrepeso';
    } else {
      situacao = 'Obesidade';
    }

    await rota.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        imc: Number(imc.toFixed(2)),
        situacao
      })
    });
  });

  await page.goto('http://127.0.0.1:3000');

  await page.locator('#peso').fill('80');
  await page.locator('#altura').fill('2');

  await page.locator('button[type="submit"]').click();

  await expect(page.locator('#resultado'))
    .toHaveText('IMC: 20.00 — Peso adequado');
});