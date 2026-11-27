import test from 'node:test';
import assert from 'node:assert/strict';
import { criarServidor } from '../../src/server.js';

async function comServidor(callback) {
  const servidor = criarServidor();

  await new Promise((resolve) => {
    servidor.listen(0, '127.0.0.1', resolve);
  });

  const endereco = servidor.address();
  const base = `http://127.0.0.1:${endereco.port}`;

  try {
    await callback(base);
  } finally {
    await new Promise((resolve, reject) => {
      servidor.close((erro) => erro ? reject(erro) : resolve());
    });
  }
}

test('API calcula IMC e devolve JSON', async () => {
  await comServidor(async (base) => {
    const resposta = await fetch(`${base}/api/imc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peso: 80, altura: 2 })
    });

    assert.equal(resposta.status, 200);

    assert.deepEqual(await resposta.json(), {
      imc: 20,
      situacao: 'Peso adequado'
    });
  });
});

test('API classifica IMC 25 como Sobrepeso', async () => {
  await comServidor(async (base) => {
    const resposta = await fetch(`${base}/api/imc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peso: 100, altura: 2 })
    });

    assert.equal(resposta.status, 200);

    assert.deepEqual(await resposta.json(), {
      imc: 25,
      situacao: 'Sobrepeso'
    });
  });
});

test('API rejeita valores inválidos', async () => {
  await comServidor(async (base) => {
    const resposta = await fetch(`${base}/api/imc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peso: -5, altura: 2 })
    });

    assert.equal(resposta.status, 400);
  });
});

test('API rejeita método GET', async () => {
  await comServidor(async (base) => {
    const resposta = await fetch(`${base}/api/imc`);

    assert.equal(resposta.status, 405);
  });
});