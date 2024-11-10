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
  MenuItem,
  Typography,
} from "@mui/material";
import { ColorPicker } from "material-ui-color";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [key, setKey] = useState("");
  const [color, setColor] = useState(""); // Store the color object
  const [style, setStyle] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const onKeyChange = (e) => {
    setKey(e.target.value);
    setColor(""); // Reset color when key changes
    setStyle("");
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex); // Update color when selected
  };

  const onStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim() !== "" && categoryId.trim() !== "" && key.trim() !== "") {
      const newId =
        categories.length > 0
          ? Math.max(...categories.map((category) => category.id)) + 1
          : 1;
      const newCategoryObj = {
        id: newId,
        name: name,
        categoryId: categoryId,
        key: key,
        value: key === "color" ? color : style,
      };
      setCategories([...categories, newCategoryObj]);
      setName("");
      setCategoryId("");
      setKey("");
      setColor("");
      setStyle("");
    }
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEdit = (id) => {
    const selected = categories.find((category) => category.id === id);
    setSelectedCategory(selected);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleUpdate = () => {
    const index = categories.findIndex(
      (category) => category.id === selectedCategory.id
    );
    if (index !== -1) {
      const updatedCategories = [...categories];
      updatedCategories[index] = selectedCategory;
      setCategories(updatedCategories);
    }
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleView = (id) => {
    const selected = categories.find((category) => category.id === id);
    setSelectedCategory(selected);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedCategory(null);
  };

  return (
    <Card>
      <CardHeader
        title="Add the Categories"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Category Name"
                value={name}
                onChange={onNameChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Category ID"
                placeholder="Category ID"
                value={categoryId}
                onChange={onCategoryIdChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                label="Key"
                value={key}
                onChange={onKeyChange}
              >
                <MenuItem value="color">Color</MenuItem>
                <MenuItem value="style">Style</MenuItem>
              </TextField>
            </Grid>
            {key === "color" && (
              <Grid item xs={4}>
                <ColorPicker
                  value={color}
                  onChange={handleColorChange}
                />
              </Grid>
            )}
            {key === "style" && (
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Style"
                  placeholder="Style"
                  value={style}
                  onChange={onStyleChange}
                />
              </Grid>
            )}
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
                  Add Category
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.categoryId}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.key}</TableCell>
                  <TableCell>{category.value}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Icon path={mdiDelete} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(category.id)}
                    >
                      <Icon path={mdiPencilOutline} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(category.id)}
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={selectedCategory?.name || ""}
            onChange={(e) =>
              setSelectedCategory({ ...selectedCategory, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Category ID"
            value={selectedCategory?.categoryId || ""}
            onChange={(e) =>
              setSelectedCategory({
                ...selectedCategory,
                categoryId: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            select
            label="Key"
            value={selectedCategory?.key || ""}
            onChange={(e) =>
              setSelectedCategory({ ...selectedCategory, key: e.target.value })
            }
          >
            <MenuItem value="color">Color</MenuItem>
            <MenuItem value="style">Style</MenuItem>
          </TextField>
          {selectedCategory?.key === "color" && (
            <ColorPicker
              value={selectedCategory?.value || ""}
              onChange={(newColor) =>
                setSelectedCategory({
                  ...selectedCategory,
                  value: newColor.hex,
                })
              }
            />
          )}
          {selectedCategory?.key === "style" && (
            <TextField
              fullWidth
              label="Style"
              value={selectedCategory?.value || ""}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  value: e.target.value,
                })
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle>View Category Details</DialogTitle>
        <DialogContent>
          {selectedCategory && (
            <>
              <Typography variant="subtitle1">
                Name: {selectedCategory.name}
              </Typography>
              <Typography variant="subtitle1">
                Category ID: {selectedCategory.categoryId}
              </Typography>
              <Typography variant="subtitle1">
                Key: {selectedCategory.key}
              </Typography>
              <Typography variant="subtitle1">
                Value: {selectedCategory.value}
              </Typography>
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

export default Category;
