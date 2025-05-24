import { useEffect, useState } from "react";
import { fetchProducts } from "./api/products.api";
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

  return (
    <>
      <div>hello</div>
    </>
  );
};

export default App;
