import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const LookBookList = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/lookBooks'); // Adjust the URL to match your backend API endpoint
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching lookBooks:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'showInHomePage', headerName: 'Show in Home Page', width: 200, type: 'boolean' },
    { field: 'searchableText', headerName: 'Searchable Text', width: 300 },
    { field: 'version', headerName: 'Version', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default LookBookList;
