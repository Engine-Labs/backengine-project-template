import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["users"];
type User = Table["Row"];
type InsertUser = Table["Insert"];
type UpdateUser = Table["Update"];

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        throw error;
      }
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createUser = async (newData: InsertUser) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setUsers([...users, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateUser = async (id: number, updatedData: UpdateUser) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setUsers(
        users.map((user) => (user.id === id ? { ...user, ...data[0] } : user)),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = users.filter((user) => user.id !== id);
      setUsers(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { users, createUser, updateUser, deleteUser };
};

export default useUsers;
