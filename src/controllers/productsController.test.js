import { vi, describe, test, expect } from 'vitest';
import { productsController } from './productsController.js';
import { productsService } from '../services/productsService.js';
// fix: add handleResponse

vi.mock('../services/productsService');

describe('productsCrontroller', () => {
  test('Deve chamar productsService.getAllProducts', async () => {
    const req = { query: {} };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    productsService.getAllProducts.mockResolvedValue({
      success: true,
      message: 'Produtos encontrados com sucesso.',
      data: {},
    });

    await productsController.getAllProducts(req, res);

    expect(productsService.getAllProducts).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSizeNumber: 10,
    });

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Produtos encontrados com sucesso.',
      data: expect.any(Object),
    });
  });

  test('Deve chamar productsService.getProduct', async () => {
    const params = { productId: '1' };
    const req = { params };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    productsService.getProduct.mockResolvedValue({
      success: true,
      message: 'Produto encontrado com sucesso.',
      data: [],
    });

    await productsController.getProduct(req, res);

    expect(productsService.getProduct).toHaveBeenCalledWith(params.productId);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Produto encontrado com sucesso.',
      data: expect.any(Array),
    });
  });

  test('Deve chamar productsService.createProduct', async () => {
    const body = {
      name: 'Name',
      price: '123',
      description: 'description',
      stock: '123',
      status: 'status',
      image_path: 'name_path',
    };
    const req = { body };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    productsService.createProduct.mockResolvedValue({
      success: true,
      message: 'Produto cadastrado com sucesso.',
      data: {},
    });

    await productsController.createProduct(req, res);

    expect(productsService.createProduct).toHaveBeenCalledWith(body);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Produto cadastrado com sucesso.',
      data: expect.any(Object),
    });
  });

  test('Deve chamar productsService.updateProduct', async () => {
    const params = { productId: '123' };
    const body = { description: 'description' };
    const req = { params, body };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    productsService.updateProduct.mockResolvedValue({
      success: true,
      message: 'Produto atualizado com sucesso.',
      data: {},
    });

    await productsController.updateProduct(req, res);

    expect(productsService.updateProduct).toHaveBeenCalledWith({
      productId: params.productId,
      description: body.description,
    });

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Produto atualizado com sucesso.',
      data: expect.any(Object),
    });
  });

  test('Deve chamar productsService.deleteProduct', async () => {
    const params = { productId: '123' };
    const req = { params };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    productsService.deleteProduct.mockResolvedValue({
      success: true,
      message: 'Produto deletado com sucesso.',
      data: {},
    });

    await productsController.deleteProduct(req, res);

    expect(productsService.deleteProduct).toHaveBeenCalledWith(
      params.productId,
    );

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Produto deletado com sucesso.',
      data: expect.any(Object),
    });
  });
});
