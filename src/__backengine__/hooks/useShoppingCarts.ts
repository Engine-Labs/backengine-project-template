import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["shopping_carts"];
type ShoppingCart = Table["Row"];
type InsertShoppingCart = Table["Insert"];
type UpdateShoppingCart = Table["Update"];

const useShoppingCarts = () => {
  const [shoppingCarts, setShoppingCarts] = useState<ShoppingCart[]>([]);

  useEffect(() => {
    fetchShoppingCarts();
  }, []);

  const fetchShoppingCarts = async () => {
    try {
      const { data, error } = await supabase.from("shopping_carts").select("*");
      if (error) {
        throw error;
      }
      setShoppingCarts(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createShoppingCart = async (newData: InsertShoppingCart) => {
    try {
      const { data, error } = await supabase
        .from("shopping_carts")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setShoppingCarts([...shoppingCarts, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateShoppingCart = async (
    id: number,
    updatedData: UpdateShoppingCart,
  ) => {
    try {
      const { data, error } = await supabase
        .from("shopping_carts")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setShoppingCarts(
        shoppingCarts.map((shoppingCart) =>
          shoppingCart.id === id
            ? { ...shoppingCart, ...data[0] }
            : shoppingCart,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteShoppingCart = async (id: number) => {
    try {
      const { error } = await supabase
        .from("shopping_carts")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = shoppingCarts.filter(
        (shoppingCart) => shoppingCart.id !== id,
      );
      setShoppingCarts(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return {
    shoppingCarts,
    createShoppingCart,
    updateShoppingCart,
    deleteShoppingCart,
  };
};

export default useShoppingCarts;
