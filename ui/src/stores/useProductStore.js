import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const usePrductStore = create((set, get) => ({
  products: [],
  loding: true,

  // setProdcut: set({ name: "pant", price: 50 }),

  createProduct: async (productData) => {
    set({ loding: true });
    try {
      const res = await axios.post("/product/create", productData);
      console.log("create data " , res.data)
        set((prevState) => ({
        products: [...prevState.products,  res.data],
        loding: false,
      }));
     
    } catch (error) {
      console.log("productData -->", error.message);
      toast.error(error?.data?.message);
      // set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loding: true })
    try {
      const response = await axios.get("/product")
      console.log("response all data ", response)
      set({ products: response.data, loding: false })

    } catch (error) {
      set({ error: "Failed to fetch products"   , loding : false});
      toast.error(error.response.data.error || "Failed to fetch products")
    }
  },

  
    deleteProduct: async (productID) => {
    set({loding :true})
    try {
      await axios.delete(`/product/${productID}`)
      set((prevesProduct) => ({
        products: prevesProduct.products.filter((product) => product.id !== productID)
        , 
      }))
    } catch (error) {
      set({ loding: false })
      toast.error("Failed to delete product")
    }
  },

    
  fetchProductByCategory : async (category) =>{
     set({loding : true})
     try {
         const productCategory = await axios.get(`/product/category/${category}`) 
          // console.log("productCategory --->"  , )
         set({products : productCategory.data.products,  loding : false})
        //  console.log("products -->" , products)
        
     } catch (error) {
        console.log("")
        toast.error("Failed fetchProduct " , error.message)
     }
  }

  
  // toggleFeaturedProduct: async (productID) => { //this is route is panding 
  //   try { 
  //   } catch (error) {
  //   }
  // }




}));
export default usePrductStore;
