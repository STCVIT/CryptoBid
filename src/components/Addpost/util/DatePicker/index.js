import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import styles from "../../addPost.module.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./style.css";

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
      iconButton: {
        backgroundColor: "#ffffff",
      },
      dayLabel: {
        color: "#ffffff",
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#6D28D9",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#140D4A",
        backgroundColor: "#2D396B",
      },
    },
  },
});

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <>
      <h2>Closing Date</h2>
      {/* <div   className={styles.DatePicker}> */}
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
            onError={(error) => {
              if (error !== currentError) {
                form.setFieldError(field.name, error);
              }
            }}
            onChange={(date) => {
              form.setFieldValue(field.name, date, false);
            }}
            {...other}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
      {/* </div> */}
    </>
  );
};

export default DatePickerField;
