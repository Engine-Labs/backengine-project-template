import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["comments"];
type Comment = Table["Row"];
type InsertComment = Table["Insert"];
type UpdateComment = Table["Update"];

const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase.from("comments").select("*");
      if (error) {
        throw error;
      }
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createComment = async (newData: InsertComment) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setComments([...comments, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateComment = async (id: number, updatedData: UpdateComment) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, ...data[0] } : comment,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      const { error } = await supabase.from("comments").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = comments.filter((comment) => comment.id !== id);
      setComments(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { comments, createComment, updateComment, deleteComment };
};

export default useComments;
