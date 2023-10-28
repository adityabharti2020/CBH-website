// import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
// import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';

// const AddSlotsInput = () => {
// const [inputFields, setInputFields] = useState([
//     { date: null, startTime: null, endTime: null },
// ]);
//   const [floorData, setFloorData] = useState();

// const handleAddField = () => {
//     setInputFields([...inputFields, { date: null, startTime: null, endTime: null }]);
// };

//   const handleInputChange = (event, index) => {
//     const values = [...inputFields];
//     values[index] = {
//       ...values[index],
//       [event.target.name]: event.target.value,
//     };
//     setInputFields([...values]);
//   };
// const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

// const handleDateChange = (date) => {
//     setSelectedDate(date);
// };
// return (
// <Box>
//     {inputFields?.map((inputField, index) => (
//         <Box key={index} style={{ margin: "10px" }}>
//             <TextField
//                 name="date"
//                 required
//                 type="date"
//                 label="Enter Date"
//                 value={inputField?.date}
//             //   onChange={(event) => handleInputChange(event, index)}
//             />
//             <TextField
//                 sx={{ marginLeft: "1rem" }}
//                 className="textfield"
//                 name="startTime"
//                 required
//                 type="date"
//                 label="Enter Start Time"
//                 value={inputField?.startTime}
//             //   onChange={(event) => handleInputChange(event, index)}
//             />
//             <TextField
//                 sx={{ marginLeft: "1rem" }}
//                 className="textfield"
//                 name="endTime"
//                 required
//                 type="date"
//                 label="Enter End Date"
//                 value={inputField?.date}
//             //   onChange={(event) => handleInputChange(event, index)}
//             />
//             {/* <Button onClick={() => deleteInput(id)}>Delete</Button> */}
//         </Box>
//     ))}

//     {/* ============================ */}
//     {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer
//             components={['MultiInputTimeRangeField', 'SingleInputTimeRangeField']}
//         >
//             <MultiInputTimeRangeField
//                 slotProps={{
//                     textField: ({ position }) => ({
//                         label: position === 'start' ? 'From' : 'To',
//                     }),
//                 }}
//             />

//         </DemoContainer>
//     </LocalizationProvider> */}
//     <Button type="button" onClick={handleAddField} style={{ margin: "10px" }}>
//         Add Input Field
//     </Button>
//     <Button
//         type="submit"
//         // onClick={handleSubmit}
//         style={{ margin: "10px", border: "1px solid blue" }}
//     >
//         Submit
//     </Button>
//     <Box>
//         <Grid container>
//             <Grid
//                 item
//                 flexDirection={"row"}
//                 style={{ width: "100%", margin: "10px", color: "#9f2936" }}
//             >
//                 <Typography variant="h4">All Slots</Typography>
//             </Grid>
//             {/* {floorData?.map((data, index) => {
//                 return (
//                     <Grid item key={index} flexDirection={"row"}>
//                         <TextField
//                             disabled
//                             label="Floor No "
//                             value={data?.floor}
//                             style={{
//                                 margin: "10px",
//                                 maxWidth: "70px",
//                                 cursor: "pointer",
//                             }}
//                         />
//                         <DeleteModal id={data?._id} getFloorData={getFloorData} />
//                     </Grid>
//                 );
//             })} */}
//         </Grid>
//     </Box>
// </Box>
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//   <Grid container justifyContent="space-around">
//     <KeyboardDatePicker
//       disableToolbar
//       variant="inline"
//       format="MM/dd/yyyy"
//       margin="normal"
//       id="date-picker-inline"
//       label="Date picker inline"
//       value={selectedDate}
//       onChange={handleDateChange}
//       KeyboardButtonProps={{
//         'aria-label': 'change date',
//       }}
//     />
//     <KeyboardDatePicker
//       margin="normal"
//       id="date-picker-dialog"
//       label="Date picker dialog"
//       format="MM/dd/yyyy"
//       value={selectedDate}
//       onChange={handleDateChange}
//       KeyboardButtonProps={{
//         'aria-label': 'change date',
//       }}
//     />
//     <KeyboardTimePicker
//       margin="normal"
//       id="time-picker"
//       label="Time picker"
//       value={selectedDate}
//       onChange={handleDateChange}
//       KeyboardButtonProps={{
//         'aria-label': 'change time',
//       }}
//     />
//   </Grid>
// </MuiPickersUtilsProvider>
//     )
// }

// export default AddSlotsInput
import * as React from 'react';
import Link, { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

function ProLabel({ children }) {
    return (
        <Stack direction="row" spacing={0.5} component="span">
            {/* <Tooltip title="Included in Pro package">
        <Link href="/x/introduction/licensing/#pro-plan">
          <span className="plan-pro" />
        </Link>
      </Tooltip> */}
            <span>{children}</span>
        </Stack>
    );
}

export default function ComponentFamilies() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DateField',
                    'TimeField',
                    'DateTimeField',
                    'MultiInputDateRangeField',
                    'MultiInputTimeRangeField',
                    'MultiInputDateTimeRangeField',
                ]}
            >
                <DemoItem label="Date">
                    <DateField defaultValue={dayjs('2022-04-17')} />
                </DemoItem>
                <DemoItem label="Desktop variant">
                    <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
                </DemoItem>
                <DemoItem
                    label={<ProLabel>Time Range</ProLabel>}
                    component="MultiInputTimeRangeField"
                >
                    <MultiInputTimeRangeField
                        defaultValue={[dayjs('2022-04-17T15:30'), dayjs('2022-04-17T18:30')]}
                    />
                </DemoItem>

            </DemoContainer>
        </LocalizationProvider>
    );
}