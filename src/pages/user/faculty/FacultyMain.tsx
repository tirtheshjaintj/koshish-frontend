import { useState } from 'react';

import { toast } from 'react-toastify';
import Loader from '../../../components/common/Loader';
import ModalWrapper from '../../../components/common/ModalWrapper';
import FacultyForm from './FacultyForm';
import FacultyRows from './FacultyRows';
import axiosInstance from '../../../config/axiosConfig';

interface Faculty {
    _id: string;
    name: string;
    email: string;
    block: string;
    access: boolean;
}

const dummyFaculties: Faculty[] = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', block: 'A' ,access: true},
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', block: 'B' ,access: true},
    { _id: '3', name: 'Alice Brown', email: 'alice@example.com', block: 'A',access: true },
];

export default function FacultyManageMain() {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editFacultyId, setEditFacultyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [outLoading, setOutLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [allFaculties, setAllFaculties] = useState<Faculty[]>(dummyFaculties);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'faculty',
    });

    const filteredFaculties = allFaculties.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                if (!confirm('Are you sure you want to update this faculty?')) return;
                if (data.email === '' || data.name === '') {
                    toast.error('Email and Name are required');
                    return
                }

                // const response = await axiosInstance.put(`/user/faculty/${editFacultyId}`, data);

                toast.success('Updated Successfully');
                setIsEditing(false);
                setEditFacultyId(null);
            } else {
                toast.success('Successfully Added');
            }
            setOpenModal(false);
            setData({ name: '', email: '', password: '', role: 'faculty' });
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAccess = async (id: string) : Promise<void> => {
        console.log(id);
    }

    
    const handleRemove = (id: string) => {
        if (!confirm('Are you sure you want to remove this faculty?')) return;
        setAllFaculties(allFaculties.filter((faculty) => faculty._id !== id));
        toast.success('Faculty removed successfully');
    };

    //   interface EditProps {
    //     name: string | undefined;
    //     email: string | undefined;
    //     password: string | undefined;
    //     role: string | undefined;  
    //   }

    const handleEdit = (faculty: Faculty) => {
        // const updatedData: EditProps = {
        //   name: faculty.name,
        //   email: faculty.email,
        //   password: '',
        //   role: 'faculty',  
        // };

        // setData(updatedData);
        setEditFacultyId(faculty._id);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditFacultyId(null);
        setData({ name: '', email: '', password: '', role: 'faculty' });
    };

    return (
        <div>
            <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false}>
                <FacultyForm loading={loading} data={data} setOpenModal={setOpenModal} handleSubmit={handleSubmit} onChangeHandler={onChangeHandler} />
            </ModalWrapper>

            <div className="flex justify-end my-4">
                <button onClick={() => setOpenModal(true)} className="bg-red-800 text-white px-4 py-2 rounded shadow hover:bg-red-600">
                    Add Faculty
                </button>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-stone-800">All Faculties</h2>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-1 px-3 mx-3 rounded-md max-w-md border border-stone-300 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="p-4 overflow-x-auto">
                    <table className="w-full border-collapse border border-stone-300">
                        <thead className="bg-stone-100">
                            <tr>
                                <th className="text-left p-2 text-xs font-semibold text-stone-700">Avatar</th>
                                <th className="text-left p-2 text-xs font-semibold text-stone-700">Name</th>
                                <th className="text-left p-2 text-xs font-semibold text-stone-700">Email</th>
                                <th className="text-left p-2 text-xs font-semibold text-stone-700">Access</th>
                                <th className="text-left p-2 text-xs font-semibold text-stone-700">Remove</th>
                                <th className="text-left p-2 text-xs font-semibold text-stone-700">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFaculties?.map((faculty) => (
                                <FacultyRows
                                    key={faculty._id}
                                    faculty={faculty}
                                    handleEdit={handleEdit}
                                    handleRemove={handleRemove}
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
            </div>

            {outLoading && (
                <ModalWrapper open={outLoading} setOpenModal={setOutLoading} outsideClickClose={false}>
                    <Loader />
                </ModalWrapper>
            )}
        </div>
    );
}
