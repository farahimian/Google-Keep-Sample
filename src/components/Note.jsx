import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RemoveIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TagIcon from "@material-ui/icons/Label";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { REMOVE_NOTE } from "../AppRedux/actions";
import { EDIT_NOTE } from "../AppRedux/actions";
import Dialog from "@material-ui/core/Dialog";
import EditNote from "./EditNote";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { ADD_TAG } from "../AppRedux/actions";
import { Button } from "@material-ui/core";

const NoteTextField = withStyles({
  root: {
    "&.Mui-focused fieldset": {
      backgroundColor: "white",
    },

    "& .MuiOutlinedInput-root": {
      width: 105,

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
  NoteContainer: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    "&:hover": {
      boxShadow: `2px 4px 6px rgba(0,0,0,0.20)`,
      WebkitBoxShadow: `2px 4px 6px rgba(0,0,0,0.20)`,
    },
    width: "100%",
    border: "1px solid #d8d9da",
    minHeight: "120px !important",
    borderRadius: 8,
  },
  title: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    fontWeight: "bold",
    minHeight: 21,
  },
  tagContainer: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    minHeight: 21,
  },
  text: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    minHeight: 21,
  },

  logoSmall: {
    "&:hover": {
      backgroundColor: " rgba(60,64,67,0.1)",
    },
    cursor: "pointer",
    fontSize: 15,
    borderRadius: "50%",
    padding: theme.spacing(0.7),
    marginLeft: theme.spacing(1.5),
    color: "#5f6368",
  },

  addLogo: {
    "&:hover": {
      backgroundColor: " rgba(60,64,67,0.1)",
    },
    cursor: "pointer",
    fontSize: 18,
    borderRadius: "50%",
    padding: theme.spacing(0.7),
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(1.5),
    color: "#5f6368",
  },
  actions: {
    display: "inline",
  },
  tag: {
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0.5),
    margin: theme.spacing(0.3),

    borderRadius: "50%",
    backgroundColor: "#ebebeb",
    fontSize: 12,
    textTransform: "none",
  },
}));

function Note({ text, title, id, dispatch, tags, allTags }) {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = useState(false);
  const [saveTag, setsaveTag] = useState(true);
  const [titleEdit, setTitleEdit] = useState(title);
  const [textEdit, setTextEdit] = useState(text);
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const addTag = Boolean(anchorEl);
  const idd = addTag ? "simple-popover" : undefined;
  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid xs={12} item className={classes.title}>
        {title}
      </Grid>
      <Grid xs={12} item className={classes.text}>
        {text}
      </Grid>
      <Grid xs={12} item className={classes.tagContainer}>
        {tags.map((tag) => {
          return (
            <Button size="small" className={classes.tag}>
              #{tag}
            </Button>
          );
        })}
      </Grid>
      <Grid xs={6} item>
        <Tooltip title="Edit Note">
          <EditIcon
            className={classes.logoSmall}
            onClick={() => {
              setOpenEdit(true);
            }}
          />
        </Tooltip>

        <Tooltip title="Add Tag">
          <TagIcon className={classes.logoSmall} onClick={handleClick} />
        </Tooltip>
        <Popover
          id={idd}
          open={addTag}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <NoteTextField
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <AddIcon
            onClick={() => {
              saveTag
                ? dispatch(ADD_TAG(id, name))
                : console.log("already exists");

              setName("");
              handleClose();
            }}
            className={classes.addLogo}
          />
        </Popover>
        <Tooltip title="Remove Note">
          <RemoveIcon
            onClick={() => {
              dispatch(REMOVE_NOTE(id));
            }}
            className={classes.logoSmall}
          />
        </Tooltip>
      </Grid>
      <Dialog
        container={() => document.getElementById("parentCo")}
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          dispatch(EDIT_NOTE(id, titleEdit, textEdit));
        }}
      >
        <EditNote
          id={id}
          title={titleEdit}
          text={textEdit}
          onTitleChange={(e) => setTitleEdit(e.target.value)}
          onTextChange={(e) => setTextEdit(e.target.value)}
        />
      </Dialog>
    </Paper>
  );
}

Note.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  allTags: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default connect()(Note);
