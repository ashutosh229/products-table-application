import React, { useState } from "react";
import type { FilterState, Product } from "../types/products";
import { Check, Loader2, Pencil, Trash2, X } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onUpdateTitle: (id: number, title: string) => Promise<void>;
  onDeleteProduct: (id: number) => Promise<void>;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  onUpdateTitle,
  onDeleteProduct,
}) => {
  //state for managing the filters
  const [filters, setFilters] = useState<FilterState>({
    title: "",
    brand: null,
    category: null,
    price: null,
    rating: null,
  });

  //state for managing the id of the product whose title is being edited
  const [editingId, setEditingId] = useState<number | null>(null);
  //state for managing the value of the title being edited
  const [editValue, setEditValue] = useState("");
  //states depending on the action being performed (delete or update)
  const [updating, setUpdating] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  //unique values for filter dropdowns
  const getUniqueValues = (field: keyof Product) => {
    return Array.from(
      new Set(products.map((product) => String(product[field])))
    ).sort();
  };

  //getting the products after applying the filters
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      (!filters.brand || product.brand === filters.brand) &&
      (!filters.category || product.category === filters.category) &&
      (!filters.price || String(product.price) === filters.price) &&
      (!filters.rating || String(product.rating) === filters.rating)
    );
  });

  //handler for updating the states, deoending on the product being edited
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditValue(product.title);
  };

  const handleSave = async (id: number) => {
    try {
      setUpdating(id);
      await onUpdateTitle(id, editValue);
      setEditingId(null);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeleting(id);
      await onDeleteProduct(id);
    } finally {
      setDeleting(null);
    }
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      brand: null,
      category: null,
      price: null,
      rating: null,
    });
  };

  //UI when the state is loading on the page
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  //UI when then table is loaded
  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filter by title..."
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        />
        <select
          value={filters.brand || ""}
          onChange={(e) =>
            setFilters({ ...filters, brand: e.target.value || null })
          }
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Brands</option>
          {getUniqueValues("brand").map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          value={filters.category || ""}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value || null })
          }
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {getUniqueValues("category").map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filters.price || ""}
          onChange={(e) =>
            setFilters({ ...filters, price: e.target.value || null })
          }
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Prices</option>
          {getUniqueValues("price").map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
        <select
          value={filters.rating || ""}
          onChange={(e) =>
            setFilters({ ...filters, rating: e.target.value || null })
          }
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Ratings</option>
          {getUniqueValues("rating").map((rating) => (
            <option key={rating} value={rating}>
              {rating} ⭐
            </option>
          ))}
        </select>
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No results found</div>
      ) : (
        <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  {editingId === product.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="px-2 py-1 border rounded"
                      />
                      {updating === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <button
                            onClick={() => handleSave(product.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {product.title}
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.rating} ⭐</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={deleting === product.id}
                  >
                    {deleting === product.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
