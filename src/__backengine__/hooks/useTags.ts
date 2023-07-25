import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["tags"];
type Tag = Table["Row"];
type InsertTag = Table["Insert"];
type UpdateTag = Table["Update"];

const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase.from("tags").select("*");
      if (error) {
        throw error;
      }
      setTags(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createTag = async (newData: InsertTag) => {
    try {
      const { data, error } = await supabase
        .from("tags")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setTags([...tags, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateTag = async (id: number, updatedData: UpdateTag) => {
    try {
      const { data, error } = await supabase
        .from("tags")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setTags(
        tags.map((tag) => (tag.id === id ? { ...tag, ...data[0] } : tag)),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteTag = async (id: number) => {
    try {
      const { error } = await supabase.from("tags").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = tags.filter((tag) => tag.id !== id);
      setTags(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { tags, createTag, updateTag, deleteTag };
};

export default useTags;
