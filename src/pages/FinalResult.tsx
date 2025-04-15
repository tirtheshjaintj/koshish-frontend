import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import Nav from "../components/home/StaticNavbar";

const currentYear = new Date().getFullYear() - 1;
const RESULTS_PER_PAGE = 20;

interface Result {
  _id: string;
  name: string;
  totalPoints: number;
}

const COLORS = [
  '#991b1b', // red-800
  '#1e293b', // stone-800
  '#7f1d1d', // red-900
  '#334155', // slate-700
  '#9a3412', // orange-800
  '#475569', // slate-600
  '#dc2626', // red-600
  '#64748b', // slate-500
  '#ea580c', // orange-600
  '#94a3b8', // slate-400
];

function FinalResult() {
  const [year, setYear] = useState(currentYear);
  const [type, setType] = useState("Junior");
  const [results, setResults] = useState<Result[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/result/finalResult?year=${year}&type=${type}`)
      .then((response) => {
        setResults(response.data.topClasses);
        setCurrentPage(1); // Reset to first page when data changes
      })
      .catch((error) => console.error("Error fetching results:", error))
      .finally(() => setLoading(false));
  }, [year, type]);

  const filteredResults = results.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedResults = filteredResults.slice(
    0,
    currentPage * RESULTS_PER_PAGE
  );

  const hasMoreResults = filteredResults.length > paginatedResults.length;

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-white">
        {/* Hero Section with red-800 bg */}
        <div className="bg-red-800">
          <motion.div
            className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.h1
                className="mb-3 text-3xl font-bold text-white md:text-5xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                PCTE Koshish {year} Results
              </motion.h1>
              <motion.p
                className="max-w-3xl mx-auto text-xl text-red-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Celebrating excellence in the {type} Wing
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-8 mx-auto -mt-8 max-w-7xl sm:px-6 lg:px-8 md:py-12">
          {/* Filters Card */}
          <motion.div
            className="p-6 mb-8 bg-white border border-gray-100 shadow-lg rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <div className="relative w-full md:w-48">
                <label className="block mb-1 text-sm font-medium text-gray-700">Year</label>
                <select
                  className="block w-full pl-4 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-lg bg-gray-50"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative w-full md:w-48">
                <label className="block mb-1 text-sm font-medium text-gray-700">Wing</label>
                <select
                  className="block w-full pl-4 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-lg bg-gray-50"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Junior">Junior Wing</option>
                  <option value="Senior">Senior Wing</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Bar Chart Section */}
          <motion.div
            className="p-6 mb-8 bg-white border border-gray-100 shadow-lg rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                <span className="inline-block w-1.5 h-6 bg-red-800 mr-2 align-middle"></span>
                Top 10 Classes Performance
              </h2>
              <span className="text-sm text-gray-500">{results.length} classes total</span>
            </div>

            {loading ? (
              <div className="w-full rounded-lg h-80 bg-gradient-to-r from-gray-50 to-gray-100 animate-pulse"></div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.slice(0, 10)}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#4b5563', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      tick={{ fill: '#4b5563', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '0.5rem 1rem'
                      }}
                      itemStyle={{ color: '#991b1b', fontWeight: 500 }}
                      labelStyle={{ fontWeight: 600, color: '#111827' }}
                    />
                    <Bar dataKey="totalPoints" radius={[4, 4, 0, 0]} barSize={40}>
                      {results.slice(0, 10).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          strokeWidth={index === 2 ? 1 : 0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          {/* Search and Results Section */}
          <motion.div
            className="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  <span className="inline-block w-1.5 h-6 bg-red-800 mr-2 align-middle"></span>
                  Complete Results Table
                </h2>
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-12 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Rank
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Class Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Total Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedResults.map((result, index) => (
                        <tr
                          key={result._id}
                          className="transition-colors duration-150 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${index < 3
                                ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                              }`}>
                              #{index + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {result.name}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">
                            {result.totalPoints.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {hasMoreResults && (
                    <div className="px-6 py-4 text-center border-t border-gray-200">
                      <button
                        onClick={loadMore}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-red-800 border border-transparent rounded-md shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Load More Results
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default FinalResult;