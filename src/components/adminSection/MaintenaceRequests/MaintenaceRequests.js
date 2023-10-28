import { Container, Grid, Stack, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import { AssistWalkerOutlined } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading } from "../../../redux/action/defaultActions";
import RequestScheduleMeetModal from "./RequestScheduleMeetModal";
import RequestHolderCard from "./RequestHolderCard";

const MaintenaceRequests = ({ getUrl, type, title }) => {
  const dispatch = useDispatch();

  const [allRequests, setAllRequests] = useState([]);

  const [openScheduleMeetModal, setOpenScheduleMeetModal] = useState(false);

  const [activeRequestData, setActiveRequestData] = useState(null);
  // modal toggler
  const toggleScheduleModal = () =>
    setOpenScheduleMeetModal(!openScheduleMeetModal);
  // handler to open modal
  const handleOpenModal = (data) => {
    setActiveRequestData(data);
    toggleScheduleModal();
  };
  // handler to close modal
  const handleCloseModal = () => {
    setActiveRequestData(null);
    toggleScheduleModal();
  };
  // function to get request data
  const getRequestdData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(getUrl);
      console.log("res==>", res);
      setAllRequests(res?.data?.allRequests);
      dispatch(isLoading(false));
    } catch (error) {
      console.log("error=>", error);
      dispatch(isLoading(false));
    }
  };
  //   ======================================
  useEffect(() => {
    if (getUrl) {
      getRequestdData();
    }
  }, []);

  // ========================================
  return (
    <>
      {/* <Typography color="#9f2936" variant="h4" component="h2">
        {title}
      </Typography> */}
      <Grid
        container
        rowGap={2}
        columnGap={1}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {allRequests?.map((request, index) => {
          return (
            <Grid item key={index} xs={12} sm={5.75} md={5.75}>
              <RequestHolderCard
                cardData={request}
                index={index}
                handleOpenModal={handleOpenModal}
              />
            </Grid>
          );
        })}
      </Grid>
      <RequestScheduleMeetModal
        open={openScheduleMeetModal}
        handleClose={handleCloseModal}
        data={activeRequestData}
      />
    </>
  );
};

export default MaintenaceRequests;
