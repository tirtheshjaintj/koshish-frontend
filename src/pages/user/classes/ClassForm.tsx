import React, { SetStateAction, Dispatch, useState, FC } from "react";
import { FaEye, FaEyeSlash, FaToggleOff, FaToggleOn } from "react-icons/fa";
import Loader from "../../../components/common/Loader";
import RequiredStar from "../../../components/common/RequiredStar";
import { Class } from "../../../context/DataProviderContext";


interface FacultyFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  updatedPassword: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenModal: (open: boolean) => void;

  data: {
    name?: string;
    password?: string;
    type?: string;
    email?: string;
    is_active?: boolean;
  };
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setUpdatedPassword: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<Class>>;
  handleCancel: () => void;
}

const ClassForm: FC<FacultyFormProps> = ({
  handleSubmit,
  loading,
  onChangeHandler,
  setOpenModal,
  isEditing,
  setData,
  updatedPassword,
  setUpdatedPassword,
  setIsEditing,
  handleCancel,
  data,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // console.log(data)
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="space-y-4 w-full max-w-lg mx-auto text-xs shadow-lg rounded-lg bg-white  p-6"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-stone-800  text-center">
        {isEditing ? "Edit Details" : "Add Class"}
      </h2>

      {/* is Active */}
      {isEditing && (
        <div className="flex px-2 items-center my-2 justify-end gap-2 ">
          {data?.is_active ? (
            <>
              <p className="font-semibold">Active </p>{" "}
              <FaToggleOn
                title="Active"
                onClick={() => {
                  if (!confirm("Are you sure to Deactivate the account?")) {
                    return;
                  }
                  setData((prev:Class) => ({ ...prev, is_active: false }));
                }}
                size={25}
                className="text-green-500 cursor-pointer"
              />
            </>
          ) : (
            <>
              <p className="font-semibold">Not Active </p>
              <FaToggleOff
                size={25}
                onClick={() => {
                  if (!confirm("Are you sure to Active the account?")) {
                    return;
                  }
                  setData((prev:Class) => ({ ...prev, is_active: true }));
                }}
                title="Inactive"
                className="text-red-500 cursor-pointer"
              />
            </>
          )}
        </div>
      )}

      {/* Name and User Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-stone-700 "
          >
            Class Name <RequiredStar />
          </label>
          <input
            type="text"
            id="name"
            required
            name="name"
            placeholder="Full Name"
            className="w-full mt-1 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white  text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800"
            value={data?.name}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-xs font-medium text-stone-700 "
          >
            Type <RequiredStar />
          </label>
          <select
            id="type"
            required
            name="type"
            className="w-full mt-1 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white  text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800"
            value={data?.type}
            onChange={(e) => onChangeHandler(e)}
          >
            <option value="" disabled>
              Select User Type
            </option>
            {["Senior", "Junior"].map((userType) => (
              <option key={userType} value={userType}>
                {userType}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="email"
          className="block text-xs font-medium text-stone-700 "
        >
          {isEditing ? (
            "Update Email (optional)"
          ) : (
            <>
              Email <RequiredStar />
            </>
          )}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Temporary Email"
          className="w-full mt-1 pr-10 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white  text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800"
          value={data?.email}
          onChange={onChangeHandler}
        />
      </div>

      {!isEditing && (
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-stone-700 "
          >
            Password <RequiredStar />
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            placeholder="Temporary Password"
            className="w-full mt-1 pr-10 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white  text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800"
            value={data?.password}
            onChange={onChangeHandler}
          />
          {/* Toggle Password Visibility Icon */}
          <button
            type="button"
            className="absolute inset-y-0 top-5 right-3 flex items-center text-stone-500  focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
      )}
      {isEditing && (
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-stone-700 "
          >
            Update Password (Optional)
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            placeholder="Temporary Password"
            className="w-full mt-1 pr-10 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white  text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800"
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
          />

          {/* Toggle Password Visibility Icon */}
          <button
            type="button"
            className="absolute inset-y-0 top-5 right-3 flex items-center text-stone-500  focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-red-800 text-white font-medium rounded-md shadow hover:bg-red-600
            "
        >
          {loading ? <Loader /> : isEditing ? "Update" : "Add "}
        </button>
        <button
          type="reset"
          onClick={() => {
            setIsEditing(false);
            setOpenModal(false);
            handleCancel();
          }}
          className="w-full md:w-auto px-6 py-2 bg-stone-800 text-white font-medium rounded-md shadow hover:bg-stone-600  focus:outline-none focus:ring-2 focus:ring-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ClassForm;
