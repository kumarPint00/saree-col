import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const PaymentStatus = () => {
  const [paymentStatuses, setPaymentStatuses] = useState(dummyPaymentStatuses);
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addPaymentStatus = () => {
    if (newPaymentStatus.trim() !== '') {
      setPaymentStatuses([...paymentStatuses, newPaymentStatus]);
      setNewPaymentStatus('');
    }
  };

  const deletePaymentStatus = (index) => {
    setPaymentStatuses(paymentStatuses.filter((paymentStatus, i) => i !== index));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPaymentStatuses = paymentStatuses.filter(paymentStatus =>
    paymentStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search Payment Statuses</Typography>
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
        <Typography variant="h5" gutterBottom>Add New Payment Status</Typography>
        <TextFieldAdd
          label="Payment Status"
          value={newPaymentStatus}
          onChange={(e) => setNewPaymentStatus(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addPaymentStatus}>Add Payment Status</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View Payment Statuses</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPaymentStatuses.map((paymentStatus, index) => (
                <TableRow key={index}>
                  <TableCell>{paymentStatus}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deletePaymentStatus(index)}>Delete</Button>
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

export default PaymentStatus;

const dummyPaymentStatuses = [
  'Pending',
  'Paid',
  'Cancelled'
];
