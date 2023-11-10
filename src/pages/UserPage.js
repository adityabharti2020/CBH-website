import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
// components
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import { IMG_PATH } from "../utils/url";
import { isLoading, openSnackbar } from "../redux/action/defaultActions";
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import UserProfileModal from "./UserProfileModal";
import UserDetailsEditModel from "./UserDetailsEditModel";
import { DropDown } from "./DropDown";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "Shop", label: "Shop No", alignRight: false },
  { id: "contact", label: "Contact Number", alignRight: false },
  { id: "username", label: "username", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [allUsers, setallUsers] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [activeData, setActiveData] = useState(null);
  const [userId, setuserId] = useState(null);
  const [editActiveData, setEditActiveData] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [OpenUserEditModal, setOpenUserEditModal] = useState(false);
  const [updatedata, setUpdatedData] = useState({
    contactNo: "",
    email: "",
    shops: [],
  });

  // console.log(updatedata);
  const toggleProfileModal = () => setOpenProfileModal(!openProfileModal);
  // console.log(openProfileModal);

  const handleOpenMenu = (event, data) => {
    setuserId(data._id);
    setEditActiveData(data);

    setOpen(event.currentTarget);
  };
  // console.log(activeId)
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const getAllusers = async () => {
    dispatch(isLoading(true));
    try {
      const response = await axios.get("/api/v1/admin/get/all/users");
      console.log("response=>", response);
      setallUsers(response?.data?.allUsers);
      dispatch(isLoading(false));
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };

  useEffect(() => {
    getAllusers();
  }, []);
  const openProfileModalHandler = (data) => {
    setActiveData(data);
    toggleProfileModal();
    // console.log(data)
  };
  const profileCloseHandlerModal = () => {
    setActiveData(null);
    toggleProfileModal();
  };
  const toggleUserEditModal = () => setOpenUserEditModal(!OpenUserEditModal);

  const handleOpenUserEditModal = () => {
    // console.log(data)

    toggleUserEditModal();
  };
  const handleCloseUserEditModal = () => {
    setEditActiveData(null);
    setOpen(null);

    toggleUserEditModal();
  };
  const UserUpdateHandler = async () => {
    dispatch(isLoading(true));
    // console.log("update api =>", updatedata);
    try {
      const response = await axios.put(
        `/api/v1/admin/update/user/and/shops/alloted/${userId}`,
        {
          contactNo: updatedata.contactNo,
          email: updatedata.email,
          shopsAlloted: updatedata.shops,
        }
      );
      console.log(response);
      console.log(updatedata);
      if (response?.statusText === "OK") {
        getAllusers();
      }
      handleCloseUserEditModal();
      dispatch(openSnackbar("updated", "success"));
      dispatch(isLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(openSnackbar("something went wrong", "error"));
      dispatch(isLoading(false));
    }
  };
  return (
    <>
      <Helmet>
        <title> User | Society Management </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate("/dashboard/user/createUser")}
          >
            Add User
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {allUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        gender,
                        profilePicture,
                        shopsAlloted,
                        userName,
                        contactNo,
                      } = row;
                      const selectedUser = selected.indexOf(firstName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={index}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) =>
                                handleClick(event, firstName)
                              }
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                              sx={{ cursor: "pointer" }}
                              onClick={() => openProfileModalHandler(row._id)}
                            >
                              <Avatar
                                alt={firstName}
                                src={`${IMG_PATH}${profilePicture?.url}`}
                              />
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{ cursor: "pointer" }}
                              >
                                {`${firstName} ${lastName}`}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <TableCell align="left">
                              <DropDown shopsAlloted={shopsAlloted} />
                            </TableCell>
                          </Box>

                          <TableCell align="left">{contactNo}</TableCell>

                          <TableCell align="left">{userName}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => handleOpenMenu(event, row)}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          {/* 
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        // PaperProps={{
        //   sx: {
        //     p: 1,
        //     width: 140,
        //     "& .MuiMenuItem-root": {
        //       px: 1,
        //       typography: "body2",
        //       borderRadius: 0.75,
        //     },
        //   },
        // }}
      >
        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleOpenUserEditModal}
        >
          <Iconify icon={"mingcute:edit-line"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          // onClick={handleOpenUserEditModal}
        >
          {<RemoveCircleOutlineIcon sx={{ mr: 1 }} />}Remove Shops
        </MenuItem>
      </Popover>
      <UserProfileModal
        open={openProfileModal}
        data={activeData}
        handleClose={profileCloseHandlerModal}
      />
      <UserDetailsEditModel
        data={editActiveData}
        userId={userId}
        getAllusers={getAllusers}
        open={OpenUserEditModal}
        handleClose={handleCloseUserEditModal}
        updatedata={updatedata}
        setUpdatedData={setUpdatedData}
        handleAction={UserUpdateHandler}
      />
    </>
  );
}
