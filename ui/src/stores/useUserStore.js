import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

const useUserStore = create((set, get) => ({
  user: null,
  loding: false,
  checkingAuth: true,

  SignUp: async ({ name, email, password, confirmPassword }) => {
    set({ loding: true });
    if (password !== confirmPassword) {
      set({ loding: false });
      return toast.error("Password do not match");
    }
    try {
      const {
        data: { success, message, user },
      } = await axios.post("/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      set({ user: user, loding: false });
      {
        !success ? toast.error(message) : toast.success(message); //  only use ternary operator
      }

      // console.log("->", res.data.message);
    } catch (error) {
      console.log("Error in SignUp");
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  // Login: async ({ email, password }) => {
  //   try {
  //     set({ loding: true });
  //     const res = await axios.post("/auth/login", { email, password });
  //         const { message, success , users } = res.data;
  //         // console.log(res.data.users,"---------------,")

  //         if (!success) {
  //           toast.error(message);
  //           return;
  //         }
  //           toast.success(message);

  //   } catch (error) {
  //     console.log("Error in Login");
  //     toast.error(error.message);
  //   }
  // },

  Login: async ({ email, password }) => {
    try {
      set({ loding: true });
      const {
        data: { success, message, user },
      } = await axios.post("/auth/login", { email, password });
      if (!success) {
        toast.error(message);
        return;
      }
      set({ user: user, loding: false });
      toast.success(message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const {
        data: { user },
      } = await axios.get("/auth/profile");
      set({ user: user, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
    }
  },
}));

export default useUserStore;
