import React, { useState, useEffect } from "react";
import { Grid, Typography, Chip, Box } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading } from "../../../redux/action/defaultActions";
import RejectAdvertisingBoard from "./Reject Request/RejectAdvertisingBoard";
import RejectConferenceHall from "./Reject Request/RejectConferenceHall";

const RejectRequest = () => {
  const dispatch = useDispatch();
  const [rejectReq, setRejectReq] = useState();

  const BookingRejectReq = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get(
        "/api/v1/admin/get/all/bookings/as/per/status?bookingStatus=rejected"
      );
      setRejectReq(response?.data.bookings);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
    }
  };
  useEffect(() => {
    BookingRejectReq();
  }, []);
  useEffect(() => {
    if (rejectReq) {
      console.log(rejectReq);
    }
  }, [rejectReq]);
  return (
    <>
      <Typography color="#9f2936" variant="h4" component="h2">
        Rejected Request
      </Typography>
      <Grid
        container
        rowGap={2}
        columnGap={1}
        display={"flex"}
        sx={{ mt: "20px" }}
      >
        {rejectReq?.map((request, index) => {
          return request?.Amenity?.amenityName === "Conference Room" ? (
            <RejectConferenceHall cardData={request} key={request._id} />
          ) : (
            <RejectAdvertisingBoard cardData={request} key={index} />
          );
        })}
      </Grid>
    </>
  );
};

export default RejectRequest;
