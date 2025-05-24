import { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchProducts,
  updateProductTitle,
} from "./api/products.api";
import { Product } from "./types/products";
import ProductTable from "./components/ProductTable";

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

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Products Table Application
            </h1>
            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <ProductTable
              products={products}
              isLoading={isLoading}
              onUpdateTitle={handleUpdateTitle}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
