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
import './style.css';

const materialTheme = createMuiTheme({
  overrides: {
    MuiPaperRoot: { 
      backgroundColor: "#2D396B",
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#2D396B",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "#2D396FB",
        color: "#ffffff",
      },
      iconButton : {
       backgroundColor: "#ffffff",
      },
      dayLabel: {
        color: "#ffffff"
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#6D28D9",
      }
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#140D4A",
        backgroundColor: "#2D396B"
      },
    },
  },
});
 
const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <>
    <h2>Closing Time</h2>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme} >
    <KeyboardDatePicker
      clearable
      className={styles.DatePicker}
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
    </>
  );
};


export default DatePickerField
