const assert = require('assert');
const { access } = require('fs');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste que o retorno da função é um array.
    assert.strictEqual(Array.isArray(productDetails()), true);
    // Teste que o array retornado pela função contém dois itens dentro.
    assert.strictEqual(productDetails().length, 2);
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    assert.deepStrictEqual(typeof(productDetails('Alcool gel', 'Máscara')), 'object');
    // Teste que os dois objetos são diferentes entre si.
    const objectOne = Object.values(productDetails('Alcool gel', 'Máscara')[0])
    const objectTwo = Object.values(productDetails('Alcool gel', 'Máscara')[1])
    assert.deepStrictEqual(objectOne !== objectTwo, true)
    // Teste que os dois productIds terminam com 123.
    assert.deepStrictEqual(objectOne[1].productId.slice(-3) && objectTwo[1].productId.slice(-3), '123');
  });
});
