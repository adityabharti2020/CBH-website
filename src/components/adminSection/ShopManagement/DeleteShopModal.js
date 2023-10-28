import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

const DeleteShopModal = ({ id, getFloorData, shopDetails }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleDelete = async (id) => {
    dispatch(isLoading(true));
    // console.log("id pass kro", id);
    try {
      const res = await axios.delete(
        `/api/v1/admin/delete/shop/by/shopId/${id}`
      );
      if (res?.data?.success === true) {
        dispatch(isLoading(false));
        dispatch(openSnackbar(res?.data?.message, "success"));
        handleOpen();
        getFloorData();
      }
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(openSnackbar("Something Went Wrong", "error"));
      console.log(error.message);
    }
  };
  return (
    <Box sx={{ display: "flex", marginTop: "0.5rem" }}>
      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        multiple={false}
        options={[{ shopNo: "--select--" }, ...shopDetails]}
        getOptionLabel={(option) => option?.shopNo}
        sx={{ width: 200 }}
        renderInput={(params) => {
          return <TextField {...params} label={"--select--"} />;
        }}
      />

      <Button onClick={handleOpen}>
        <DeleteForeverIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Shop
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are You Sure to want to delete this Shop
          </Typography>
          <Button onClick={handleOpen} sx={{ mt: 2, marginRight: "1rem" }}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(id)} sx={{ mt: 2 }}>
            Delete
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteShopModal;
