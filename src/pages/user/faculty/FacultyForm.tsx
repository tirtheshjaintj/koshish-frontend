import React, { SetStateAction, Dispatch, useState, FC } from "react";
import { FaEye, FaEyeSlash, FaToggleOff, FaToggleOn } from "react-icons/fa";
import Loader from "../../../components/common/Loader";
import RequiredStar from "../../../components/common/RequiredStar";
import { Faculty } from "../../../context/DataProviderContext";

interface FacultyFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setOpenModal: (open: boolean) => void;
  data: {
    name?: string;
    email?: string;
    password: string;
    user_type: string;
    is_active?: boolean;
    phone_number?: string;
  };
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Faculty>>;
  handleCancel: () => void;
}

const FacultyForm: FC<FacultyFormProps> = ({
  handleSubmit,
  loading,
  onChangeHandler,
  setOpenModal,
  isEditing,
  setData,
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
        {isEditing ? "Edit Details" : "Add Faculty"}
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
                  setData((prev) => ({ ...prev, is_active: false }));
                }}
                size={25}
                className="text-green-500   "
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
                  setData((prev) => ({ ...prev, is_active: true }));
                }}
                title="Inactive"
                className="text-red-500   "
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
            Faculty Name <RequiredStar />
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
            htmlFor="user_type"
            className="block text-xs font-medium text-stone-700 "
          >
            Role <RequiredStar />
          </label>
          <select
            id="user_type"
            required
            name="user_type"
            className="w-full mt-1 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white  text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800"
            value={data?.user_type}
            onChange={onChangeHandler}
          >
            <option value="" disabled>
              Select User Type
            </option>
            {["Teacher", "Convenor"].map((userType) => (
              <option key={userType} value={userType}>
                {userType}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Email and Pass */}
      <div
        className={`grid grid-cols-1  md:grid-cols-${
          isEditing ? "1" : "2"
        } gap-4`}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-stone-700 "
          >
            Email <RequiredStar />
          </label>
          <input
            type="email"
            id="email"
            required
            name="email"
            placeholder="Organization Email"
            className={` w-full mt-1 p-2 rounded-md border
             border-stone-300 dark:border-stone-700 bg-white 
              text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800`}
            value={data?.email}
            onChange={onChangeHandler}
          />
        </div>

        <div className="relative">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-stone-700 "
          >
            {isEditing ? (
              "Update Password (optional)"
            ) : (
              <>
                Password <RequiredStar />
              </>
            )}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required={!isEditing}
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
      </div>

      {/* Phone Number */}
      <div>
        <label
          htmlFor="phone_number"
          className="block text-xs font-medium text-stone-700 "
        >
          Phone <RequiredStar />
        </label>
        <input
          type="phone_number"
          id="phone_number"
          name="phone_number"
          minLength={10}
          required
          maxLength={10}
          placeholder="10 digit phone number"
          className="w-full mt-1 p-2 text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-white  text-stone-800  focus:outline-none focus:ring-1 focus:ring-red-800"
          value={data?.phone_number}
          onChange={onChangeHandler}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center flex-wrap gap-4 justify-between">
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

export default FacultyForm;
