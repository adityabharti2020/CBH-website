import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";


const AmmenityRequest = () => {
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
      <Stack>
        <Grid container spacing={3}>
          <Grid item style={{ marginTop: "0.8rem", color: "#9f2936" }}>
            <Typography variant="h4" component="h2">
              Booking Requests
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Booking Requests" {...a11yProps(0)} />
              {/* <Tab label="Create Ammenity Slot" {...a11yProps(1)} /> */}
            </Tabs>
          </Box>
          <div
            role="tabpanel"
            hidden={value !== 0}
            id={`simple-tabpanel-0`}
            aria-labelledby={`simple-tab-0`}
          >
            {value === 0 && (
              <Box sx={{ p: 3 }}>
                AmmenityRequest
              </Box>
            )}
          </div>
          {/* <div
            role="tabpanel"
            hidden={value !== 1}
            id={`simple-tabpanel-1`}
            aria-labelledby={`simple-tab-1`}
          >
            {value === 1 && (
              <Box sx={{ p: 3 }}>
                <AddAmmenitySlots />
              </Box>
            )}
          </div> */}
        </Box>
      </Stack>
    </Container>
  );
};

export default AmmenityRequest;

