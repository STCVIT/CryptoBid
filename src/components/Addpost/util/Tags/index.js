
import React from 'react'
import {useField } from "formik";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../addPost.module.css";


const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  }));

function Tags(props) {
    const classes = useStyles();
    const [field] = useField(props.id);
    return (
      <div>
        <h2>Tags</h2>
        <div className={(classes.root, styles.ProductForm)}>
          <Autocomplete
            multiple
            id={styles.tagsFilled}
            options={taglist.map((option) => option.title)}
            defaultValue={[taglist[0].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  id={styles.tagsFilled}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                id={styles.TextfieldTag}
                variant="filled"
                placeholder="Tags"
              />
            )}
          />
        </div>
      </div>
    );
  }
  const taglist = [{ title: "Games" }, { title: "NFT" }];

  export default Tags