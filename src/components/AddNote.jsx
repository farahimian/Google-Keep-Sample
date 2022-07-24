import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ADD_NOTE } from "../AppRedux/actions";

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
  AddNoteContainer: {
    padding: theme.spacing(4),
  },
  paper: {
    boxShadow: `1px 3px 5px rgba(0,0,0,0.20)`,
    WebkitBoxShadow: `1px 3px 5px rgba(0,0,0,0.20)`,
    width: "100%",
    border: "1px solid transparent",
    borderColor: "#d8d9da",
    borderRadius: 8,
  },
  hidden: { display: "none" },
}));

function AddNote({ dispatch }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  return (
    <Grid
      className={classes.AddNoteContainer}
      container
      xs={12}
      justify="center"
    >
      <Grid container xs={12} justify="center">
        <Grid item xs={6} justify="center">
          <Paper elevation={3} className={classes.paper}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                title !== "" || text !== ""
                  ? dispatch(ADD_NOTE(title, text))
                  : console.log("empty");

                setTitle("");
                setText("");
              }}
            >
              <NoteTextField
                className={open ? "" : classes.hidden}
                placeholder="Title"
                style={{ width: "100%" }}
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <NoteTextField
                onClick={() => setOpen(true)}
                placeholder="Take a note..."
                multiline
                style={{ width: "100%" }}
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Grid
                item
                xs={12}
                style={{ textAlign: "right", fontWeight: "bold" }}
              >
                <Button
                  type="submit"
                  className={open ? "" : classes.hidden}
                  onClick={() => setOpen(false)}
                  style={{ margin: "5px 25px 5px 0px" }}
                >
                  {"Save"}
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default connect()(AddNote);
