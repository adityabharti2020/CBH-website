import React from "react";
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
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import dayjs from "dayjs";

const RejectConferenceHall = ({ cardData }) => {
  const Generateddate = dayjs(cardData.createdAt);
  const formatteGenerateddate = Generateddate.format("DD-MM-YYYY");

  const UpdatedDate = dayjs(cardData?.updatedAt);
  const UpdateformattedDate = UpdatedDate.format("DD-MM-YYYY");

  const BookingDate = dayjs(cardData?.dateForConferenceHall);
  const UpdateBookingDate = BookingDate.format("DD-MM-YYYY");

  const SlotStartTimeFormater = (starttime) => {
    const currentTime = dayjs(starttime);
    const formattedStartTime = currentTime.format("h:mm A");
    return formattedStartTime;
  };

  const SlotEndTimeFormater = (endTime) => {
    const currentTime = dayjs(endTime);
    const formattedEndTime = currentTime.format("h:mm A");
    return formattedEndTime;
  };
  return (
    <>
       <Grid
        item
        key={cardData._id}
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
        <Stack direction="row" spacing={1} sx={{ justifyContent:{
          xs:"center",
          sm:"end",
          md:"end"
        }}}>
          {/* <Chip label="Conference Hall" color="primary" /> */}
          <Chip
            label={`${cardData?.Amenity.amenityName}  ${cardData?.bookingStatus}`}
            color={
              cardData?.bookingStatus === "rejected"
                ? "error"
                : cardData?.bookingStatus === "resolved"
                ? "info"
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
                Bookings Details
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
                primary="Date of Booking"
                secondary={UpdateBookingDate}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booking Generated On"
                secondary={formatteGenerateddate}
              />
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Booking Updated On"
                secondary={UpdateformattedDate}
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
                User Details & Price
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
                primary="Booking Price"
                secondary={cardData.price}
              />
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
      </Grid>
    </>
  );
};
RejectConferenceHall.propTypes = { cardData: [] };

export default RejectConferenceHall;
