import React from "react";
import PropTypes from "prop-types";
import Note from "./Note";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function mapStateToProps(state) {
  return {
    filteredNotes: state.noteReducer.filteredNotes,
    notes: state.noteReducer.notes,
    bin: state.noteReducer.bin,
    allTags: state.noteReducer.allTags,
    listView: state.listViewReducer.listView,
  };
}
const useStyles = makeStyles((theme) => ({
  NoteContainer: {
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    width: "100%",
    border: "1px solid #d8d9da",

    borderRadius: 8,
  },
  title: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  text: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  list: {
    display: "contents",
  },
}));
function NoteList({ notes, bin, listView, filteredNotes }) {
  const classes = useStyles();

  return (
    <Grid className={classes.NoteContainer} container xs={12} justify="center">
      <Grid item xs={12}>
        <Grid container xs={12} spacing={3}>
          <List className={classes.list} style={{ width: "100%" }}>
            {filteredNotes.map((note) => (
              <Grid item xs={listView ? 12 : 4}>
                <ListItem style={{ width: "100%" }}>
                  <Note className={classes.note} key={note.id} {...note} />
                </ListItem>
              </Grid>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}
NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default connect(mapStateToProps)(NoteList);
