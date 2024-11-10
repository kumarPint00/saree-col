import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const Coupons = () => {
  const [coupons, setCoupons] = useState(dummyCoupons);
  const [newCoupon, setNewCoupon] = useState({ id: '', code: '', discount: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  const addCoupon = () => {
    if (newCoupon.code.trim() !== '' && newCoupon.discount !== 0) {
      const newId = coupons.length > 0 ? Math.max(...coupons.map(coupon => parseInt(coupon.id))) + 1 : 1;
      const newCouponObj = { ...newCoupon, id: newId.toString() };
      setCoupons([...coupons, newCouponObj]);
      setNewCoupon({ id: '', code: '', discount: 0 });
    }
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search Coupons</Typography>
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
        <Typography variant="h5" gutterBottom>Add New Coupon</Typography>
        <TextFieldAdd
          label="Code"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
          variant="outlined"
          fullWidth
        />
        <TextFieldAdd
          label="Discount"
          type="number"
          value={newCoupon.discount}
          onChange={(e) => setNewCoupon({ ...newCoupon, discount: parseInt(e.target.value) })}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addCoupon}>Add Coupon</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View Coupons</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Coupon ID</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>{coupon.id}</TableCell>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deleteCoupon(coupon.id)}>Delete</Button>
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

export default Coupons;

const dummyCoupons = [
  { id: '1', code: 'COUPON1', discount: 10 },
  { id: '2', code: 'COUPON2', discount: 20 },
  { id: '3', code: 'COUPON3', discount: 15 }
];
