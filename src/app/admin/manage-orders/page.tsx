"use client";
import axios from "axios";
import { useEffect } from "react";

const ManageOrder = () => {
  useEffect(() => {
    const getOrders = async () => {
      try {
        const order = await axios.get("/api/admin/get-order");
        console.log(order);
      } catch (error) {}
    };
    getOrders();
  });

  return <div></div>;
};

export default ManageOrder;
