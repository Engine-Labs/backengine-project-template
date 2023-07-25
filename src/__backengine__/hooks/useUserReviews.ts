import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["user_reviews"];
type UserReview = Table["Row"];
type InsertUserReview = Table["Insert"];
type UpdateUserReview = Table["Update"];

const useUserReviews = () => {
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    try {
      const { data, error } = await supabase.from("user_reviews").select("*");
      if (error) {
        throw error;
      }
      setUserReviews(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createUserReview = async (newData: InsertUserReview) => {
    try {
      const { data, error } = await supabase
        .from("user_reviews")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setUserReviews([...userReviews, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateUserReview = async (
    id: number,
    updatedData: UpdateUserReview,
  ) => {
    try {
      const { data, error } = await supabase
        .from("user_reviews")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setUserReviews(
        userReviews.map((userReview) =>
          userReview.id === id ? { ...userReview, ...data[0] } : userReview,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteUserReview = async (id: number) => {
    try {
      const { error } = await supabase
        .from("user_reviews")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = userReviews.filter((userReview) => userReview.id !== id);
      setUserReviews(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { userReviews, createUserReview, updateUserReview, deleteUserReview };
};

export default useUserReviews;
