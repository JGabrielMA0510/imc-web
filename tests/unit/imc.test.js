import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularIMC, classificarIMC } from '../../src/imc.js';

test('calcula IMC corretamente', () => {
  assert.equal(calcularIMC(80, 2), 20);
});

test('classifica IMC abaixo de 18.5', () => {
  assert.equal(classificarIMC(18), 'Baixo peso');
});

test('classifica IMC 18.5 como Peso adequado', () => {
  assert.equal(classificarIMC(18.5), 'Peso adequado');
});

test('classifica IMC 24.99 como Peso adequado', () => {
  assert.equal(classificarIMC(24.99), 'Peso adequado');
});

test('classifica IMC 25 como Sobrepeso', () => {
  assert.equal(classificarIMC(25), 'Sobrepeso');
});

test('classifica IMC 29.99 como Sobrepeso', () => {
  assert.equal(classificarIMC(29.99), 'Sobrepeso');
});

test('classifica IMC 30 como Obesidade', () => {
  assert.equal(classificarIMC(30), 'Obesidade');
});

test('rejeita peso zero', () => {
  assert.throws(() => calcularIMC(0, 2), RangeError);
});

test('rejeita altura zero', () => {
  assert.throws(() => calcularIMC(80, 0), RangeError);
});

test('rejeita IMC inválido', () => {
  assert.throws(() => classificarIMC(0), RangeError);
});