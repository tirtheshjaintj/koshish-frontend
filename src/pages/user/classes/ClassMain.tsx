import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import axiosInstance from "../../../config/axiosConfig";
import ClassCardView from "./ClassCardView";
import ModalWrapper from "../../../components/common/ModalWrapper";
import ClassForm from "./ClassForm";
import { Class, useData } from "../../../context/DataProviderContext";
import Limit from "./Limit";
import Pagination from "./Pagination";


export default function FacultyManageMain() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editClassId, setEditClassId] = useState<string | null | undefined>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [outLoading, setOutLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [classType, setClassType] = useState<string>("");
  const { allClasses, classData, setAllClasses, fetchAllClasses } = useData();
  const [updatedPassword, setUpdatedPassword] = useState<string>("");
console.log(classData)
  const [data, setData] = useState<Class>({
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

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Edit Handler
  const handleEdit = useCallback(
    (classData: Class) => {
      const updatedData = {
        ...classData,
      };

      setData(updatedData);
      setEditClassId(classData._id);
      setIsEditing(true);
      setOpenModal(true);
    },
    [setData, setIsEditing, setOpenModal, setEditClassId]
  );

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

  const handleClassDataUpdate = (data: Class) => {
    setAllClasses(
      allClasses.map((item) => (item._id === data._id ? data : item))
    );
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        if (!confirm("Are you sure you want to update this details?")) return;
        
        if (data.name === "" || data.type === "" || data.email === "") {
          toast.error("Fill all required the fields");
          return;
        }

        const updatedData = { ...data, password: updatedPassword };
        const response = await axiosInstance.put(
          `/class/${editClassId}`,
          updatedData
        );
        toast.success(response?.data?.message || "Updated Successfully");
        handleCancel();
        handleClassDataUpdate(response?.data?.class);
      } else {
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
    } catch (error: unknown) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
 
 const handlePageAndLimitChange = () => {
    fetchAllClasses(page, limit, debouncedQuery);
  };
  useEffect(() => {
    handlePageAndLimitChange();
  }, [limit, page, debouncedQuery]);

  return (
    <div>
      <ModalWrapper
        open={openModal}
        setOpenModal={setOpenModal}
        outsideClickClose={false}
      >
        <ClassForm
          loading={loading}
          data={data}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          updatedPassword={updatedPassword}
          setUpdatedPassword={setUpdatedPassword}
          setOpenModal={setOpenModal}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          setData={setData}
          onChangeHandler={onChangeHandler}
        />
      </ModalWrapper>

      <div className="flex justify-end my-4 px-4">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-red-800 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Add Class
        </button>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl px-4 font-semibold text-stone-800">
            All Classes
          </h2>
          <p className="px-4">Total Classes: {classData?.totalClasses}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-60 w-full">
            <Loader />
          </div>
        ) : (
          <>
            <div className="flex items-center my-5 justify-between gap-2 md:px-4 ">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-1 px-3   rounded-md max-w-xl border
                        border-stone-300 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-800"
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="flex items-center gap-4">
                {/* Pagination */}
                <Pagination
                  currentPage={page}
                  setPage={setPage}
                  totalPages={classData?.totalPages || 1}
                />
                {/* Limit */}

                <Limit limit={limit} setLimit={setLimit} />

                <select
                  name="type"
                  className="outline-none rounded-md text-xs"
                  onChange={(e) => {
                    setClassType(e.target.value);
                  }}
                >
                  <option value="">All</option>
                  <option value="Senior">Senior</option>
                  <option value="Junior">Junior</option>
                </select>
              </div>
            </div>

            {/* Main Content */}

            <div
              className="grid grid-cols-1 gap-4 my-4 max-sm:place-items-center place-content-center px-2"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              }}
            >
              <>
                {filteredClasses?.map((item: Class) => (
                  <ClassCardView
                    key={item._id}
                    value={item}
                    handleEdit={handleEdit}
                  />
                ))}
              </>
            </div>
          </>
        )}
      </div>

      {outLoading && (
        <ModalWrapper
          open={outLoading}
          setOpenModal={setOutLoading}
          outsideClickClose={false}
        >
          <Loader />
        </ModalWrapper>
      )}
    </div>
  );
}
