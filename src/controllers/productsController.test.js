import { vi, describe, test, expect } from 'vitest';

vi.mock('../services/productsService.js');
vi.mock('../helpers/handleResponse.js');
vi.mock('../dtos/getAllProductsResDTO.js');

import { productsService } from '../services/productsService.js';
import { getAllProductsResDTO } from '../dtos/getAllProductsResDTO.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { productsController } from './productsController.js';

const makeRes = () => ({});

describe('productsCrontroller', () => {
  test('Deve chamar productsService.getAllProducts', async () => {
    const req = { query: { page: '1', pageSize: '4' } };
    const res = makeRes();

    const resultMock = {};
    productsService.getAllProducts.mockResolvedValue(resultMock);
    getAllProductsResDTO.mockReturnValue(resultMock);

    await productsController.getAllProducts(req, res);

    expect(productsService.getAllProducts).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSizeNumber: 4,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Produtos encontrados com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar productsService.getProductById', async () => {
    const req = { params: { productId: '1' } };
    const res = makeRes();

    const resultMock = {};
    productsService.getProductById.mockResolvedValue(resultMock);

    await productsController.getProductById(req, res);

    expect(productsService.getProductById).toHaveBeenCalledWith(
      req.params.productId,
    );
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Produto encontrado com sucesso.', data: resultMock },
      200,
    );
  });

  // fix: corrigir esse teste
  test('Deve chamar productsService.createProduct', async () => {
    const req = { body: {} };
    const res = makeRes();

    const resultMock = {};
    productsService.createProduct.mockResolvedValue(resultMock);

    await productsController.createProduct(req, res);

    expect(productsService.createProduct).toHaveBeenCalledWith(req.body);
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Produto cadastrado com sucesso.', data: resultMock },
      201,
    );
  });

  test('Deve chamar productsService.updateProductById', async () => {
    const req = {
      params: { productId: '123' },
      body: { description: 'description' },
    };
    const res = makeRes();

    const resultMock = {};
    productsService.updateProductById.mockResolvedValue(resultMock);

    await productsController.updateProductById(req, res);

    expect(productsService.updateProductById).toHaveBeenCalledWith({
      productId: req.params.productId,
      description: req.body.description,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Produto atualizado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar productsService.deleteProductById', async () => {
    const req = { params: { productId: '123' } };
    const res = makeRes();

    const resultMock = {};
    productsService.deleteProductById.mockResolvedValue(resultMock);

    await productsController.deleteProductById(req, res);

    expect(productsService.deleteProductById).toHaveBeenCalledWith(
      req.params.productId,
    );
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Produto deletado com sucesso.', data: resultMock },
      200,
    );
  });
});
