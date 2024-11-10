import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridColumns, GridEventListener } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Grid, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ServerSideToolbar from './ServerSideToolbar';
import CarUpdate from '../update/[_id]';
import CarImages from '../add/CarImages';

const CarTable = () => {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const Router = useRouter();
  const [sort, setSort] = useState('asc');
  const [pageSize, setPageSize] = useState(7);
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns: GridColumns = [
    // { field: 'name', headerName: 'Name', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    // { field: 'interiorColor', headerName: 'Interior Color', width: 150 },
    // { field: 'exteriorColor', headerName: 'Exterior Color', width: 150 },
    { field: 'year', headerName: 'Year', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'location', headerName: 'Location', width: 150 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150 },
    { field: 'featuredCar', headerName: 'Featured Car', width: 150 },
    // { field: 'status', headerName: 'Status', width: 150 },
    { field: 'services', headerName: 'Services', width: 200 },
    // { field: 'insurranceDetails.strandardInsurrance.sIprice', headerName: 'Standard Insurance Price', width: 200 },
    // { field: 'insurranceDetails.fullInsurrance.fIprice', headerName: 'Full Insurance Price', width: 200 },
    // { field: 'description', headerName: 'Description', width: 200 },
    // { field: 'packageDetails.securityDeposit', headerName: 'Security Deposit', width: 200 },
    // { field: 'packageDetails.ExcessClaimAmount', headerName: 'Excess Claim Amount', width: 200 },
    // { field: 'packageDetails.paymentMethods.creditCard', headerName: 'Credit Card Payment Method', width: 200 },
    // { field: 'carFeatures.transmission', headerName: 'Transmission', width: 200 },
    // { field: 'carFeatures.cruiseControl', headerName: 'Cruise Control', width: 150 },
    // { field: 'carFeatures.engineCapacity', headerName: 'Engine Capacity', width: 200 },
    // { field: 'carFeatures.luggageBootCapacity', headerName: 'Luggage Boot Capacity', width: 200 },
    // { field: 'carFeatures.engineSize', headerName: 'Engine Size', width: 200 },
    // { field: 'carFeatures.bluetooth', headerName: 'Bluetooth', width: 200 },
    // { field: 'carFeatures.aux', headerName: 'Auxiliary Input', width: 200 },
    // { field: 'carFeatures.seater', headerName: 'Seater Capacity', width: 200 },
    // { field: 'carFeatures.navigation', headerName: 'Navigation', width: 200 },
    // { field: 'carFeatures.parkingSense', headerName: 'Parking Sense', width: 200 },
    // { field: 'carFeatures.appleCarPlay', headerName: 'Apple CarPlay', width: 150 },
    // { field: 'carFeatures.isoFix', headerName: 'ISO Fix', width: 150 },
    // { field: 'carFeatures.sunRoof', headerName: 'Sunroof', width: 150 },
    // { field: 'carFeatures.pushButton', headerName: 'Push Button Start', width: 150 },
    // { field: 'carFeatures.lcd', headerName: 'LCD Display', width: 150 },
    // { field: 'carFeatures.rearCamera', headerName: 'Rear Camera', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleView(params.row._id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleEdit(params.row._id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  function loadServerRows(currentPage: number, data: any[]) {
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }

  const fetchTableData = useCallback(
    async (sort: string, q: string, column: string) => {
      await axios
        .get(`${process.env.SERVER_URL}/api/v1/admin/getAllCars`, {
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
      setSortColumn('name');
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchTableData(sort, value, sortColumn);
  };

  const handleEvent: GridEventListener<'rowClick'> = (params, event, details) => {
    console.log('row clicked', params, event, details);
  };

  const handleDoubleClick: GridEventListener<'rowDoubleClick'> = (params, event, details) => {
    console.log('row double clicked', params, event, details);
    Router.push(`/cars/update/${params.row._id}`);
  };

  const handleView = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/admin/getCarById/${id}`);
      setSelectedRow(response.data.data);
      setOpen(true);
    } catch (error) {
      console.error('There was an error fetching the car details!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    Router.push(`/cars/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log("🚀 ~ handleDelete ~ id:", id)
    
    if (window.confirm('Are you sure you want to delete this car?')) {
      await axios.delete(`http://localhost:8000/api/v1/admin/deleteCarById/${id}`);
      fetchTableData(sort, searchValue, sortColumn);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows.map((row) => ({ ...row, id: row._id }))}
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Car Details</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            selectedRow && (
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Basic Details
                </Typography>
              </Grid>
                <Grid item xs={12} >
                <img
              src={selectedRow.carImages?.imageUrl || '/defaultCarImage.jpg'}
              alt={`${selectedRow.brand} ${selectedRow.model}`}
              style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
            />                </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Name:</strong> {selectedRow?.brand} {selectedRow?.model}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Brand:</strong> {selectedRow.brand}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Model:</strong> {selectedRow.model}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Version:</strong> {selectedRow.version}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Interior Color:</strong> {selectedRow.interiorColor}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Exterior Color:</strong> {selectedRow.exteriorColor}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Year:</strong> {selectedRow.year}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Location:</strong> {selectedRow.location}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Category:</strong> {selectedRow.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Vehicle Type:</strong> {selectedRow.vehicleType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Featured Car:</strong> {selectedRow.featuredCar ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Status:</strong> {selectedRow.status}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Services:</strong> {selectedRow.services}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Insurance Details
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Standard Insurance Price:</strong> {selectedRow?.sIprice}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Full Insurance Price:</strong> {selectedRow?.fIprice}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Features
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Transmission:</strong> {selectedRow.carFeatures?.transmission}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Cruise Control:</strong> {selectedRow.carFeatures?.cruiseControl ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Engine Capacity:</strong> {selectedRow.carFeatures?.engineCapacity}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Luggage Boot Capacity:</strong> {selectedRow.carFeatures?.luggageBootCapacity}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Engine Size:</strong> {selectedRow.carFeatures?.engineSize}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Bluetooth:</strong> {selectedRow.carFeatures?.bluetooth}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Auxiliary Input:</strong> {selectedRow.carFeatures?.aux}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Seater Capacity:</strong> {selectedRow.carFeatures?.seater}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Navigation:</strong> {selectedRow.carFeatures?.navigation}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Parking Sense:</strong> {selectedRow.carFeatures?.parkingSense}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Apple CarPlay:</strong> {selectedRow.carFeatures?.appleCarPlay ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>ISO Fix:</strong> {selectedRow.carFeatures?.isoFix ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Sunroof:</strong> {selectedRow.carFeatures?.sunRoof ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Push Button Start:</strong> {selectedRow.carFeatures?.pushButton ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>LCD Display:</strong> {selectedRow.carFeatures?.lcd ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Rear Camera:</strong> {selectedRow.carFeatures?.rearCamera ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Package Details
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Security Deposit:</strong> {selectedRow.packageDetails?.securityDeposit}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Excess Claim Amount:</strong> {selectedRow.packageDetails?.ExcessClaimAmount}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Credit Card Payment:</strong> {selectedRow.packageDetails?.paymentMethods?.creditCard}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Daily Package
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price:</strong> {selectedRow.packageDetails?.dailypackage?.dprice}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free KMs:</strong> {selectedRow.packageDetails?.dailypackage?.dnumOFFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price After Free KMs:</strong> {selectedRow.packageDetails?.dailypackage?.dpriceAfterFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free Cancellation:</strong> {selectedRow.packageDetails?.dailypackage?.dfreeCancellation ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Cancellation Charge:</strong> {selectedRow.packageDetails?.dailypackage?.dcancellationCharge}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Delivery Charges:</strong> {selectedRow.packageDetails?.dailypackage?.ddeliveryCharges}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Minimum Days:</strong> {selectedRow.packageDetails?.dailypackage?.dminimumDays}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Weekly Package
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price:</strong> {selectedRow.packageDetails?.weeklypackage?.wprice}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free KMs:</strong> {selectedRow.packageDetails?.weeklypackage?.wnumOFFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price After Free KMs:</strong> {selectedRow.packageDetails?.weeklypackage?.wpriceAfterFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free Cancellation:</strong> {selectedRow.packageDetails?.weeklypackage?.wfreeCancellation ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Cancellation Charge:</strong> {selectedRow.packageDetails?.weeklypackage?.wcancellationCharge}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Delivery Charges:</strong> {selectedRow.packageDetails?.weeklypackage?.wdeliveryCharges}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Monthly Package
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>One Month Price:</strong> {selectedRow.packageDetails?.monthlypackage?.oneMonthPrice?.m1price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.oneMonthPrice?.m1numOFFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price After Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.oneMonthPrice?.m1priceAfterFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free Cancellation:</strong> {selectedRow.packageDetails?.monthlypackage?.oneMonthPrice?.m1freeCancellation ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Cancellation Charge:</strong> {selectedRow.packageDetails?.monthlypackage?.oneMonthPrice?.m1cancellationCharge}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Delivery Charges:</strong> {selectedRow.packageDetails?.monthlypackage?.oneMonthPrice?.m1deliveryCharges}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Three Month Price:</strong> {selectedRow.packageDetails?.monthlypackage?.threeMonthPrice?.m3price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.threeMonthPrice?.m3numOFFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price After Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.threeMonthPrice?.m3priceAfterFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free Cancellation:</strong> {selectedRow.packageDetails?.monthlypackage?.threeMonthPrice?.m3freeCancellation ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Cancellation Charge:</strong> {selectedRow.packageDetails?.monthlypackage?.threeMonthPrice?.m3cancellationCharge}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Delivery Charges:</strong> {selectedRow.packageDetails?.monthlypackage?.threeMonthPrice?.m3deliveryCharges}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Six Month Price:</strong> {selectedRow.packageDetails?.monthlypackage?.sixMonthPrice?.m6price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.sixMonthPrice?.m6numOFFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price After Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.sixMonthPrice?.m6priceAfterFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free Cancellation:</strong> {selectedRow.packageDetails?.monthlypackage?.sixMonthPrice?.m6freeCancellation ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Delivery Charges:</strong> {selectedRow.packageDetails?.monthlypackage?.sixMonthPrice?.m6deliveryCharges}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Nine Month Price:</strong> {selectedRow.packageDetails?.monthlypackage?.nineMonthPrice?.m9price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.nineMonthPrice?.m9numOFFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Price After Free KMs:</strong> {selectedRow.packageDetails?.monthlypackage?.nineMonthPrice?.m9priceAfterFreeKMs}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Cancellation Charge:</strong> {selectedRow.packageDetails?.monthlypackage?.nineMonthPrice?.m9cancellationCharge}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Delivery Charges:</strong> {selectedRow.packageDetails?.monthlypackage?.nineMonthPrice?.m9deliveryCharges}</Typography>
              </Grid>
            </Grid>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarTable;
