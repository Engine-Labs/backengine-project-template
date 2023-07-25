import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["categories"];
type Category = Table["Row"];
type InsertCategory = Table["Insert"];
type UpdateCategory = Table["Update"];

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createCategory = async (newData: InsertCategory) => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setCategories([...categories, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateCategory = async (id: number, updatedData: UpdateCategory) => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setCategories(
        categories.map((category) =>
          category.id === id ? { ...category, ...data[0] } : category,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = categories.filter((category) => category.id !== id);
      setCategories(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { categories, createCategory, updateCategory, deleteCategory };
};

export default useCategories;
