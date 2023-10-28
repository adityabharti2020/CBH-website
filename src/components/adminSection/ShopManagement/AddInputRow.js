import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../../App.css";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import DeleteShopModal from "./DeleteShopModal";

const AddInputRow = () => {
  const dispatch = useDispatch();
  const [floorValues, setFloorValues] = useState([""]);
  const [selectfloor, setSelectFloor] = useState("select");
  const [floor, setFloor] = useState("select");
  const [inputFields, setInputFields] = useState([
    { shopNo: "", shopArea: "" },
  ]);
  const [shopDetails, setShopDetails] = useState([]);

  const handleAddField = () => {
    setInputFields([...inputFields, {}]);
  };

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index] = {
      ...values[index],
      [event.target.name]: event.target.value,
    };
    setInputFields([...values]);
  };

  // ********************** Handle Submit  Floor Api section  ***********************************

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(isLoading(true));
    console.log("rowww====>", inputFields, selectfloor);
    try {
      const res = await axios.post(
        `/api/v1/building/create/building/floor/shops/${selectfloor}`,
        { shops: [...inputFields] }
      );
      // console.log("create shop", res);
      if (res?.data?.success === true) {
        getFloorData();
        const d = [{ shopNo: "", shopArea: "" }];
        setInputFields([...d]);
        dispatch(openSnackbar("Shop Create Successfully", "success"));
        dispatch(isLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };

  // ********************** GetFloor data Api section  ***********************************
  const getFloorData = async () => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/all/floors`);
      // console.log("createFloor", res?.data?.allFloors);
      setFloorValues(res?.data?.allFloors);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };
  // ********************** GetFloor last dropdown section  ***********************************
  const handleGetShop = async (id) => {
    dispatch(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/building/get/allshop/data/${id}`);
      // console.log("Getshop", res?.data?.floorData);
      setShopDetails([...res?.data?.floorData?.shops]);
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(isLoading(false));
      dispatch(openSnackbar(error.message, "error"));
    }
  };
  useEffect(() => {
    getFloorData();
  }, []);
  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <Stack style={{ margin: "10px" }}>
        {/* <FloorSelectionDropsown /> */}
        <TextField
          label="Select Floor"
          size="small"
          name="floor"
          required
          value={selectfloor}
          select
          sx={{ maxWidth: "150px" }}
          onChange={(e) => setSelectFloor(e.target.value)}
        >
          <MenuItem value={"select"}>--select--</MenuItem>
          {floorValues?.map((data) => {
            return <MenuItem value={`${data?._id}`}>{data?.floor}</MenuItem>;
          })}
        </TextField>
      </Stack>
      {inputFields?.map((inputField, index) => (
        <Box key={index} style={{ margin: "10px" }}>
          <TextField
            className="textfield"
            name="shopNo"
            required
            label="Enter Shop No"
            type="number"
            value={inputField?.shopNo}
            onChange={(event) => handleInputChange(event, index)}
          />
          <TextField
            className="textfield"
            name="shopArea"
            required
            label="Enter Shop Area"
            type="number"
            value={inputField?.shopArea}
            onChange={(event) => handleInputChange(event, index)}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
          />
          <TextField
            className="textfield"
            name="shopType"
            required
            label="Enter Shop Type"
            type="number"
            value={inputField?.shopType}
            onChange={(event) => handleInputChange(event, index)}
          />
        </Box>
      ))}
      <Box>
        <Button
          type="button"
          onClick={handleAddField}
          style={{ margin: "10px", minWidth: "150px" }}
        >
          Add Shop
        </Button>
        <Button
          type="submit"
          // onClick={handleSubmit}
          style={{
            margin: "10px",
            marginLeft: "10rem",
            border: "1px solid #f99594 ",
            minWidth: "150px",
          }}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Grid container>
          <Grid
            item
            flexDirection={"row"}
            style={{ width: "100%", margin: "10px", color: "#9f2936" }}
          >
            <Typography variant="h4">Total Number Of Shops</Typography>
          </Grid>

          <Grid item flexDirection={"row"} display={"flex"}>
            <TextField
              label="Select Floor"
              size="small"
              name="floor"
              required
              value={floor}
              select
              sx={{ width: "150px", marginRight: "1rem", marginTop: "0.5rem" }}
              onChange={(e) => setFloor(e.target.value)}
            >
              <MenuItem value={"select"}>--select--</MenuItem>
              {floorValues?.map((data) => {
                return (
                  <MenuItem
                    value={`${data?._id}`}
                    onClick={() => {
                      handleGetShop(data?._id);
                    }}
                  >
                    {data?.floor}
                  </MenuItem>
                );
              })}
            </TextField>
            <DeleteShopModal
              id={floorValues?._id}
              getFloorData={getFloorData}
              shopDetails={[...shopDetails]}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddInputRow;
