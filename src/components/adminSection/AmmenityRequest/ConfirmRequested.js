import React, { useState, useEffect } from "react";
import {  Grid, Stack, Typography, Chip, Box } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading } from "../../../redux/action/defaultActions";
import AcceptConferenceHall from "./Accept Requests/AcceptConferenceHall";
import AcceptAdverTisingBoard from "./Accept Requests/AcceptAdverTisingBoard";

const ConfirmRequested = () => {
  const dispatch = useDispatch();
  const [activeRequestData, setActiveRequestData] = useState(null);
  const [openScheduleMeetModal, setOpenScheduleMeetModal] = useState(false);
  const [confirmReq, setConfirmReq] = useState();

  const BookingConfirmReq = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get(
        "/api/v1/admin/get/all/bookings/as/per/status?bookingStatus=accepted"
      );
      // console.log(response)
      setConfirmReq(response?.data.bookings);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
    }
  };
  useEffect(() => {
    BookingConfirmReq();
  }, []);
  useEffect(() => {
    if (confirmReq) {
      console.log(confirmReq);
    }
  }, [confirmReq]);
 
  
  return (
    <>
      {/* <Typography color="#9f2936" variant="h4" component="h2">
        Accepted Request
      </Typography> */}
      <Grid
        container
        rowGap={2}
        columnGap={1}
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ mt: "20px" }}
        // bgcolor={"red"}
      >
        {confirmReq?.map((request, index) => {
          return request?.Amenity?.amenityName === "Conference Room" ? (
            <AcceptConferenceHall
              cardData={request}
              key={request._id}
              index={index}
            />
          ) :
            (<AcceptAdverTisingBoard
              cardData={request}
              key={index}
              index={index}
            />
            )
        })}
      </Grid>
    </>
  );
};

export default ConfirmRequested;
