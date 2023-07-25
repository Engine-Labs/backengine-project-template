import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["order_items"];
type OrderItem = Table["Row"];
type InsertOrderItem = Table["Insert"];
type UpdateOrderItem = Table["Update"];

const useOrderItems = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const { data, error } = await supabase.from("order_items").select("*");
      if (error) {
        throw error;
      }
      setOrderItems(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createOrderItem = async (newData: InsertOrderItem) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setOrderItems([...orderItems, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateOrderItem = async (id: number, updatedData: UpdateOrderItem) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === id ? { ...orderItem, ...data[0] } : orderItem,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteOrderItem = async (id: number) => {
    try {
      const { error } = await supabase
        .from("order_items")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = orderItems.filter((orderItem) => orderItem.id !== id);
      setOrderItems(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { orderItems, createOrderItem, updateOrderItem, deleteOrderItem };
};

export default useOrderItems;
