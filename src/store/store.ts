import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export interface UserState {
    id: string;
    name: string;
    email: string;
    user_type: "Admin" | "Convenor" | "Class";  
  }
  

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;