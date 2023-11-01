import React,{useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useNavigate } from "react-router-dom";
import BookingRequest from './BookingRequest'
import ConfirmRequested from './ConfirmRequested'
import RejectRequest from './RejectRequest'
import ResolvedRequest from './ResolvedRequest'

const AmmenityRequest = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
 
  return (
    <Container>
     <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color="#9f2936" variant="h4" component="h2">
            Booking Requests
          </Typography>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ cursor: "pointer", "&>hover": { color: "red" } }}
            mb={1}
            onClick={() => navigate(-1)}
          >
            <KeyboardBackspaceIcon />{" "}
            <Typography variant="body2" component={"span"}>
              Back
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Pending" {...a11yProps(0)} />
                <Tab label="Accepted" {...a11yProps(1)} />
                <Tab label="Rejected" {...a11yProps(2)} />
                <Tab label="Past Bookings" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <div
              role="tabpanel"
              hidden={value !== 0}
              id={`simple-tabpanel-${0}`}
              aria-labelledby={`simple-tab-${0}`}
            >
              {value === 0 && (
                <Box sx={{ p: 3 }}>
                  {/* /api/v1/admin/get/all/maintenance/requests */}
                  <BookingRequest
                    title={"Pending Requests"}
                    type={"new"}
                  />
                </Box>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={value !== 1}
              id={`simple-tabpanel-${1}`}
              aria-labelledby={`simple-tab-${1}`}
            >
              {value === 1 && (
                <Box sx={{ p: 3 }}>
                  <ConfirmRequested
                  title={"Confirm Requests"}
                  type={"new"}/>
                </Box>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={value !== 2}
              id={`simple-tabpanel-${2}`}
              aria-labelledby={`simple-tab-${2}`}
            >
              {value === 2 && (
                <Box sx={{ p: 3 }}>
                  <RejectRequest
                  title={"Reject Requests"}
                  type={"new"}/>
                </Box>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={value !== 3}
              id={`simple-tabpanel-${2}`}
              aria-labelledby={`simple-tab-${2}`}
            >
              {value === 3 && (
                <Box sx={{ p: 3 }}>
                  <ResolvedRequest
                  title={"Reject Requests"}
                  type={"new"}/>
                </Box>
              )}
            </div>
          </Box>
        </Stack>
    </Container>
  );
};

export default AmmenityRequest;

