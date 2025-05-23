import React, { useState } from "react";
import type { FilterState, Product } from "../types/products";


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
        title: '',
        brand: null,
        category: null,
        price: null,
        rating: null,
      });

      //state for managing the id of the product whose title is being edited
      const [editingId, setEditingId] = useState<number | null>(null);
      //state for managing the value of the title being edited
      const [editValue, setEditValue] = useState('');
      //states depending on the action being performed (delete or update)
      const [updating, setUpdating] = useState<number | null>(null);
      const [deleting, setDeleting] = useState<number | null>(null);

        //unique values for filter dropdowns
  const getUniqueValues = (field: keyof Product) => {
    return Array.from(new Set(products.map(product => String(product[field])))).sort();
  };






    return (

    )
};

export default ProductTable;
