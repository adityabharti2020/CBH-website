import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";
import { useNavigate } from "react-router-dom";
import MaintenaceRequests from "./MaintenaceRequests";

const MaintenanceRequestHome = () => {
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
    <>
      <Container>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color="#9f2936" variant="h4" component="h2">
            Maintenace Requests
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
              >
                <Tab label="New Requests" {...a11yProps(0)} />
                <Tab label="Resolved" {...a11yProps(1)} />
                <Tab label="Completed" {...a11yProps(2)} />
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
                  <MaintenaceRequests
                    title={"New Requests"}
                    type={"new"}
                    getUrl={"/api/v1/admin/get/all/maintenance/requests"}
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
                  <Typography>2</Typography>
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
                  <Typography>3</Typography>
                </Box>
              )}
            </div>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default MaintenanceRequestHome;
