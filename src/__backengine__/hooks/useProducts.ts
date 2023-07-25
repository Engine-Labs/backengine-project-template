import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["products"];
type Product = Table["Row"];
type InsertProduct = Table["Insert"];
type UpdateProduct = Table["Update"];

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw error;
      }
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createProduct = async (newData: InsertProduct) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setProducts([...products, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateProduct = async (id: number, updatedData: UpdateProduct) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...data[0] } : product,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = products.filter((product) => product.id !== id);
      setProducts(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { products, createProduct, updateProduct, deleteProduct };
};

export default useProducts;
