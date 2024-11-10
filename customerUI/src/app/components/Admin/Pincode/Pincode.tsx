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

const Pincode = () => {
  const [pincodes, setPincodes] = useState([]);
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState(null);

  const onPincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const onAreaChange = (e) => {
    setArea(e.target.value);
  };

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onStateChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = () => {
    if (pincode.trim() !== "" && area.trim() !== "" && city.trim() !== "" && state.trim() !== "") {
      const newId =
        pincodes.length > 0
          ? Math.max(...pincodes.map((pincode) => pincode.id)) + 1
          : 1;
      const newPincodeObj = {
        id: newId,
        pincode: pincode,
        area: area,
        city: city,
        state: state,
      };
      setPincodes([...pincodes, newPincodeObj]);
      setPincode("");
      setArea("");
      setCity("");
      setState("");
    }
  };

  const handleDelete = (id) => {
    setPincodes(pincodes.filter((pincode) => pincode.id !== id));
  };

  const handleEdit = (id) => {
    const selected = pincodes.find((pincode) => pincode.id === id);
    setSelectedPincode(selected);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPincode(null);
  };

  const handleUpdate = () => {
    const index = pincodes.findIndex(
      (pincode) => pincode.id === selectedPincode.id
    );
    if (index !== -1) {
      const updatedPincodes = [...pincodes];
      updatedPincodes[index] = selectedPincode;
      setPincodes(updatedPincodes);
    }
    setOpenDialog(false);
    setSelectedPincode(null);
  };

  const handleView = (id) => {
    const selected = pincodes.find((pincode) => pincode.id === id);
    setSelectedPincode(selected);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedPincode(null);
  };

  return (
    <Card>
      <CardHeader
        title="Add Pincode Details"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Pincode"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={onPincodeChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Area"
                placeholder="Enter Area"
                value={area}
                onChange={onAreaChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="City"
                placeholder="Enter City"
                value={city}
                onChange={onCityChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="State"
                placeholder="Enter State"
                value={state}
                onChange={onStateChange}
              />
            </Grid>
            <Grid item xs={12}>
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
                  Add Pincode
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pincode</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pincodes.map((pincode) => (
                <TableRow key={pincode.id}>
                  <TableCell>{pincode.pincode}</TableCell>
                  <TableCell>{pincode.area}</TableCell>
                  <TableCell>{pincode.city}</TableCell>
                  <TableCell>{pincode.state}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(pincode.id)}
                    >
                      <Icon path={mdiDelete} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(pincode.id)}
                    >
                      <Icon path={mdiPencilOutline} size={1} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(pincode.id)}
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
        <DialogTitle>Edit Pincode Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Pincode"
            value={selectedPincode?.pincode || ""}
            onChange={(e) =>
              setSelectedPincode({ ...selectedPincode, pincode: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Area"
            value={selectedPincode?.area || ""}
            onChange={(e) =>
              setSelectedPincode({
                ...selectedPincode,
                area: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="City"
            value={selectedPincode?.city || ""}
            onChange={(e) =>
              setSelectedPincode({
                ...selectedPincode,
                city: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="State"
            value={selectedPincode?.state || ""}
            onChange={(e) =>
              setSelectedPincode({
                ...selectedPincode,
                state: e.target.value,
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
        <DialogTitle>View Pincode Details</DialogTitle>
        <DialogContent>
          {selectedPincode && (
            <>
              <Typography variant="subtitle1">
                Pincode: {selectedPincode.pincode}
              </Typography>
              <Typography variant="subtitle1">
                Area: {selectedPincode.area}
              </Typography>
              <Typography variant="subtitle1">
                City: {selectedPincode.city}
              </Typography>
              <Typography variant="subtitle1">
                State: {selectedPincode.state}
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

export default Pincode;
