"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { Download, Search, Upload } from 'lucide-react';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearchFields, setTempSearchFields] = useState({
    userId: '',
    id: '',
    title: '',
    completed: ''
  });
  const [searchFields, setSearchFields] = useState({
    userId: '',
    id: '',
    title: '',
    completed: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}todos`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page on search
  }, [searchQuery, pageSize]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handleSearch = () => {
    setSearchFields(tempSearchFields);
    setSearchQuery(JSON.stringify(tempSearchFields)); // Trigger useEffect
  };

  const handleInputChange = (columnName, value) => {
    setTempSearchFields({ ...tempSearchFields, [columnName]: value });
  };

  const handleSort = (columnName) => {
    let direction = 'asc';
    if (sortConfig.key === columnName && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnName, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter(item => {
    for (let key in searchFields) {
      if (searchFields[key] !== '') {
        const itemValue = item[key]?.toString().toLowerCase() || '';
        const searchValue = searchFields[key].toLowerCase();
        if (!itemValue.includes(searchValue)) {
          return false;
        }
      }
    }
    return true;
  });

  // Calculate total pages based on filtered data length and pageSize
  const totalPages = Math.ceil(filteredData.length / pageSize);
  // Calculate starting index for pagination
  const startIndex = (page - 1) * pageSize;
  // Slice the filtered data based on startIndex and pageSize
  const slicedData = filteredData.slice(startIndex, startIndex + pageSize);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const paginationItems = [];
    const handlePageClick = (pageNumber) => () => handlePageChange(pageNumber);

    paginationItems.push(
      <button key="prev" className="bg-blue-500 text-white px-3 m-1 py-2 rounded mr-2" onClick={handlePageClick(page - 1)} disabled={page === 1}>
        Previous
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (i === page || (i <= 2) || (i >= totalPages - 1) || (i >= page - 1 && i <= page + 1)) {
        paginationItems.push(
          <button key={i} className={`px-3 py-1 m-1 rounded ${i === page ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`} onClick={handlePageClick(i)}>
            {i}
          </button>
        );
      } else if (paginationItems[paginationItems.length - 1].key !== '...') {
        paginationItems.push(<span key="..." className="px-4 py-2">...</span>);
      }
    }

    paginationItems.push(
      <button key="next" className="bg-blue-500 text-white m-1 px-3 py-1 rounded" onClick={handlePageClick(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    );

    return paginationItems;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customizable Table</h1>
      {/* Search inputs */}
      <div className="mb-4 grid grid-cols-3">
        {/* Search input for each field */}
        {Object.keys(tempSearchFields).map(field => (
          <input
            key={field}
            type="text"
            placeholder={`Search by ${field}`}
            className="border border-gray-300 px-4 py-2 rounded mr-2 mb-2"
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ))}
        <Button color="warning" className="shadow-md w-28" onClick={handleSearch}>
          <Search size={20} className='pr-1' />Search
        </Button>
      </div>

      <div className=' justify-end flex gap-1  '>
        <Dialog>
          <DialogTrigger asChild>
            <Button color="success" className="shadow-md pr-2"> <Download size={20} className='pr-1' />Import</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-medium ">
                Add Station Data
              </DialogTitle>
            </DialogHeader>
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button type="submit" variant="outline">
                  Disagree
                </Button>
              </DialogClose>
              <Button type="submit">Agree</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button color="destructive" className="shadow-md"><Upload size={20} className='pr-1' />Export</Button>
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Basic Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-medium ">
                What is Modals in UI Design?
              </DialogTitle>
            </DialogHeader>
            <div className="text-sm text-default-500  space-y-4">
              <p>
                <span className="text-primary font-medium">France</span> is the
                most visited country in the world with 117,109,000 international
                tourists, thanks to its rich history and iconic landmarks.
              </p>
              <p>
                France's magnetic City of Light is a perennial tourist
                destination, drawing visitors with its iconic attractions, like
                the Eiffel Tower and the Louvre, and its unmistakable je ne sais
                quoi. Quaint cafes, trendy shopping districts and Haussmann
                architecture give Paris its timeless beauty. But the city's best
                asset is that you're likely to discover something new with each
                trip or season (read: Paris is always a good idea). To best
                explore France's ever-changing capital, get lost wandering the
                charming cobblestone streets, learn its secrets on a walking
                tour head to dynamic art exhibits like the Atelier des Lumières
                or gourmandize at the latest restaurants and pastry shops
              </p>
            </div>
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button type="submit" variant="outline">
                  Disagree
                </Button>
              </DialogClose>
              <Button type="submit">Agree</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <table className="min-w-full text-left">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="px-4 py-2 cursor
-pointer" onClick={() => handleSort('userId')}>
              User ID {sortConfig.key === 'userId' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('title')}>
              Title {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('completed')}>
              Completed {sortConfig.key === 'completed' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        {/* Table data */}
        <tbody>
          {slicedData.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.userId}</td>
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.completed.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        {renderPagination()}
      </div>
    </div>
  );
};

export default List;
