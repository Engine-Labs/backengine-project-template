import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["orders"];
type Order = Table["Row"];
type InsertOrder = Table["Insert"];
type UpdateOrder = Table["Update"];

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        throw error;
      }
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createOrder = async (newData: InsertOrder) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setOrders([...orders, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateOrder = async (id: number, updatedData: UpdateOrder) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, ...data[0] } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = orders.filter((order) => order.id !== id);
      setOrders(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return { orders, createOrder, updateOrder, deleteOrder };
};

export default useOrders;
