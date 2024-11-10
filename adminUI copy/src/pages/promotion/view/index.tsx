import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomChip from 'src/@core/components/mui/chip';
import CustomAvatar from 'src/@core/components/mui/avatar';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';

const columns: GridColumns = [
  { field: 'promoCode', headerName: 'Promo Code', width: 150 },
  { field: 'discountPercentage', headerName: 'Discount Percentage', width: 200 },
  { field: 'expirationDate', headerName: 'Expiration Date', width: 200 },
  { field: 'terms', headerName: 'Terms', width: 200 },
];

const PromotionTable = () => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const [sort, setSort] = useState('asc');
  const [pageSize, setPageSize] = useState(7);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState('promoCode');

  function loadServerRows(currentPage: number, data: any[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }

  const fetchTableData = useCallback(
    async (sort: string, q: string, column: string) => {
      await axios
.get('/api/promotions', {
          params: {
            q,
            sort,
            column,
          },
        })
.then((res) => {
          setTotal(res.data.total);
          setRows(loadServerRows(page, res.data.data));
        });
    },
    [page, pageSize]
  );

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn);
  }, [fetchTableData, searchValue, sort, sortColumn]);

  const handleSortModel = (newModel: any) => {
    if (newModel.length) {
      setSort(newModel[0].sort);
      setSortColumn(newModel[0].field);
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field);
    } else {
      setSort('asc');
      setSortColumn('promoCode');
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchTableData(sort, value, sortColumn);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        sortingMode="server"
        paginationMode="server"
        onSortModelChange={handleSortModel}
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageChange={(newPage) => setPage(newPage)}
        components={{ Toolbar: ServerSideToolbar }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        componentsProps={{
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: any) => handleSearch(event.target.value),
          },
        }}
      />
    </Box>
  );
};

export default PromotionTable;
