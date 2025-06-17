import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CATEGORY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {  Palette, Code2, BarChart2, Smartphone,  HardHat, Cpu, Home, PenTool, Briefcase } from 'lucide-react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const categoryIcons = {

    'design': <Palette className="w-6 h-6 text-blue-600" />,
    'development': <Code2 className="w-6 h-6 text-green-600" />,
    'sales': <BarChart2 className="w-6 h-6 text-purple-600" />,
    'mobile': <Smartphone className="w-6 h-6 text-orange-600" />,
    'construction': <HardHat className="w-6 h-6 text-yellow-600" />,
    'technology': <Cpu className="w-6 h-6 text-indigo-600" />,
    'real estate': <Home className="w-6 h-6 text-red-600" />,
    'writing': <PenTool className="w-6 h-6 text-pink-600" />,
    'default': <Briefcase className="w-6 h-6 text-gray-600" />,
    "Marketing": <Home className='w-6 h-6 text-red-600' />
  };

  const getCategoryIcon = (categoryName) => {
    const lowerName = categoryName.toLowerCase();
    if (lowerName.includes('design')) return categoryIcons.design;
    if (lowerName.includes('develop')) return categoryIcons.development;
    if (lowerName.includes('sales')) return categoryIcons.sales;
    if (lowerName.includes('mobile')) return categoryIcons.mobile;
    if (lowerName.includes('construct')) return categoryIcons.construction;
    if (lowerName.includes('tech') || lowerName.includes('it')) return categoryIcons.technology;
    if (lowerName.includes('real estate') || lowerName.includes('property')) return categoryIcons['real estate'];
    if (lowerName.includes('write') || lowerName.includes('content')) return categoryIcons.writing;
    return categoryIcons.default;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${CATEGORY_API_END_POINT}/get`);
        if (response.data.success) {
          const categoriesWithCounts = response.data.categories.map(category => ({
            ...category,
            jobCount: Math.floor(Math.random() * 700) + 100,
            icon: getCategoryIcon(category.name)
          }));
          setCategories(categoriesWithCounts);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch categories");
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2 text-center">Browse Job Sectors</h1>
      <p className="text-gray-600 text-center mb-12">Find jobs by category</p>
      
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category._id} 
              className="bg-white rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 cursor-pointer group"
              onClick={() => navigate(`/jobs?category=${category._id}`)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors mr-3">
                    {category.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm mb-4 ml-11">
                  {category.jobCount} jobs available
                </p>
                <div className="mt-auto ml-11">
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jobs?category=${category._id}`);
                    }}
                  >
                    Browse jobs
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div 
            className="bg-blue-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 border-2 border-dashed border-blue-200 cursor-pointer flex flex-col items-center justify-center group"
            onClick={() => navigate('/jobs')}
          >
            <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 mb-4 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2 text-center">
              BROWSE ALL SECTORS
            </h2>
            <p className="text-blue-600 text-sm">Explore all job categories</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;