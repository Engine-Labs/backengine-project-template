import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["posts"];
type Post = Table["Row"];
type InsertPost = Table["Insert"];
type UpdatePost = Table["Update"];

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        throw error;
      }
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createPost = async (newData: InsertPost) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setPosts([...posts, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updatePost = async (id: number, updatedData: UpdatePost) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setPosts(
        posts.map((post) => (post.id === id ? { ...post, ...data[0] } : post)),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = posts.filter((post) => post.id !== id);
      setPosts(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { posts, createPost, updatePost, deletePost };
};

export default usePosts;
