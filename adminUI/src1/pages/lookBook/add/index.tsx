import React, { useState } from 'react';
import { Grid, Typography, Card, CardHeader, Box, IconButton, TextField, Button, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

const LookBook = () => {
  const [lookBook, setLookBook] = useState({
    name: '',
    description: '',
    images: [],
    showHomepage: false,
    product: []
  });

  const handleAddImage = (event) => {
    setLookBook((prevLookBook) => ({
      ...prevLookBook,
      images: [...prevLookBook.images, event.target.files[0]],
    }));
  };

  const handleRemoveImage = (index) => {
    setLookBook((prevLookBook) => ({
      ...prevLookBook,
      images: prevLookBook.images.filter((image, i) => i !== index),
    }));
  };

  const handleCheckboxChange = (event) => {
    setLookBook((prevLookBook) => ({
      ...prevLookBook,
      showHomepage: event.target.checked,
    }));
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProduct = [...lookBook.product];
    updatedProduct[index] = { ...updatedProduct[index], [name]: value };
    setLookBook((prevLookBook) => ({
      ...prevLookBook,
      product: updatedProduct,
    }));
  };

  const handleAddProduct = () => {
    setLookBook((prevLookBook) => ({
      ...prevLookBook,
      product: [...prevLookBook.product, { name: '', price: '' }],
    }));
  };

  const handleSave = () => {
    // Save the look book to the database
  };

  return (
    <Grid container spacing={2} className='match-height'>
      <Grid item xs={12}>
        <Typography variant='h5'>Look Book</Typography>
        <Card>
          <CardHeader title='Look Book' />
          <Box sx={{ height: 500 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label='Name'
                  value={lookBook.name}
                  onChange={(event) => setLookBook((prevLookBook) => ({ ...prevLookBook, name: event.target.value }))}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Description'
                  value={lookBook.description}
                  onChange={(event) => setLookBook((prevLookBook) => ({ ...prevLookBook, description: event.target.value }))}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant='contained' color='primary' component='label'>
                  <input type='file' onChange={handleAddImage} />
                </Button>
                {lookBook.images.map((image, index) => (
                  <Grid item xs={12} key={index}>
                    <img src={URL.createObjectURL(image)} alt='Image' />
                    <IconButton onClick={() => handleRemoveImage(index)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Checkbox
                  checked={lookBook.showHomepage}
                  onChange={handleCheckboxChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                Show on Homepage
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>Products</Typography>
                {lookBook.product.map((item, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={6}>
                      <TextField
                        label='Name'
                        value={item.name}
                        onChange={(event) => handleProductChange(index, event)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label='Price'
                        value={item.price}
                        onChange={(event) => handleProductChange(index, event)}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                ))}
                <Button variant='contained' color='primary' onClick={handleAddProduct}>
                  Add Product
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' color='primary' onClick={handleSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LookBook;
