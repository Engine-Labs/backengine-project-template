import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["post_categories"];
type PostCategory = Table["Row"];
type InsertPostCategory = Table["Insert"];
type UpdatePostCategory = Table["Update"];

const usePostCategories = () => {
  const [postCategories, setPostCategories] = useState<PostCategory[]>([]);

  useEffect(() => {
    fetchPostCategories();
  }, []);

  const fetchPostCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("post_categories")
        .select("*");
      if (error) {
        throw error;
      }
      setPostCategories(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createPostCategory = async (newData: InsertPostCategory) => {
    try {
      const { data, error } = await supabase
        .from("post_categories")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setPostCategories([...postCategories, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updatePostCategory = async (
    id: number,
    updatedData: UpdatePostCategory,
  ) => {
    try {
      const { data, error } = await supabase
        .from("post_categories")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setPostCategories(
        postCategories.map((postCategory) =>
          postCategory.id === id
            ? { ...postCategory, ...data[0] }
            : postCategory,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deletePostCategory = async (id: number) => {
    try {
      const { error } = await supabase
        .from("post_categories")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = postCategories.filter(
        (postCategory) => postCategory.id !== id,
      );
      setPostCategories(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return {
    postCategories,
    createPostCategory,
    updatePostCategory,
    deletePostCategory,
  };
};

export default usePostCategories;
