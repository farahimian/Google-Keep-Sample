import React from "react";
import Drawer from "@material-ui/core/Drawer";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import BinIcon from "@material-ui/icons/Delete";
import TagIcon from "@material-ui/icons/Label";
import { connect } from "react-redux";
import * as ACTIONS from "../AppRedux/actions";
import clsx from "clsx";
import List from "@material-ui/core/List";
import NoteIcon from "@material-ui/icons/Note";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function mapStateToProps(state) {
  return {
    openSidebar: state.sidebarReducer.openSidebar,
    allTags: state.noteReducer.allTags,
  };
}
function mapPropsToState(dispatch) {
  return {
    filter_note: (input) => dispatch(ACTIONS.FILTER_NOTE(input)),
    filter_tag: (input) => dispatch(ACTIONS.FILTER_TAG(input)),
    show_bin: () => dispatch(ACTIONS.SHOW_BIN),
  };
}

const useStyles = makeStyles((theme, drawerWidth) => ({
  root: {
    display: "flex",
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: 180,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function Sidebar({ openSidebar, filter_tag, allTags, filter_note, show_bin }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openSidebar,
        [classes.drawerClose]: !openSidebar,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openSidebar,
          [classes.drawerClose]: !openSidebar,
        }),
      }}
    >
      <List>
        <ListItem onClick={() => filter_note("")} button>
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary={"Notes"} />
        </ListItem>
        {allTags.map((text, index) => (
          <ListItem button key={text} onClick={() => filter_tag(text)}>
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem onClick={() => show_bin()} button>
          <ListItemIcon>
            <BinIcon />
          </ListItemIcon>
          <ListItemText primary={"Bin"} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default connect(mapStateToProps, mapPropsToState)(Sidebar);
