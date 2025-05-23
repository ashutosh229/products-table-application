import type { Product } from "../types/products";

const DELAY = 1000;
let products: Product[] = [];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    if (products.length > 0) {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...products]), DELAY);
      });
    }
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      //error handling to be done
    }
    const data = await response.json();
    if (!data || !data.products) {
      //error handling to be done
    }
    products = data.products;
    return new Promise((resolve) => {
      setTimeout(() => resolve([...products]), DELAY);
    });
  } catch (error) {
    //error handling to be done
  }
};

export const updateProductTitle = async (
  id: number,
  title: string
): Promise<Product> => {};

export const deleteProduct = async (id: number): Promise<void> => {};
