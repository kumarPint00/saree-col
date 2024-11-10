import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const SMS = () => {
  const [smsList, setSMSList] = useState(dummySMSList);
  const [newSMS, setNewSMS] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addSMS = () => {
    if (newSMS.trim() !== '') {
      setSMSList([...smsList, newSMS]);
      setNewSMS('');
    }
  };

  const deleteSMS = (index) => {
    setSMSList(smsList.filter((sms, i) => i !== index));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSMSList = smsList.filter(sms =>
    sms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search SMS</Typography>
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
        <Typography variant="h5" gutterBottom>Add New SMS</Typography>
        <TextFieldAdd
          label="SMS"
          value={newSMS}
          onChange={(e) => setNewSMS(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addSMS}>Add SMS</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View SMS</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SMS</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSMSList.map((sms, index) => (
                <TableRow key={index}>
                  <TableCell>{sms}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deleteSMS(index)}>Delete</Button>
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

export default SMS;

const dummySMSList = [
  'SMS 1',
  'SMS 2',
  'SMS 3'
];
