import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const Email = () => {
  const [emails, setEmails] = useState(dummyEmails);
  const [newEmail, setNewEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addEmail = () => {
    if (newEmail.trim() !== '') {
      setEmails([...emails, newEmail]);
      setNewEmail('');
    }
  };

  const deleteEmail = (index) => {
    setEmails(emails.filter((email, i) => i !== index));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmails = emails.filter(email =>
    email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search Emails</Typography>
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
        <Typography variant="h5" gutterBottom>Add New Email</Typography>
        <TextFieldAdd
          label="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addEmail}>Add Email</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View Emails</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmails.map((email, index) => (
                <TableRow key={index}>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deleteEmail(index)}>Delete</Button>
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

export default Email;

const dummyEmails = [
  'email1@example.com',
  'email2@example.com',
  'email3@example.com'
];
