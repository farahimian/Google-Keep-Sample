import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const NoteTextField = withStyles({
  root: {
    "&.Mui-focused fieldset": {
      backgroundColor: "white",
    },

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        backgroundColor: "white",
      },
      "& fieldset": {
        border: "0px",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 500,
    boxShadow: `1px 3px 5px rgba(0,0,0,0.20)`,
    WebkitBoxShadow: `1px 3px 5px rgba(0,0,0,0.20)`,
    border: "1px solid transparent",
    borderColor: "#d8d9da",
    borderRadius: 8,
  },
  hidden: { display: "none" },
}));

function EditNote({ text, title, id, onTitleChange, onTextChange }) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <NoteTextField
        placeholder="Title"
        style={{ width: "100%" }}
        variant="outlined"
        value={title}
        onChange={onTitleChange}
      />
      <NoteTextField
        placeholder="Take a note..."
        multiline
        style={{ width: "100%" }}
        variant="outlined"
        value={text}
        onChange={onTextChange}
      />
    </Paper>
  );
}

export default connect()(EditNote);
