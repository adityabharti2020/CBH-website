import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const EditFloorModal = ({ open, handleClose, data, handleAction }) => {
  console.log("data==>", data);
  return (
    <Modal
      open={open}
      //   onClose={handleClose}
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
          p: 2,
          px: 4,
          borderRadius: "10px",
        }}
      >
        <Stack>
          <Typography variant="h5" color={"#9f2936"}>
            Update Floor Rates
          </Typography>
        </Stack>
        <Stack mt={2} spacing={2}>
          <TextField
            type="number"
            value={data?.floor}
            disabled
            name="floor"
            fullWidth
            label="Floor No"
            focused
            size="small"
          />
          <TextField
            type="number"
            value={data?.floorMaintenance}
            name="floorMaintenance"
            label="Floor ratePerSqft"
            size="small"
          />
        </Stack>
        <Button
          variant="contained"
          onClick={handleAction}
          sx={{ mt: 2, marginRight: "1rem" }}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleClose}
          sx={{ mt: 2, marginRight: "1rem" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default EditFloorModal;
