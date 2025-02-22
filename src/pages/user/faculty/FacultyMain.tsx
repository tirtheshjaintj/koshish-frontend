import { useCallback, useState } from 'react';

import { toast } from 'react-toastify';
import Loader from '../../../components/common/Loader';
import ModalWrapper from '../../../components/common/ModalWrapper';
import FacultyForm from './FacultyForm';
import FacultyRows from './FacultyRows';
import axiosInstance from '../../../config/axiosConfig';
import { useData } from '../../../context/DataProviderContext';
import FacultyCardView from './FacultyCardView';
import { BsFillGridFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";


interface Faculty {
    _id: string;
    name: string;
    email: string;
    password?: string;
    block: string;
    is_active: boolean;
    phone_number: string;
    user_type: string;
}


export default function FacultyManageMain() {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editFacultyId, setEditFacultyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [tableView, setTableView] = useState(false)
    const [outLoading, setOutLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { faculties, fetchAllFaculties } = useData();
    
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        user_type: '',
        phone_number: '',
    });

    const filteredFaculties = faculties?.filter((faculty: Faculty) =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.phone_number.toLowerCase().includes(searchQuery.toLowerCase())

    );

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }, [data, setData]);


    //  Temporary
    const handleToggleAccess = async (id: string): Promise<void> => {
        console.log(id);
    }

    // Edit Handler
    const handleEdit = useCallback((faculty: Faculty) => {
        const updatedData: {
            name: string;
            email: string;
            user_type: string;
            phone_number: string;
            is_active: boolean
        }
            = {
            name: faculty.name,
            email: faculty.email,
            user_type: faculty.user_type,
            is_active: faculty.is_active,
            phone_number: faculty.phone_number
        };

        setData(updatedData);
        setEditFacultyId(faculty._id);
        setIsEditing(true);
        setOpenModal(true);
    }, [setData, setIsEditing, setOpenModal, setEditFacultyId]);

    // Cancel/Reset Handler
    const handleCancel = () => {
        setIsEditing(false);
        setEditFacultyId(null);
        setData({
            name: '',
            email: '',
            password: '',
            user_type: '',
            phone_number: ''
        });
    }

    // Submit Handler
    const handleSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                if (!confirm('Are you sure you want to update this details?')) return;
                if (data.email === '' || data.name === '') {
                    toast.error('Email and Name are required');
                    return
                }
                const response = await axiosInstance.put(`/user/update/${editFacultyId}`, data);
                console.log(response)
                alert(response?.data?.message);
                toast.success(response?.data?.message || 'Updated Successfully');
                handleCancel();
                fetchAllFaculties();
            } else {
                const response = await axiosInstance.post(`/user/signup`, data);
                toast.success(response?.data?.message || 'Added Successfully');
            }
            setOpenModal(false);
            setData({
                name: '',
                email: '',
                password: '',
                user_type: '',
                phone_number: '',
            });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [isEditing, data, editFacultyId, fetchAllFaculties]);


    return (
        <div>
            <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false}>
                <FacultyForm loading={loading} data={data}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setOpenModal={setOpenModal}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    setData={setData}
                    onChangeHandler={onChangeHandler} />
            </ModalWrapper>

            <div className="flex justify-end my-4">
                <button onClick={() => setOpenModal(true)} className="bg-red-800 text-white px-4 py-2 rounded shadow hover:bg-red-600">
                    Add Faculty
                </button>
            </div>

            <div>
                <h2 className="text-xl px-4 font-semibold text-stone-800">All Faculties</h2>

                <div className='flex items-center my-5 justify-between gap-2 md:px-4'>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-1 px-3 mx-3  rounded-md max-w-xl border
                        border-stone-300 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-800"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* </div> */}


                    <div className="flex justify-end items-center gap-4">
                        <button
                            title='Grid View'
                            className={` ${!tableView ? 'bg-red-800' :
                                'bg-gray-600'} text-white px-2 py-2 rounded shadow hover:bg-red-800`}
                            onClick={() => setTableView(!tableView)}
                        >
                            <BsFillGridFill />
                        </button>
                        <button
                            title='List View'
                            className={`${tableView ? 'bg-red-800' : 'bg-gray-600'}
                               text-white px-2 py-2 rounded shadow hover:bg-red-600`}
                            onClick={() => setTableView(!tableView)}
                        >
                            <FaTableList />
                        </button>
                    </div>

                </div>


                {/* Main Content */}

                {
                    !tableView
                        ?
                        <div className="grid grid-cols-1 gap-4 my-4 max-sm:place-items-center place-content-center px-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
                            {filteredFaculties?.length === 0 ? (
                                <p className="text-stone-600">No faculties found</p>
                            ) : (
                                <>
                                    {filteredFaculties?.map((item: Faculty) => (
                                        <FacultyCardView
                                            key={item._id}
                                            isEditing={isEditing}
                                            setIsEditing={setIsEditing}
                                            handleEdit={handleEdit}
                                            value={item}
                                        />
                                    ))}
                                </>
                            )}
                        </div>

                        : <div className="p-4 overflow-x-auto">
                            <table className="w-full border-collapse rounded shadow-md">
                                <thead className="bg-black">
                                    <tr className='text-white'>
                                        <th className="text-left p-2 text-xs font-semibold ">Avatar</th>
                                        <th className="text-left p-2 text-xs font-semibold ">Name</th>
                                        <th className="text-left p-2 text-xs font-semibold ">Email</th>
                                        <th className="text-left p-2 text-xs font-semibold ">Phone</th>
                                        <th className="text-left p-2 text-xs font-semibold ">Role</th>
                                        <th className="text-left p-2 text-xs font-semibold ">Active</th>
                                        <th className="text-left p-2 text-xs font-semibold ">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFaculties?.map((faculty: Faculty) => (
                                        <FacultyRows
                                            key={faculty._id}
                                            faculty={faculty}
                                            handleEdit={handleEdit}
                                            isEditing={isEditing}
                                            editFacultyId={editFacultyId}
                                            handleToggleAccess={handleToggleAccess}
                                            handleCancel={handleCancel}
                                            handleInputChange={onChangeHandler}
                                            handleSave={handleSubmit}
                                            data={data}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                }


            </div>

            {outLoading && (
                <ModalWrapper open={outLoading} setOpenModal={setOutLoading} outsideClickClose={false}>
                    <Loader />
                </ModalWrapper>
            )}
        </div>
    );
}
