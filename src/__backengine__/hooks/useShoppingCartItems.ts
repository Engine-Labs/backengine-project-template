import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["shopping_cart_items"];
type ShoppingCartItem = Table["Row"];
type InsertShoppingCartItem = Table["Insert"];
type UpdateShoppingCartItem = Table["Update"];

const useShoppingCartItems = () => {
  const [shoppingCartItems, setShoppingCartItems] = useState<
    ShoppingCartItem[]
  >([]);

  useEffect(() => {
    fetchShoppingCartItems();
  }, []);

  const fetchShoppingCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from("shopping_cart_items")
        .select("*");
      if (error) {
        throw error;
      }
      setShoppingCartItems(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createShoppingCartItem = async (newData: InsertShoppingCartItem) => {
    try {
      const { data, error } = await supabase
        .from("shopping_cart_items")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setShoppingCartItems([...shoppingCartItems, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateShoppingCartItem = async (
    id: number,
    updatedData: UpdateShoppingCartItem,
  ) => {
    try {
      const { data, error } = await supabase
        .from("shopping_cart_items")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setShoppingCartItems(
        shoppingCartItems.map((shoppingCartItem) =>
          shoppingCartItem.id === id
            ? { ...shoppingCartItem, ...data[0] }
            : shoppingCartItem,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteShoppingCartItem = async (id: number) => {
    try {
      const { error } = await supabase
        .from("shopping_cart_items")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = shoppingCartItems.filter(
        (shoppingCartItem) => shoppingCartItem.id !== id,
      );
      setShoppingCartItems(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return {
    shoppingCartItems,
    createShoppingCartItem,
    updateShoppingCartItem,
    deleteShoppingCartItem,
  };
};

export default useShoppingCartItems;
