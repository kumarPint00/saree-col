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
  PaletteMode,
  Typography,
} from "@mui/material";
import ToggleColorMode from "@/app/ToggleColorMode";

const ProductAddition = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fabricComposition, setFabricComposition] = useState("");
  const [trims, setTrims] = useState("");
  const [sustainability, setSustainability] = useState("");
  const [washCare, setWashCare] = useState("");
  const [style, setStyle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [sizePrice, setSizePrice] = useState("");
  const [sizeQuantity, setSizeQuantity] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const toggleColorMode = () => {

    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onFabricCompositionChange = (e) => {
    setFabricComposition(e.target.value);
  };

  const onTrimsChange = (e) => {
    setTrims(e.target.value);
  };

  const onSustainabilityChange = (e) => {
    setSustainability(e.target.value);
  };

  const onWashCareChange = (e) => {
    setWashCare(e.target.value);
  };

  const onStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const onSizePriceChange = (e) => {
    setSizePrice(e.target.value);
  };

  const onSizeQuantityChange = (e) => {
    setSizeQuantity(e.target.value);
  };

  const onSizeIdChange = (e) => {
    setSizeId(e.target.value);
  };

  const handleSubmit = () => {
    const newId =
      products.length > 0
        ? Math.max(...products.map((product) => product.id)) + 1
        : 1;
    const newProductObj = {
      id: newId,
      name: name,
      description: description,
      fabricComposition: fabricComposition,
      trims: trims,
      sustainability: sustainability,
      washCare: washCare,
      style: style,
      variants: [
        {
          colorId: "1e4b9346-efcd-409e-83c1-ab41378bdf8c", // Dummy color ID, replace with actual logic to get color ID
          quantity: quantity,
          price: price,
          discount: discount,
          variantSizes: [
            {
              price: sizePrice,
              sizeId: sizeId,
              quantity: sizeQuantity,
            },
          ],
          images: [], // Add logic to handle images
        },
      ],
    };
    setProducts([...products, newProductObj]);
    clearFields();
  };

  console.log('product addtition', products)

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (id) => {
    const selected = products.find((product) => product.id === id);
    setSelectedProduct(selected);
    setOpenDialog(true);
  };

  const handleUpdate = () => {
    const index = products.findIndex(
      (product) => product.id === selectedProduct.id
    );
    if (index !== -1) {
      const updatedProducts = [...products];
      updatedProducts[index] = selectedProduct;
      setProducts(updatedProducts);
    }
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleView = (id) => {
    const selected = products.find((product) => product.id === id);
    setSelectedProduct(selected);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedProduct(null);
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setFabricComposition("");
    setTrims("");
    setSustainability("");
    setWashCare("");
    setStyle("");
    setQuantity("");
    setPrice("");
    setDiscount("");
    setSizePrice("");
    setSizeQuantity("");
    setSizeId("");
  };

  return (
    <Card>
      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

      <CardHeader
        title="Add Products"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Product Name"
                value={name}
                onChange={onNameChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Product Description"
                value={description}
                onChange={onDescriptionChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Fabric Composition"
                placeholder="Fabric Composition"
                value={fabricComposition}
                onChange={onFabricCompositionChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Trims"
                placeholder="Trims"
                value={trims}
                onChange={onTrimsChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Sustainability"
                placeholder="Sustainability"
                value={sustainability}
                onChange={onSustainabilityChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Wash Care"
                placeholder="Wash Care"
                value={washCare}
                onChange={onWashCareChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Style"
                placeholder="Style"
                value={style}
                onChange={onStyleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={onQuantityChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Price"
                placeholder="Price"
                value={price}
                onChange={onPriceChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Discount"
                placeholder="Discount"
                value={discount}
                onChange={onDiscountChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Size Price"
                placeholder="Size Price"
                value={sizePrice}
                onChange={onSizePriceChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Size Quantity"
                placeholder="Size Quantity"
                value={sizeQuantity}
                onChange={onSizeQuantityChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Size ID"
                placeholder="Size ID"
                value={sizeId}
                onChange={onSizeIdChange}
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
                  Add Product
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
                <TableCell>Style</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.style}</TableCell>
                  <TableCell>{product.variants[0].quantity}</TableCell>
                  <TableCell>{product.variants[0].price}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Icon path={mdiDelete} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Icon path={mdiPencilOutline} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(product.id)}
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
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={selectedProduct?.name || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Description"
            value={selectedProduct?.description || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                description: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Style"
            value={selectedProduct?.style || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, style: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Quantity"
            value={selectedProduct?.variants[0].quantity || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                variants: [
                  {
                    ...selectedProduct.variants[0],
                    quantity: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            fullWidth
            label="Price"
            value={selectedProduct?.variants[0].price || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                variants: [
                  { ...selectedProduct.variants[0], price: e.target.value },
                ],
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
        <DialogTitle>View Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <Typography variant="subtitle1">
                Name: {selectedProduct.name}
              </Typography>
              <Typography variant="subtitle1">
                Description: {selectedProduct.description}
              </Typography>
              <Typography variant="subtitle1">
                Style: {selectedProduct.style}
              </Typography>
              <Typography variant="subtitle1">
                Quantity: {selectedProduct.variants[0].quantity}
              </Typography>
              <Typography variant="subtitle1">
                Price: {selectedProduct.variants[0].price}
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

export default ProductAddition;
