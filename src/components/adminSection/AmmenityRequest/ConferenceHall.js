import React, { useState} from "react";
import {
  Grid,
  Stack,
  Typography,
  Chip,
  List,
  ListItem,
  Avatar,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import CreditCardIcon from "@mui/icons-material/CreditCard";
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

const ConferenceHall = ({
  cardData,
  index,
  handleOpenModal,
  bookingRequest,
}) => {
  // console.log(cardData);
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

  const Createddate = dayjs(cardData.createdAt);
  const CreateddateFormatted = Createddate.format("DD-MM-YYYY");
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
      bookingRequest();
    } catch (error) {
      console.log(error);
    }
  };
  const statusRejectHandler = async () => {
    setAccept(true);
    try {
      const response = await axios.put("/api/v1/admin/update/booking/status", {
        bookingId: cardData._id,
        orderBookingStatus: "rejected",
      });
      bookingRequest();
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
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: {
              xs: "center",
              sm: "end",
              md: "end",
            },
          }}
        >
           <Chip
            label={`${cardData?.Amenity.amenityName}`}
            color={
              cardData?.bookingStatus === "accepted"
                ? "success"
                : cardData?.bookingStatus === "rejected"
                ? "error"
                : "warning"
            }
          />
          <Chip
            label={`${cardData?.bookingStatus.toUpperCase()}`}
            color={
              cardData?.bookingStatus === "accepted"
                ? "success"
                : cardData?.bookingStatus === "rejected"
                ? "error"
                : "warning"
            }
          />
        </Stack>
        <Stack sx={{ marginY: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon sx={{}}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "dodgerblue", fontSize: "15px" }}>
                    {<EventIcon />}
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Booking Detail
              </Typography>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginY: "-20px",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booked On"
                secondary={CreateddateFormatted}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booked for"
                secondary={formattedDate}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary='Booking Id'
                secondary={cardData?._id}
              />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ marginY: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray", fontSize: "15px" }} />
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                User Detail
              </Typography>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginY: "-20px",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booking Raised By"
                secondary={` ${cardData.user.firstName} ${cardData.user.lastName}`}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Contact Number"
                secondary={cardData.user.contactNo}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Email"
                secondary={cardData.user.email}
              />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ marginY: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray", fontSize: "15px" }}>
                    {<CreditCardIcon />}
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Price Detail
              </Typography>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginY: "-20px",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Base Price"
                secondary={` ${cardData.Amenity.basePrice}`}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="GST" secondary={`${cardData.Amenity.GST} %`} />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Total Price" secondary={cardData.price} />
            </ListItem>
          </List>
        </Stack>
        <Stack sx={{ marginY: "15px" }}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "gray" }}>{<PunchClockIcon />}</Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <Typography
                varient="h6"
                component="body1"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Booking Slots
              </Typography>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
            },
            overflow: "hidden",
            width: "100%",
            "& hover": {
              overflowX: "scroll",
            },
            flexWrap: "wrap",
          }}
        >
          {cardData.bookedSlots.map((slots, id) => {
            return slots._id && slots.startTime && slots.endTime ? (
              <Typography
                key={id}
                sx={{
                  textAlign: "center",
                  bgcolor: "lightcyan",
                  borderRadius: "5px",
                  marginX: "15px",
                  marginBottom: "20px",
                  minWidth: "25%",
                  padding:"10px"
                }}
              >
                ({SlotStartTimeFormater(slots.startTime)} -{" "}
                {SlotEndTimeFormater(slots.endTime)})
              </Typography>
            ) : (
              "Not available"
            );
          })}
        </Stack>

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
      </Grid>
    </>
  );
};

ConferenceHall.propTypes = { cardData: [] };
export default ConferenceHall;
