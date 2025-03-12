import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

interface Result {
  _id: string;
  name: string;
  totalPoints: number;
}

function FinalResult() {
  const [year, setYear] = useState(currentYear);
  const [type, setType] = useState("Junior");
  const [results, setResults] = useState<Result[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/result/finalResult?year=${year}&type=${type}`)
      .then((response) => {
        setResults(response.data.topClasses);
      })
      .catch((error) => console.error("Error fetching results:", error));
  }, [year, type]);

  const filteredTableResults = results.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <motion.h1
          className="text-4xl font-bold text-center mb-8 text-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PCTE Koshish {year} Result - {type} Wing
        </motion.h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center">
          <select
            className="px-4 py-2 border rounded-md bg-white shadow"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded-md bg-white shadow"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-3 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Top 10 Classes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={results.slice(0,10)}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalPoints" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search for Table */}
        <div className="flex justify-center mb-4">
          <input
            className="px-4 py-2 border rounded-md shadow w-full md:w-1/3"
            placeholder="Search class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results Table */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Final Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border px-4 py-2">Rank</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredTableResults.map((result, index) => (
                  <tr key={result._id} className="odd:bg-gray-100 even:bg-white">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{result.name}</td>
                    <td className="border px-4 py-2">{result.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default FinalResult;