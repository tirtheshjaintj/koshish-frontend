import React from 'react';
import { FaRegPenToSquare, FaCircleCheck } from "react-icons/fa6";
import { Class } from './ClassMain';

interface FacultyCardViewProps {
    value: Class;
    handleEdit: (value: Class) => void;
}

export default function ClassCardView({ value, handleEdit }: FacultyCardViewProps) {
    return (
        <div className="relative flex items-center gap-4 p-4 bg-white shadow-md rounded-lg min-w-[280px] max-sm:max-w-[280px] md:min-w-[350px] transition-all hover:shadow-xl">
            
            {/* Left Indicator Bar for a subtle touch */}
            <div className="w-1 h-full bg-red-800 rounded-l-md"></div>

            {/* Content Section */}
            <div className="flex-1">
                <p className="font-semibold text-lg text-stone-800">
                    {value?.name?.slice(0, 20) + (value?.name?.length > 20 ? "..." : "")}
                </p>
                <p className="text-xs font-semibold text-red-800 tracking-wide">
                    {value?.type?.toUpperCase()}
                </p>
            </div>

            {/* Icons Section */}
            <div className="flex  gap-2 absolute right-4 top-4">
                {value?.is_active && (
                    <FaCircleCheck
                        title="Active"
                        className="text-green-500"
                    />
                )}
                <FaRegPenToSquare
                    onClick={() => handleEdit(value)}
                    title="Edit"
                    className="text-stone-800 cursor-pointer hover:scale-110 transition-transform duration-200"
                />
            </div>
        </div>
    );
}
