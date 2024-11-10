import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const Refund = () => {
  const [refunds, setRefunds] = useState(dummyRefunds);
  const [newRefund, setNewRefund] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addRefund = () => {
    if (newRefund.trim() !== '') {
      setRefunds([...refunds, newRefund]);
      setNewRefund('');
    }
  };

  const deleteRefund = (index) => {
    setRefunds(refunds.filter((refund, i) => i !== index));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRefunds = refunds.filter(refund =>
    refund.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search Refunds</Typography>
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
        <Typography variant="h5" gutterBottom>Add New Refund</Typography>
        <TextFieldAdd
          label="Refund"
          value={newRefund}
          onChange={(e) => setNewRefund(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addRefund}>Add Refund</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View Refunds</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Refund</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRefunds.map((refund, index) => (
                <TableRow key={index}>
                  <TableCell>{refund}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deleteRefund(index)}>Delete</Button>
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

export default Refund;

const dummyRefunds = [
  'Refund 1',
  'Refund 2',
  'Refund 3'
];
