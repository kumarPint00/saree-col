import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled, Select, MenuItem } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const SelectCustom = styled(Select)(({theme})=>({
    background:"white"
}))
const Colors = () => {
  const [colors, setColors] = useState(dummyColors);
  const [newColor, setNewColor] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradient, setSelectedGradient] = useState('');

  const addColor = () => {
    if (selectedColor.trim() !== '') {
      const newId = colors.length > 0 ? Math.max(...colors.map(color => color.id)) + 1 : 1;
      const newColorObj = { id: newId, name: selectedColor };
      setColors([...colors, newColorObj]);
      setSelectedColor('');
    }
  };

  const deleteColor = (id) => {
    setColors(colors.filter(color => color.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredColors = colors.filter(color =>
    color.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search Colors</Typography>
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
        <Typography variant="h5" gutterBottom>Add New Color</Typography>
        <SelectCustom
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="" disabled>
            Select Color
          </MenuItem>
          {dummyColors.map((color) => (
            <MenuItem key={color.id} value={color.name}>
              {color.name}
            </MenuItem>
          ))}
        </SelectCustom>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h5" gutterBottom>Choose Gradient</Typography>
        <SelectCustom
          value={selectedGradient}
          onChange={(e) => setSelectedGradient(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="" disabled>
            Select Gradient
          </MenuItem>
          {dummyGradients.map((gradient) => (
            <MenuItem key={gradient.id} value={gradient.name}>
              {gradient.name}
            </MenuItem>
          ))}
        </SelectCustom>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addColor}>Add Color</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View Colors</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Color ID</TableCell>
                <TableCell>Color Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredColors.map((color) => (
                <TableRow key={color.id}>
                  <TableCell>{color.id}</TableCell>
                  <TableCell>{color.name}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deleteColor(color.id)}>Delete</Button>
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

export default Colors;

const dummyColors = [
  { id: 1, name: 'Red' },
  { id: 2, name: 'Green' },
  { id: 3, name: 'Blue' }
];

const dummyGradients = [
    { id: 1, name: 'Linear Gradient' },
    { id: 2, name: 'Radial Gradient' },
    { id: 3, name: 'Conic Gradient' }
  ];