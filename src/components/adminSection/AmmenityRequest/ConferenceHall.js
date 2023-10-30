import React, { useState, forwardRef } from "react";
import { Box, Grid, Stack, Typography, Chip, Button } from "@mui/material";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const AcceptAlert = React.forwardRef(function Alert(props, ref){
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// const RejecttAlert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const ConferenceHall = ({ cardData, index, handleOpenModal }) => {
  console.log(cardData);
  const navigate = useNavigate();
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [success, setSuccess] = useState(false);
  const AccepthandleClose = () => {
    setAccept(false);
    setSuccess(true);
  };
  const RejecthandleClose = () => {
    setReject(false);
    setSuccess(false);
  };
  const date = dayjs(cardData.dateForConferenceHall);
  const formattedDate = date.format("DD-MM-YYYY");
  //   console.log(formattedDate);
  const SlotStartTimeFormater = (starttime) => {
    const currentTime = dayjs(starttime);
    // const formattedTime = currentTime.format('HH:mm:ss');
    const formattedStartTime = currentTime.format("h:mm A");
    // console.log(formattedStartTime);
    return formattedStartTime;
  };
  const SlotEndTimeFormater = (endTime) => {
    const currentTime = dayjs(endTime);
    // const formattedTime = currentTime.format('HH:mm:ss');
    const formattedEndTime = currentTime.format("h:mm A");
    // console.log(formattedEndTime);
    return formattedEndTime;
  };
  const statusAcceptHandler = async () => {
    setAccept(true);
    console.log("inside status");
    try {
      const response = await axios.put("/api/v1/admin/update/booking/status", {
        bookingId: cardData._id,
        orderBookingStatus: "accepted",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const statusRejectHandler = async () => {
    setAccept(true);
    console.log("inside status");
        try {
            const response = await axios.put("/api/v1/admin/update/booking/status", {
              bookingId: cardData._id,
              orderBookingStatus: 'rejected',
            });
          } catch (error) {
            console.log(error);
          }
    
  };
  return (
    <>
      <Grid
        item
        key={index}
        xs={12}
        sm={5.75}
        md={5.75}
        sx={{
          bgcolor: "#CCBBFF",
          paddingX: "20px",
          paddingY: "20px",
          borderRadius: "10px",
        }}
      >
        <Stack direction={"column"} sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Chip
              label={cardData?.Amenity.amenityName}
              size="small"
              sx={{
                bgcolor: "white",
              }}
            />
            <Chip
              label={cardData?.bookingStatus}
              size="small"
              color={
                cardData?.bookingStatus === "closed"
                  ? "success"
                  : cardData?.bookingStatus === "resolved"
                  ? "info"
                  : "warning"
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: "15px",
            }}
          >
            <Typography>Booked Date :</Typography>
            <Typography>{formattedDate}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Booked By :</Typography>
            <Typography>{` ${cardData.user.firstName} ${cardData.user.lastName}`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Contact Number :</Typography>
            <Typography>{cardData.user.contactNo}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Booked Price :</Typography>
            <Typography>{cardData.price}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginY: "10px",
            }}
          >
            <Typography
              variant="body2"
              fontFamily={"arial"}
              fontSize={"15px"}
              fontWeight={"bold"}
              sx={{ textAlign: "center" }}
            >
              Booked Slots
            </Typography>
            <Box
              sx={{
                bgcolor: "transparent",
                width: "100%",
                maxHeight: "100px",
                padding: "10px 15px",
                borderRadius: "10px",
                marginY: "10px",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {cardData.bookedSlots.map((slots, id) => {
                return slots._id && slots.startTime && slots.endTime ? (
                  <Typography key={id} sx={{ textAlign: "center" }}>
                    ({SlotStartTimeFormater(slots.startTime)} -{" "}
                    {SlotEndTimeFormater(slots.endTime)})
                  </Typography>
                ) : (
                  "Not available"
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "auto",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "green",
                marginX: "15px",
                "&:hover": { bgcolor: "green" },
              }}
              onClick={statusAcceptHandler}
            >
              Accept
            </Button>
            {/* <Snackbar
              open={accept}
              autoHideDuration={3000}
              onClose={AccepthandleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <AcceptAlert
                onClose={AccepthandleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Booking Accepted!
              </AcceptAlert>
            </Snackbar> */}
            <Button
              variant="contained"
              sx={{ bgcolor: "red", "&:hover": { bgcolor: "red" } }}
              onClick={statusRejectHandler}
            >
              Reject
            </Button>
            {/* <Snackbar
              open={reject}
              autoHideDuration={3000}
              onClose={RejecthandleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <RejecttAlert
                onClose={RejecthandleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Booking Canceled!
              </RejecttAlert>
            </Snackbar> */}
          </Box>
        </Stack>
      </Grid>
    </>
  );
};

export default ConferenceHall;
