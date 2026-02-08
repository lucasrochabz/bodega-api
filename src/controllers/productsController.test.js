import { vi, describe, test, expect } from 'vitest';
import { productsController } from './productsController.js';
import { productsService } from '../services/productsService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { getAllProductsResDTO } from '../dtos/getAllProductsResDTO.js';

vi.mock('../services/productsService.js');
vi.mock('../helpers/handleResponse.js');
vi.mock('../dtos/getAllProductsResDTO.js');

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

  test('Deve chamar productsService.getProduct', async () => {
    const req = { params: { productId: '1' } };
    const res = makeRes();

    const resultMock = {};
    productsService.getProduct.mockResolvedValue(resultMock);

    await productsController.getProduct(req, res);

    expect(productsService.getProduct).toHaveBeenCalledWith(
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

  test('Deve chamar productsService.updateProduct', async () => {
    const req = {
      params: { productId: '123' },
      body: { description: 'description' },
    };
    const res = makeRes();

    const resultMock = {};
    productsService.updateProduct.mockResolvedValue(resultMock);

    await productsController.updateProduct(req, res);

    expect(productsService.updateProduct).toHaveBeenCalledWith({
      productId: req.params.productId,
      description: req.body.description,
    });
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Produto atualizado com sucesso.', data: resultMock },
      200,
    );
  });

  test('Deve chamar productsService.deleteProduct', async () => {
    const req = { params: { productId: '123' } };
    const res = makeRes();

    const resultMock = {};
    productsService.deleteProduct.mockResolvedValue(resultMock);

    await productsController.deleteProduct(req, res);

    expect(productsService.deleteProduct).toHaveBeenCalledWith(
      req.params.productId,
    );
    expect(handleResponse).toHaveBeenCalledWith(
      res,
      { message: 'Produto deletado com sucesso.', data: resultMock },
      200,
    );
  });
});
