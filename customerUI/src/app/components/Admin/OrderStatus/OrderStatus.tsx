import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const OrderStatuses = () => {
  const [statuses, setStatuses] = useState(dummyStatuses);
  const [newStatus, setNewStatus] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addStatus = () => {
    if (selectedStatus.trim() !== '') {
      const newId = statuses.length > 0 ? Math.max(...statuses.map(status => status.id)) + 1 : 1;
      const newStatusObj = { id: newId, name: selectedStatus };
      setStatuses([...statuses, newStatusObj]);
      setSelectedStatus('');
    }
  };

  const deleteStatus = (id) => {
    setStatuses(statuses.filter(status => status.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStatuses = statuses.filter(status =>
    status.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search Order Statuses</Typography>
        <TextFieldAdd
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3} justifyContent="center" alignItems="center">
        <Button variant="contained">Search</Button>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5" gutterBottom>Add New Order Status</Typography>
        <TextFieldAdd
          label="Order Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addStatus}>Add Status</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View Order Statuses</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status ID</TableCell>
                <TableCell>Status Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStatuses.map((status) => (
                <TableRow key={status.id}>
                  <TableCell>{status.id}</TableCell>
                  <TableCell>{status.name}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deleteStatus(status.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default OrderStatuses;

const dummyStatuses = [
  { id: 1, name: 'Pending' },
  { id: 2, name: 'Processing' },
  { id: 3, name: 'Shipped' }
];
