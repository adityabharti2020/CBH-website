import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isLoading } from "../../../redux/action/defaultActions";

const ConfirmRequested = () => {
  const dispatch = useDispatch();
  const state = useLocation();
  //   console.log(state.orderBookingStatus);
  const [confirmReq, setConfirmReq] = useState();

  const BookingConfirmReq = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get(
        "/api/v1/admin/get/all/bookings/as/per/status",
        { bookingStatus: "accepted" }
      );
      setConfirmReq(response?.data);
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
  return <div>ConfirmRequested</div>;
};

export default ConfirmRequested;
