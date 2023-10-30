import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isLoading } from "../../../redux/action/defaultActions";

const RejectRequest = () => {
  const state = useLocation();
  const dispatch = useDispatch();
  const [rejectReq, setRejectReq] = useState();

  const BookingRejectReq = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get(
        "api/v1/admin/get/all/bookings/as/per/status",
        { bookingStatus: "rejected" }
      );
      setRejectReq(response?.data);
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
  return <div>RejectRequest</div>;
};

export default RejectRequest;
