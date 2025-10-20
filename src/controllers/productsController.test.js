import { vi, describe, test, expect } from 'vitest';
import { productsController } from './productsController';
import { productsService } from '../services/productsService';

// Faz o mock do service (para não chamar nada real)
vi.mock('../services/productsService');

describe('productsCrontroller', () => {
  test('Deve chamar productsService.getAllProducts com os parâmetros corretos', async () => {
    const req = { query: {} };
    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    // Simula retorno do service
    productsService.getAllProducts.mockResolvedValue({ success: true });

    // Executa o método
    await productsController.getAllProducts(req, res);

    // Verifica se foi chamado com os valores esperados
    expect(productsService.getAllProducts).toHaveBeenCalledWith({
      pageNumber: 1,
      pageSizeNumber: 10,
    });

    expect(res.json).toHaveBeenCalledWith({ success: true });
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
});
