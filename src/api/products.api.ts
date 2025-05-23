import type { Product } from "../types/products";

export const fetchProducts = async (): Promise<Product[]> => {};

export const updateProductTitle = async (
  id: number,
  title: string
): Promise<Product> => {};

export const deleteProduct = async (id: number): Promise<void> => {};
