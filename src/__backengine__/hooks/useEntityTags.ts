import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["entity_tags"];
type EntityTag = Table["Row"];
type InsertEntityTag = Table["Insert"];
type UpdateEntityTag = Table["Update"];

const useEntityTags = () => {
  const [entityTags, setEntityTags] = useState<EntityTag[]>([]);

  useEffect(() => {
    fetchEntityTags();
  }, []);

  const fetchEntityTags = async () => {
    try {
      const { data, error } = await supabase.from("entity_tags").select("*");
      if (error) {
        throw error;
      }
      setEntityTags(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createEntityTag = async (newData: InsertEntityTag) => {
    try {
      const { data, error } = await supabase
        .from("entity_tags")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setEntityTags([...entityTags, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateEntityTag = async (id: number, updatedData: UpdateEntityTag) => {
    try {
      const { data, error } = await supabase
        .from("entity_tags")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setEntityTags(
        entityTags.map((entityTag) =>
          entityTag.id === id ? { ...entityTag, ...data[0] } : entityTag,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteEntityTag = async (id: number) => {
    try {
      const { error } = await supabase
        .from("entity_tags")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = entityTags.filter((entityTag) => entityTag.id !== id);
      setEntityTags(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { entityTags, createEntityTag, updateEntityTag, deleteEntityTag };
};

export default useEntityTags;
