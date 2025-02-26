import { Dispatch, SetStateAction } from "react";
import axiosInstance from "../../config/axiosConfig";

export const getAllClasses = async (setLoading: Dispatch<SetStateAction<boolean>>) => {
  try {
    setLoading(true);
    const res = await axiosInstance.get("/class");
    console.log(res.data)
    return res.data?.classes;
  } catch (error: unknown) {
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};
