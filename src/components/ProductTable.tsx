import React from "react";
import { Product } from "../types/products";

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
    return (
        
    )
};

export default ProductTable;
