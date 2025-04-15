import axiosInstance from "../../config/axiosConfig";
export const getAllClasses = async (setLoading) => {
    try {
        setLoading(true);
        const res = await axiosInstance.get("/class");
        console.log(res.data);
        return res.data?.classes;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        setLoading(false);
    }
};
