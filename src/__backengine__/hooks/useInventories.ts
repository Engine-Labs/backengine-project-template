import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["inventory"];
type Inventory = Table["Row"];
type InsertInventory = Table["Insert"];
type UpdateInventory = Table["Update"];

const useInventories = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    try {
      const { data, error } = await supabase.from("inventory").select("*");
      if (error) {
        throw error;
      }
      setInventories(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createInventory = async (newData: InsertInventory) => {
    try {
      const { data, error } = await supabase
        .from("inventory")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setInventories([...inventories, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateInventory = async (id: number, updatedData: UpdateInventory) => {
    try {
      const { data, error } = await supabase
        .from("inventory")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setInventories(
        inventories.map((inventory) =>
          inventory.id === id ? { ...inventory, ...data[0] } : inventory,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteInventory = async (id: number) => {
    try {
      const { error } = await supabase.from("inventory").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = inventories.filter((inventory) => inventory.id !== id);
      setInventories(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { inventories, createInventory, updateInventory, deleteInventory };
};

export default useInventories;
