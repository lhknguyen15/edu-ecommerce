import axiosClient from "./axiosClient";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axiosClient.get<Product[]>("/products");
  return res.data;
};

export const getSuggestions = async (): Promise<Product[]> => {
  const res = await axiosClient.get<Product[]>("/suggestions");
  return res.data;
};
