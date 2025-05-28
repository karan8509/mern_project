
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


const usePrductStore = create((set, get) => ({
    cart: [],
    getCartItem: async () => {
        try {
            const res = await axios.get("/cart")
            console.log("->", res)

            set({ cart: res.data })
        } catch (error) {
            set({ cart: [] })
            toast.error(error.message || "An error occurred")
        }
    },


    addToCart: async (product) => {
        try {
            await axios.post("/cart", product)
            toast.success("Add to Cart")

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => (item._id === product._id))
                const newCart = existingItem ? prevState.cart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item) : [...prevState.cart, { ...product, quantity: 1 }]
                return { cart: newCart }
            })

        } catch (error) {
            console.log(error.message, "An error occurred")
        }
    }

}))

export default usePrductStore