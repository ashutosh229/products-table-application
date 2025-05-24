import { useEffect, useState } from "react";
import { fetchProducts, updateProductTitle } from "./api/products.api";
import { Product } from "./types/products";

const App = () => {
  //states for managing the products
  const [products, setProducts] = useState<Product[]>([]);

  //states for managing the loading and error conditions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTitle = async (id: number, title: string) => {
    try {
      const updatedProduct = await updateProductTitle(id, title);
      setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
    } catch (err) {
      console.error("Failed to update product title:", err);
    }
  };

  return (
    <>
      <div>hello</div>
    </>
  );
};

export default App;
