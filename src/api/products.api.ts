import type { Product } from "../types/products";

const DELAY = 1000; //delay since we were asked to use the timeout function
let products: Product[] = []; //storing products in local system, in the form of an array

//service for fetching products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    if (products.length > 0) {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...products]), DELAY);
      });
    }
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Response cannot be fetched properly");
    }
    const data = await response.json();
    if (!data || !data.products) {
      throw new Error("Invalid data format");
    }
    products = data.products;
    return new Promise((resolve) => {
      setTimeout(() => resolve([...products]), DELAY);
    });
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const updateProductTitle = async (
  id: number,
  title: string
): Promise<Product> => {
  const productIndex = products.findIndex((product) => {
    return product.id === id;
  });
  if (productIndex === -1) {
    //error handling to be done
  }
  const updatedProduct = { ...products[productIndex], title };
  products[productIndex] = updatedProduct;
  return new Promise((resolve) => {
    setTimeout(() => resolve(updatedProduct), DELAY);
  });
};

export const deleteProduct = async (id: number): Promise<void> => {
  products = products.filter((product) => {
    return product.id !== id;
  });
  return new Promise((resolve) => {
    setTimeout(resolve, DELAY);
  });
};
