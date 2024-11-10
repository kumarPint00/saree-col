import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Icon from "@mdi/react";
import { mdiDelete, mdiPencilOutline, mdiEyeCircle } from "@mdi/js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const Lookbook = () => {
  const [lookbooks, setLookbooks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showHomePage, setShowHomePage] = useState(false);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedLookbook, setSelectedLookbook] = useState(null);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onShowHomePageChange = (e) => {
    setShowHomePage(e.target.checked);
  };

  const handleSubmit = () => {
    const newId =
      lookbooks.length > 0
        ? Math.max(...lookbooks.map((lookbook) => lookbook.id)) + 1
        : 1;
    const newLookbookObj = {
      id: newId,
      name: name,
      description: description,
      showHomePage: showHomePage,
      products: products,
      images: images,
    };
    setLookbooks([...lookbooks, newLookbookObj]);
    setName("");
    setDescription("");
    setShowHomePage(false);
    setProducts([]);
    setImages([]);
  };

  const handleDelete = (id) => {
    setLookbooks(lookbooks.filter((lookbook) => lookbook.id !== id));
  };

  const handleEdit = (id) => {
    const selected = lookbooks.find((lookbook) => lookbook.id === id);
    setSelectedLookbook(selected);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLookbook(null);
  };

  const handleUpdate = () => {
    const index = lookbooks.findIndex(
      (lookbook) => lookbook.id === selectedLookbook.id
    );
    if (index !== -1) {
      const updatedLookbooks = [...lookbooks];
      updatedLookbooks[index] = selectedLookbook;
      setLookbooks(updatedLookbooks);
    }
    setOpenDialog(false);
    setSelectedLookbook(null);
  };

  const handleView = (id) => {
    const selected = lookbooks.find((lookbook) => lookbook.id === id);
    setSelectedLookbook(selected);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedLookbook(null);
  };

  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages([...images, ...uploadedImages]);
  };

  return (
    <Card>
      <CardHeader
        title="Manage Lookbooks"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Lookbook Name"
                value={name}
                onChange={onNameChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Lookbook Description"
                value={description}
                onChange={onDescriptionChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Show on Homepage"
                type="checkbox"
                checked={showHomePage}
                onChange={onShowHomePageChange}
              />
            </Grid>
            <Grid item xs={4}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  gap: 5,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                >
                  Add Lookbook
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Show on Homepage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lookbooks.map((lookbook) => (
                <TableRow key={lookbook.id}>
                  <TableCell>{lookbook.name}</TableCell>
                  <TableCell>{lookbook.description}</TableCell>
                  <TableCell>{lookbook.showHomePage ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(lookbook.id)}
                    >
                      <Icon path={mdiDelete} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(lookbook.id)}
                    >
                      <Icon path={mdiPencilOutline} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(lookbook.id)}
                    >
                      <Icon path={mdiEyeCircle} size={1} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Lookbook</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={selectedLookbook?.name || ""}
            onChange={(e) =>
              setSelectedLookbook({
                ...selectedLookbook,
                name: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Description"
            value={selectedLookbook?.description || ""}
            onChange={(e) =>
              setSelectedLookbook({
                ...selectedLookbook,
                description: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Show on Homepage"
            type="checkbox"
            checked={selectedLookbook?.showHomePage || false}
            onChange={(e) =>
              setSelectedLookbook({
                ...selectedLookbook,
                showHomePage: e.target.checked,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>View Lookbook Details</DialogTitle>
        <DialogContent>
          {selectedLookbook && (
            <>
              <Typography variant="subtitle1">
                Name: {selectedLookbook.name}
              </Typography>
              <Typography variant="subtitle1">
                Description: {selectedLookbook.description}
              </Typography>
              <Typography variant="subtitle1">
                Show on Homepage:{" "}
                {selectedLookbook.showHomePage ? "Yes" : "No"}
              </Typography>
              <Typography variant="subtitle1">Images:</Typography>
              <Grid container spacing={2}>
                {selectedLookbook.images.map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Lookbook;
