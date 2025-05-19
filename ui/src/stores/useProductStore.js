import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const usePrductStore = create((set, get) => ({
  products: [],
  loding: true,

  //   setProdcut: set({ name: "pant", price: 50 }),

  createProduct: async (productData) => {
    try {
      //   set({ loding: true });
      const res = await axios.post("/product/create", productData );
      console.log(res, "-<");
      set((prevState) => ({
        product: [...prevState.products, res.data],
        loding: false,
      }));
    } catch (error) {
      console.log("productData -->", error.message);
      toast.error(error?.data?.message);
      //   set({ loading: false });
    }
  },
}));
export default usePrductStore;
