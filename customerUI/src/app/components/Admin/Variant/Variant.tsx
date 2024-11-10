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
  Input,
  Typography,
} from "@mui/material";

const Variant = () => {
  const [variants, setVariants] = useState([]);
  const [productId, setProductId] = useState("");
  const [colorId, setColorId] = useState("");
  const [styleId, setStyleId] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [amountIND, setAmountIND] = useState("");
  const [amountUK, setAmountUK] = useState("");
  const [amountCAD, setAmountCAD] = useState("");
  const [amountAUD, setAmountAUD] = useState("");
  const [amountUAED, setAmountUAED] = useState("");
  const [amountEURO, setAmountEURO] = useState("");
  const [amountYEN, setAmountYEN] = useState("");
  const [amountWON, setAmountWON] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const uploadedImageUrls = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImageUrls.push(e.target.result);
        if (uploadedImageUrls.length === files.length) {
          setUploadedImages(uploadedImageUrls);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const onColorIdChange = (e) => {
    setColorId(e.target.value);
  };

  const onStyleIdChange = (e) => {
    setStyleId(e.target.value);
  };

  const onDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onSizeIdChange = (e) => {
    setSizeId(e.target.value);
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const onImagesChange = (e) => {
    setImages(e.target.value);
  };

  const onAmountINDChange = (e) => {
    setAmountIND(e.target.value);
  };

  const onAmountUKChange = (e) => {
    setAmountUK(e.target.value);
  };

  const onAmountCADChange = (e) => {
    setAmountCAD(e.target.value);
  };

  const onAmountAUDChange = (e) => {
    setAmountAUD(e.target.value);
  };

  const onAmountUAEDChange = (e) => {
    setAmountUAED(e.target.value);
  };

  const onAmountEUROChange = (e) => {
    setAmountEURO(e.target.value);
  };

  const onAmountYENChange = (e) => {
    setAmountYEN(e.target.value);
  };

  const onAmountWONChange = (e) => {
    setAmountWON(e.target.value);
  };

  const handleSubmit = () => {
    // Check if all required fields are filled
    // if (
    //   !productId ||
    //   !colorId ||
    //   !styleId ||
    //   !discount ||
    //   !price ||
    //   !sizeId ||
    //   !quantity ||
    //   images.length === 0 ||
    //   !amountIND ||
    //   !amountUK ||
    //   !amountCAD ||
    //   !amountAUD ||
    //   !amountUAED ||
    //   !amountEURO ||
    //   !amountYEN ||
    //   !amountWON
    // ) {
    //   console.log("Please fill in all required fields");
    //   return;
    // }
  
    console.log("button clicked");
    console.log("Current state values:", {
      productId,
      colorId,
      styleId,
      discount,
      price,
      sizeId,
      quantity,
      images,
      amountIND,
      amountUK,
      amountCAD,
      amountAUD,
      amountUAED,
      amountEURO,
      amountYEN,
      amountWON,
    });
  
    const newId =
      variants.length > 0
        ? Math.max(...variants.map((variant) => variant.id)) + 1
        : 1;
    const newVariantObj = {
      id: newId,
      productId,
      colorId,
      styleId,
      discount,
      variantSizes: [
        {
          price,
          sizeId,
          quantity,
        },
      ],
      images,
      prices: {
        amountIND,
        amountUK,
        amountCAD,
        amountAUD,
        amountUAED,
        amountEURO,
        amountYEN,
        amountWON,
      },
    };
    setVariants([...variants, newVariantObj]);
  
    setProductId("");
    setColorId("");
    setStyleId("");
    setDiscount("");
    setPrice("");
    setSizeId("");
    setQuantity("");
    setImages([]);
    setAmountIND("");
    setAmountUK("");
    setAmountCAD("");
    setAmountAUD("");
    setAmountUAED("");
    setAmountEURO("");
    setAmountYEN("");
    setAmountWON("");
  
    console.log("Variants:", variants);
  };
  
  const handleDelete = (id) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  const handleEdit = (id) => {
    const selected = variants.find((variant) => variant.id === id);
    setSelectedVariant(selected);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVariant(null);
  };

  const handleUpdate = () => {
    const index = variants.findIndex(
      (variant) => variant.id === selectedVariant.id
    );
    if (index !== -1) {
      const updatedVariants = [...variants];
      updatedVariants[index] = selectedVariant;
      setVariants(updatedVariants);
    }
    setOpenDialog(false);
    setSelectedVariant(null);
  };

  const handleView = (id) => {
    const selected = variants.find((variant) => variant.id === id);
    setSelectedVariant(selected);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedVariant(null);
  };

  return (
    <Card>
      <CardHeader
        title="Add Variant Details"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Product ID"
                placeholder="Product ID"
                value={productId}
                onChange={onProductIdChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Color ID"
                placeholder="Color ID"
                value={colorId}
                onChange={onColorIdChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Style ID"
                placeholder="Style ID"
                value={styleId}
                onChange={onStyleIdChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Discount"
                placeholder="Discount"
                value={discount}
                onChange={onDiscountChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Price"
                placeholder="Price"
                value={price}
                onChange={onPriceChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Size ID"
                placeholder="Size ID"
                value={sizeId}
                onChange={onSizeIdChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={onQuantityChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="upload-images"
                multiple
              />
              <label htmlFor="upload-images">
                <Button variant="outlined" component="span">
                  Upload Images
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              {uploadedImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Uploaded ${index}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginRight: "10px",
                  }}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Prices</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (INR)"
                placeholder="Amount (INR)"
                value={amountIND}
                onChange={onAmountINDChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (UK)"
                placeholder="Amount (UK)"
                value={amountUK}
                onChange={onAmountUKChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (CAD)"
                placeholder="Amount (CAD)"
                value={amountCAD}
                onChange={onAmountCADChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (AUD)"
                placeholder="Amount (AUD)"
                value={amountAUD}
                onChange={onAmountAUDChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (UAED)"
                placeholder="Amount (UAED)"
                value={amountUAED}
                onChange={onAmountUAEDChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (EURO)"
                placeholder="Amount (EURO)"
                value={amountEURO}
                onChange={onAmountEUROChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (YEN)"
                placeholder="Amount (YEN)"
                value={amountYEN}
                onChange={onAmountYENChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Amount (WON)"
                placeholder="Amount (WON)"
                value={amountWON}
                onChange={onAmountWONChange}
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
                  Add Variant
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Color ID</TableCell>
                <TableCell>Style ID</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Size ID</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>{variant.productId}</TableCell>
                  <TableCell>{variant.colorId}</TableCell>
                  <TableCell>{variant.styleId}</TableCell>
                  <TableCell>{variant.discount}</TableCell>
                  <TableCell>{variant.variantSizes[0].price}</TableCell>
                  <TableCell>{variant.variantSizes[0].sizeId}</TableCell>
                  <TableCell>{variant.variantSizes[0].quantity}</TableCell>
                  <TableCell>
                    {variant.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        style={{
                          maxWidth: "50px",
                          maxHeight: "50px",
                          marginRight: "5px",
                        }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(variant.id)}
                    >
                      <Icon path={mdiDelete} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(variant.id)}
                    >
                      <Icon path={mdiPencilOutline} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(variant.id)}
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
        <DialogTitle>Edit Variant</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Product ID"
            value={selectedVariant?.productId || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                productId: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Color ID"
            value={selectedVariant?.colorId || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                colorId: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Style ID"
            value={selectedVariant?.styleId || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                styleId: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Discount"
            value={selectedVariant?.discount || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                discount: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Price"
            value={selectedVariant?.variantSizes[0].price || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                variantSizes: [
                  {
                    ...selectedVariant.variantSizes[0],
                    price: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            fullWidth
            label="Size ID"
            value={selectedVariant?.variantSizes[0].sizeId || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                variantSizes: [
                  {
                    ...selectedVariant.variantSizes[0],
                    sizeId: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            fullWidth
            label="Quantity"
            value={selectedVariant?.variantSizes[0].quantity || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                variantSizes: [
                  {
                    ...selectedVariant.variantSizes[0],
                    quantity: e.target.value,
                  },
                ],
              })
            }
          />
          <TextField
            fullWidth
            label="Images"
            value={selectedVariant?.images.join(", ") || ""}
            onChange={(e) =>
              setSelectedVariant({
                ...selectedVariant,
                images: e.target.value.split(", "),
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
        <DialogTitle>View Variant Details</DialogTitle>
        <DialogContent>
          {selectedVariant && (
            <>
              <Typography variant="subtitle1">
                Product ID: {selectedVariant.productId}
              </Typography>
              <Typography variant="subtitle1">
                Color ID: {selectedVariant.colorId}
              </Typography>
              <Typography variant="subtitle1">
                Style ID: {selectedVariant.styleId}
              </Typography>
              <Typography variant="subtitle1">
                Discount: {selectedVariant.discount}
              </Typography>
              <Typography variant="subtitle1">
                Price: {selectedVariant.variantSizes[0].price}
              </Typography>
              <Typography variant="subtitle1">
                Size ID: {selectedVariant.variantSizes[0].sizeId}
              </Typography>
              <Typography variant="subtitle1">
                Quantity: {selectedVariant.variantSizes[0].quantity}
              </Typography>
              <Typography variant="subtitle1">
                Images:{" "}
                {selectedVariant.images && Array.isArray(selectedVariant.images)
                  ? selectedVariant.images.join(", ")
                  : ""}
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

export default Variant;
