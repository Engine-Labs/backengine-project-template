import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["order_tracking"];
type OrderTracking = Table["Row"];
type InsertOrderTracking = Table["Insert"];
type UpdateOrderTracking = Table["Update"];

const useOrderTrackings = () => {
  const [orderTrackings, setOrderTrackings] = useState<OrderTracking[]>([]);

  useEffect(() => {
    fetchOrderTrackings();
  }, []);

  const fetchOrderTrackings = async () => {
    try {
      const { data, error } = await supabase.from("order_tracking").select("*");
      if (error) {
        throw error;
      }
      setOrderTrackings(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createOrderTracking = async (newData: InsertOrderTracking) => {
    try {
      const { data, error } = await supabase
        .from("order_tracking")
        .insert([newData])
        .select("*");
      if (error) {
        throw error;
      }
      setOrderTrackings([...orderTrackings, data[0]]);
    } catch (error) {
      console.error("Error creating", error);
    }
  };

  const updateOrderTracking = async (
    id: number,
    updatedData: UpdateOrderTracking,
  ) => {
    try {
      const { data, error } = await supabase
        .from("order_tracking")
        .update(updatedData)
        .eq("id", id)
        .select("*");
      if (error) {
        throw error;
      }
      setOrderTrackings(
        orderTrackings.map((orderTracking) =>
          orderTracking.id === id
            ? { ...orderTracking, ...data[0] }
            : orderTracking,
        ),
      );
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  const deleteOrderTracking = async (id: number) => {
    try {
      const { error } = await supabase
        .from("order_tracking")
        .delete()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const filtered = orderTrackings.filter(
        (orderTracking) => orderTracking.id !== id,
      );
      setOrderTrackings(filtered);
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  return {
    orderTrackings,
    createOrderTracking,
    updateOrderTracking,
    deleteOrderTracking,
  };
};

export default useOrderTrackings;
