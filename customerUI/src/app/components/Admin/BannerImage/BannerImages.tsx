import { useState } from 'react';
import { Grid, Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';

const TextFieldAdd = styled(TextField)(({theme})=>({
  background:'white'
}));

const BannerImages = () => {
  const [images, setImages] = useState(dummyImages);
  const [newImage, setNewImage] = useState({ id: '', name: '', imageUrl: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const addImage = () => {
    if (newImage.name.trim() !== '' && newImage.imageUrl.trim() !== '') {
      const newId = images.length > 0 ? Math.max(...images.map(image => parseInt(image.id))) + 1 : 1;
      const newImageObj = { ...newImage, id: newId.toString() };
      setImages([...images, newImageObj]);
      setNewImage({ id: '', name: '', imageUrl: '' });
    }
  };

  const deleteImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>Search Images</Typography>
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
        <Typography variant="h5" gutterBottom>Add New Image</Typography>
        <TextFieldAdd
          label="Name"
          value={newImage.name}
          onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
          variant="outlined"
          fullWidth
        />
        <TextFieldAdd
          label="Image URL"
          value={newImage.imageUrl}
          onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={addImage}>Add Image</Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>View Images</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Image URL</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>{image.id}</TableCell>
                  <TableCell>{image.name}</TableCell>
                  <TableCell>{image.imageUrl}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => deleteImage(image.id)}>Delete</Button>
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

export default BannerImages;

const dummyImages = [
  { id: '1', name: 'Image 1', imageUrl: 'https://example.com/image1.jpg' },
  { id: '2', name: 'Image 2', imageUrl: 'https://example.com/image2.jpg' },
  { id: '3', name: 'Image 3', imageUrl: 'https://example.com/image3.jpg' }
];
