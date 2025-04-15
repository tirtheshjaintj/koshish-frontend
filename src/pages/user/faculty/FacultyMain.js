import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import ModalWrapper from "../../../components/common/ModalWrapper";
import FacultyForm from "./FacultyForm";
import FacultyRows from "./FacultyRows";
import axiosInstance from "../../../config/axiosConfig";
import { useData } from "../../../context/DataProviderContext";
import FacultyCardView from "./FacultyCardView";
import { BsFillGridFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
export default function FacultyManageMain() {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editFacultyId, setEditFacultyId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tableView, setTableView] = useState(false);
    const [outLoading, setOutLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { faculties, fetchAllFaculties, setFaculties } = useData();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        user_type: "",
        phone_number: "",
        is_active: true
    });
    const filteredFaculties = faculties
        ? faculties.filter((faculty) => (faculty?.name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
            (faculty?.email?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
            (faculty?.phone_number?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()))
        : [];
    const onChangeHandler = useCallback((e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }, [data, setData]);
    // Edit Handler
    const handleEdit = useCallback((faculty) => {
        const updatedData = {
            name: faculty.name,
            email: faculty.email,
            user_type: faculty.user_type,
            is_active: faculty.is_active,
            phone_number: faculty.phone_number,
            password: "",
        };
        setData(updatedData);
        setEditFacultyId(faculty._id || null);
        setIsEditing(true);
        setOpenModal(true);
    }, [setData, setIsEditing, setOpenModal, setEditFacultyId]);
    // Cancel/Reset Handler
    const handleCancel = () => {
        setIsEditing(false);
        setEditFacultyId(null);
        setData({
            name: "",
            email: "",
            password: "",
            user_type: "",
            phone_number: "",
            is_active: true
        });
    };
    const handleFacultyDataUpdate = (data) => {
        setFaculties(faculties.map((item) => (item._id === data._id ? data : item)));
    };
    // Submit Handler
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                if (!confirm("Are you sure you want to update this details?"))
                    return;
                if (data.email === "" || data.name === "") {
                    toast.error("Email and Name are required");
                    return;
                }
                const response = await axiosInstance.put(`/user/update/${editFacultyId}`, data);
                console.log(response);
                alert(response?.data?.message);
                toast.success(response?.data?.message || "Updated Successfully");
                handleCancel();
                handleFacultyDataUpdate(response?.data?.user);
            }
            else {
                const response = await axiosInstance.post(`/user/signup`, data);
                toast.success(response?.data?.message || "Added Successfully");
            }
            setOpenModal(false);
            setData({
                name: "",
                email: "",
                password: "",
                user_type: "",
                phone_number: "",
                is_active: true
            });
        }
        catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, [isEditing, data, editFacultyId, fetchAllFaculties]);
    return (_jsxs("div", { children: [_jsx(ModalWrapper, { open: openModal, setOpenModal: setOpenModal, outsideClickClose: false, children: _jsx(FacultyForm, { loading: loading, data: data, isEditing: isEditing, setIsEditing: setIsEditing, setOpenModal: setOpenModal, handleSubmit: handleSubmit, handleCancel: handleCancel, setData: setData, onChangeHandler: onChangeHandler }) }), _jsx("div", { className: "flex justify-end my-4", children: _jsx("button", { onClick: () => setOpenModal(true), className: "bg-red-800 text-white px-4 py-2 rounded shadow hover:bg-red-600", children: "Add Convenor" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("h2", { className: "text-xl px-4 font-semibold text-stone-800", children: "All Convenors" }), _jsxs("p", { children: ["Total Convenors : ", faculties?.length || 0] })] }), _jsxs("div", { className: "flex items-center my-5 justify-between gap-2 md:px-4", children: [_jsx("input", { type: "text", placeholder: "Search...", className: "w-full py-1 px-3 mx-3  rounded-md max-w-xl border\r\n                        border-stone-300 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-800", onChange: (e) => setSearchQuery(e.target.value) }), _jsxs("div", { className: "flex justify-end items-center gap-4", children: [_jsx("button", { title: "Grid View", className: ` ${!tableView ? "bg-red-800" : "bg-gray-600"} text-white px-2 py-2 rounded shadow hover:bg-red-800`, onClick: () => setTableView(!tableView), children: _jsx(BsFillGridFill, {}) }), _jsx("button", { title: "List View", className: `${tableView ? "bg-red-800" : "bg-gray-600"}
                               text-white px-2 py-2 rounded shadow hover:bg-red-600`, onClick: () => setTableView(!tableView), children: _jsx(FaTableList, {}) })] })] }), !tableView ? (_jsx("div", { className: "grid grid-cols-1 gap-4 my-4 max-sm:place-items-center place-content-center px-2", style: {
                            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                        }, children: filteredFaculties?.length === 0 ? (_jsx("p", { className: "text-stone-600", children: "No faculties found" })) : (_jsx(_Fragment, { children: filteredFaculties?.map((item) => (_jsx(FacultyCardView, { handleEdit: handleEdit, value: item }, item._id))) })) })) : (_jsx("div", { className: "p-4 overflow-x-auto", children: _jsxs("table", { className: "w-full border-collapse rounded shadow-md", children: [_jsx("thead", { className: "bg-black", children: _jsxs("tr", { className: "text-white", children: [_jsx("th", { className: "text-left p-2 text-xs font-semibold ", children: "Avatar" }), _jsx("th", { className: "text-left p-2 text-xs font-semibold ", children: "Name" }), _jsx("th", { className: "text-left p-2 text-xs font-semibold ", children: "Email" }), _jsx("th", { className: "text-left p-2 text-xs font-semibold ", children: "Phone" }), _jsx("th", { className: "text-left p-2 text-xs font-semibold ", children: "Role" }), _jsx("th", { className: "text-left p-2 text-xs font-semibold ", children: "Active" }), _jsx("th", { className: "text-left p-2 text-xs font-semibold ", children: "Update" })] }) }), _jsx("tbody", { children: filteredFaculties?.map((faculty) => (_jsx(FacultyRows, { faculty: faculty, handleEdit: handleEdit }, faculty._id))) })] }) }))] }), outLoading && (_jsx(ModalWrapper, { open: outLoading, setOpenModal: setOutLoading, outsideClickClose: false, children: _jsx(Loader, {}) }))] }));
}
