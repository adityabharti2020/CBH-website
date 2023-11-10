import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading } from "../../../redux/action/defaultActions";
import ResolveConferenceHall from "./Resolve Request/ResolveConferenceHall";
import ResolveAdverTisingBoard from './Resolve Request/ResolveAdverTisingBoard'

const ResolvedRequest = () => {
  const dispatch = useDispatch();

  const [resolve, setResolve] = useState();

  const resolveRequest = async () => {
    dispatch(isLoading(true));

    try {
      const response = await axios.get("/api/v1/admin/get/all/past/bookings");
      console.log(response);
      setResolve(response?.data.bookings);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
    }
  };
  useEffect(() => {
    resolveRequest();
  }, []);
  useEffect(() => {
    if (resolve) {
      //  console.log(resolve)
    }
  }, [resolve]);
  return (
    <>
      {/* <Typography color="#9f2936" variant="h4" component="h2">
        Past Bookings
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
        {resolve?.map((request, index) => {
          return request?.Amenity?.amenityName === "Conference Room" ? (
            <ResolveConferenceHall
              cardData={request}
              key={request._id}
              index={index}
            />
          ) :
            (<ResolveAdverTisingBoard
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

export default ResolvedRequest;
