import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import axiosInstance from "../../../config/axiosConfig";
import ClassCardView from "./ClassCardView";
import ModalWrapper from "../../../components/common/ModalWrapper";
import ClassForm from "./ClassForm";
import { useData } from "../../../context/DataProviderContext";
import Limit from "./Limit";
import Pagination from "./Pagination";
export default function FacultyManageMain() {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editClassId, setEditClassId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [outLoading, setOutLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [classType, setClassType] = useState("");
    const { allClasses, classData, setAllClasses, fetchAllClasses } = useData();
    const [updatedPassword, setUpdatedPassword] = useState("");
    const [data, setData] = useState({
        name: "",
        type: "",
        email: "",
        password: "",
        is_active: true,
    });
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);
    useEffect(() => {
        fetchAllClasses(page, limit, debouncedQuery);
    }, [debouncedQuery, page, limit]);
    const filteredClasses = classType
        ? allClasses.filter((item) => item.type === classType)
        : allClasses;
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    // Edit Handler
    const handleEdit = useCallback((classData) => {
        const updatedData = {
            ...classData,
        };
        setData(updatedData);
        setEditClassId(classData._id);
        setIsEditing(true);
        setOpenModal(true);
    }, [setData, setIsEditing, setOpenModal, setEditClassId]);
    // Cancel/Reset Handler
    const handleCancel = () => {
        setIsEditing(false);
        setEditClassId(null);
        setData({
            name: "",
            type: "",
            email: "",
            password: "",
        });
    };
    const handleClassDataUpdate = (data) => {
        setAllClasses(allClasses.map((item) => (item._id === data._id ? data : item)));
    };
    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                if (!confirm("Are you sure you want to update this details?"))
                    return;
                if (data.name === "" || data.type === "" || data.email === "") {
                    toast.error("Fill all required the fields");
                    return;
                }
                const updatedData = { ...data, password: updatedPassword };
                const response = await axiosInstance.put(`/class/${editClassId}`, updatedData);
                toast.success(response?.data?.message || "Updated Successfully");
                handleCancel();
                handleClassDataUpdate(response?.data?.class);
            }
            else {
                const response = await axiosInstance.post(`/class`, data);
                toast.success(response?.data?.message || "Added Successfully");
            }
            setOpenModal(false);
            setData({
                name: "",
                type: "",
                email: "",
                password: "",
            });
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    const handlePageAndLimitChange = () => {
        fetchAllClasses(page, limit, debouncedQuery);
    };
    useEffect(() => {
        handlePageAndLimitChange();
    }, [limit, page, debouncedQuery]);
    return (_jsxs("div", { children: [_jsx(ModalWrapper, { open: openModal, setOpenModal: setOpenModal, outsideClickClose: false, children: _jsx(ClassForm, { loading: loading, data: data, isEditing: isEditing, setIsEditing: setIsEditing, updatedPassword: updatedPassword, setUpdatedPassword: setUpdatedPassword, setOpenModal: setOpenModal, handleSubmit: handleSubmit, handleCancel: handleCancel, setData: setData, onChangeHandler: onChangeHandler }) }), _jsx("div", { className: "flex justify-end my-4 px-4", children: _jsx("button", { onClick: () => setOpenModal(true), className: "bg-red-800 text-white px-4 py-2 rounded shadow hover:bg-red-600", children: "Add Class" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h2", { className: "text-xl px-4 font-semibold text-stone-800", children: "All Classes" }), _jsxs("p", { className: "px-4", children: ["Total Classes: ", classData?.totalClasses] })] }), loading ? (_jsx("div", { className: "flex items-center justify-center min-h-60 w-full", children: _jsx(Loader, {}) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center my-5 justify-between gap-2 md:px-4 ", children: [_jsx("input", { type: "text", placeholder: "Search...", className: "w-full py-1 px-3   rounded-md max-w-xl border\r\n                        border-stone-300 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-800", onChange: (e) => setSearchQuery(e.target.value) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Pagination, { currentPage: page, setPage: setPage, totalPages: classData?.totalPages || 1 }), _jsx(Limit, { limit: limit, setLimit: setLimit }), _jsxs("select", { name: "type", className: "outline-none rounded-md text-xs", onChange: (e) => {
                                                    setClassType(e.target.value);
                                                }, children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Senior", children: "Senior" }), _jsx("option", { value: "Junior", children: "Junior" })] })] })] }), _jsx("div", { className: "grid grid-cols-1 gap-4 my-4 max-sm:place-items-center place-content-center px-2", style: {
                                    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                                }, children: _jsx(_Fragment, { children: filteredClasses?.map((item) => (_jsx(ClassCardView, { value: item, handleEdit: handleEdit }, item._id))) }) })] }))] }), outLoading && (_jsx(ModalWrapper, { open: outLoading, setOpenModal: setOutLoading, outsideClickClose: false, children: _jsx(Loader, {}) }))] }));
}
