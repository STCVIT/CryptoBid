import React from 'react'
import { ErrorMessage, Formik, useField , useFormikContext} from "formik";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import styles from "../../addPost.module.css";
import lightBlue from "@material-ui/core/colors/lightBlue";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightBlue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: lightBlue.A200,
        color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: lightBlue["400"],
      },
      dayDisabled: {
        color: lightBlue["100"],
      },
      current: {
        color: lightBlue["900"],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue["400"],
      },
    },
  },
});




// function DatePicker(props) {
//     const [field] = useField(props.id);
//     console.log(field)
//     var { Newdate } = useFormikContext();
//     const [selectedDate, setSelectedDate] = React.useState(new Date());
//     const handleDateChange = (date) => {
//       setSelectedDate(date);
//     };
//     console.log(selectedDate)
//     return (
//       <div className={styles.ProductForm}>
         
//          <MuiPickersUtilsProvider utils={DateFnsUtils}>
//          <ThemeProvider theme={materialTheme}>
//          <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           {...field}
//           format="yyyy/MM/dd"
//           margin="normal"
//           id={"date-picker-inline " + styles.datetimeLocal}
//           label="Date picker inline"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//         </ThemeProvider>
//  </MuiPickersUtilsProvider>
// {/*       
//         <TextField
//           {...field}
//           id={styles.datetimeLocal}
//           label={props.label}
//           type="date"
//           InputLabelProps={{
//             shrink: true,
//           }}
//         /> */}
//         <ErrorMessage name={props.id} />
//       </div>
//     );
//   }



    
const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
    <KeyboardDatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      id={styles.datetimeLocal}
      error={Boolean(currentError)}
      onError={error => {
        // handle as a side effect
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={date => {console.log(date);   form.setFieldValue(field.name, date, false)}  }
      {...other}
    />
    </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};


export default DatePickerField
