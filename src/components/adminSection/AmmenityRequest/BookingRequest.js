import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading } from "../../../redux/action/defaultActions";
import AdverTisingBoard from "./AdverTisingBoard";
import ConferenceHall from "./ConferenceHall";

const BookingRequestHome = ({ title }) => {
  const [BookingDetails, setBookingDetails] = useState();
  const [activeRequestData, setActiveRequestData] = useState(null);
  const [openScheduleMeetModal, setOpenScheduleMeetModal] = useState(false);
  const dispatch = useDispatch();
  const toggleScheduleModal = () =>
    setOpenScheduleMeetModal(!openScheduleMeetModal);
  const handleOpenModal = (data) => {
    console.log(data);
    setActiveRequestData(data);
    toggleScheduleModal();
  };
  const handleCloseModal = () => {
    setActiveRequestData(null);
    toggleScheduleModal();
  };
  const bookingRequest = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get("/api/v1/admin/get/all/bookings");
      setBookingDetails(response?.data?.allBookings);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
    }
  };

  useEffect(() => {
    bookingRequest();
  }, []);
  useEffect(() => {
    if (BookingDetails) {
      console.log(BookingDetails);
    }
  }, [BookingDetails]);

  return (
    <>
      <Typography color="#9f2936" variant="h4" component="h2">
        {title}
      </Typography>
      <Grid
        container
        rowGap={2}
        columnGap={1}
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ mt: "20px" }}
      >
        {BookingDetails?.map((request, index) => {
          return request?.Amenity?.amenityName === "Conference Room" ? (
            <ConferenceHall
              cardData={request}
              key={request._id}
              bookingRequest={bookingRequest}
              handleOpenModal={handleOpenModal}
            />
          ) : (
            <AdverTisingBoard
              cardData={request}
              key={index}
              open={openScheduleMeetModal}
              handleClose={handleCloseModal}
              data={activeRequestData}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default BookingRequestHome;
