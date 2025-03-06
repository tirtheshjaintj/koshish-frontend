import React from "react";

interface LimitProps {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export default function Limit({ limit, setLimit }: LimitProps) {
  return (
    <select
      value={limit}
      onChange={(e) => setLimit(Number(e.target.value))}
      className="px-3 py-1 border rounded-md bg-white text-stone-800 border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500"
      aria-label="Items per page"
    >
      {[10, 20, 30, 40].map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
