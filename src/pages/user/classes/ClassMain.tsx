import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import axiosInstance from "../../../config/axiosConfig";
import ClassCardView from "./ClassCardView";
import ModalWrapper from "../../../components/common/ModalWrapper";
import { getAllClasses } from "../../../queries/class/class";
import ClassForm from "./ClassForm";
import { Faculty } from "../faculty/FacultyMain";

export interface Class {
  _id?: string;
  name: string;
  password?: string;
  incharge?:Faculty;
  is_active?: boolean;
  type: string;
}

export default function FacultyManageMain() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editClassId, setEditClassId] = useState<string | null | undefined>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [outLoading, setOutLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [classType, setClassType] = useState<string>("");
  const [allClasses, setAllClasses] = useState<Class[]>([]);

  const [data, setData] = useState<Class>({
    name: "",
    type: "",
    password: "",
    is_active: true,
  });

  const fetchClasses = async () => {
    const classes = await getAllClasses(setLoading);
    if (Array.isArray(classes)) {
      setAllClasses(classes);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const filteredClasses = allClasses.filter((classItem: Class) => {
    const matchesSearch = classItem?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    || classItem.incharge?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    || classItem.incharge?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = classType ? classItem.type.includes(classType) : true;
    return matchesSearch && matchesType;
  });
  
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data, setData]
  );

  //  Temporary
  const handleToggleAccess = async (id: string): Promise<void> => {
    console.log(id);
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
      password: "",
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        if (!confirm("Are you sure you want to update this details?")) return;
        if (data.name === "" || data.type === "") {
          toast.error("Email and Type are required");
          return;
        }
        const response = await axiosInstance.put(
          `/class/${editClassId}`,
          data
        );
        console.log(response);
        alert(response?.data?.message);
        toast.success(response?.data?.message || "Updated Successfully");
        handleCancel();
        fetchClasses();
      } else {
        const response = await axiosInstance.post(`/class`, data);
        toast.success(response?.data?.message || "Added Successfully");
      }
      setOpenModal(false);
      setData({
        name: "",
        type: "",
        password: "",
      });
    } catch (error: unknown) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-xl px-4 font-semibold text-stone-800">
          All Classes
        </h2>

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

              <div >
                <select
                  name="type"
                  className="outline-none rounded-md text-xs"
                  onChange={(e) => {
                   setClassType(e.target.value)
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
