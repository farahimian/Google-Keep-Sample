import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import GoogleKeepLogo from "../assets/logos/google_keep_logo.png";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import ListViewIcon from "@material-ui/icons/ViewList";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import * as ACTIONS from "../AppRedux/actions";

function mapStateToProps(state) {
  return {
    listview: state.listViewReducer.listview,
  };
}
function mapPropsToState(dispatch) {
  return {
    toggle_list_view: () => dispatch(ACTIONS.TOGGLE_LIST_VIEW),
    toggle_sidebar: () => dispatch(ACTIONS.TOGGLE_SIDEBAR),
    filter_note: (input) => dispatch(ACTIONS.FILTER_NOTE(input)),
  };
}
const SearchField = withStyles({
  root: {
    marginTop: 4,
    backgroundColor: " rgba(60,64,67,0.1)",
    borderRadius: 8,
    "&.Mui-focused fieldset": {
      borderColor: "green",
      backgroundColor: "white",
    },

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        backgroundColor: "white",
        boxShadow: `1px 2px 3px rgba(0,0,0,0.20)`,
        WebkitBoxShadow: `1px 2px 3px rgba(0,0,0,0.20)`,
        border: "1px solid transparent",
        borderColor: "#f1f3f4",
      },
      "& fieldset": {
        border: "0px",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    flexGrow: 1,
    padding: theme.spacing(1),

    borderBottom: "1px solid #dadce0",
  },
  logoContainer: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  logo: {
    "&:hover": {
      backgroundColor: " rgba(60,64,67,0.1)",
    },
    cursor: "pointer",
    borderRadius: "50%",
    padding: theme.spacing(1),
    color: "#5f6368",
  },

  logoSmall: {
    "&:hover": {
      backgroundColor: " rgba(60,64,67,0.1)",
    },
    cursor: "pointer",
    borderRadius: "50%",
    padding: theme.spacing(0.3),
    color: "#5f6368",
  },
}));
function Header({ filter_note, toggle_list_view, listview, toggle_sidebar }) {
  const classes = useStyles();

  return (
    <Grid className={classes.headerContainer} container xs={12}>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          <Tooltip title="Main Menu">
            <MenuIcon onClick={toggle_sidebar} />
          </Tooltip>
        </div>
      </div>
      <img
        src={GoogleKeepLogo}
        alt={"google keep logo"}
        style={{ height: 44 }}
      />
      <span style={{ color: "#5f6368", opacity: 1, fontSize: 22, margin: 5 }}>
        Keep
        {listview}
      </span>
      <Grid item xs={1}></Grid>
      <Grid item xs={6}>
        <SearchField
          onChange={(e) => filter_note(e.target.value)}
          placeholder="Search"
          size={"small"}
          style={{ width: "100%" }}
          className={classes.margin}
          id="input-with-icon-textfield"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <div className={classes.logoSmall}>
                  <Tooltip title="Search">
                    <SearchIcon />
                  </Tooltip>
                </div>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={2}></Grid>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          <Tooltip title="Refresh">
            <RefreshIcon />
          </Tooltip>
        </div>
      </div>
      <div className={classes.logoContainer}>
        <div onClick={toggle_list_view} className={classes.logo}>
          <Tooltip title="List View">
            <ListViewIcon />
          </Tooltip>
        </div>
      </div>
      <div className={classes.logoContainer}>
        <div className={classes.logo}>
          <Tooltip title="Settings">
            <SettingsIcon />
          </Tooltip>
        </div>
      </div>
    </Grid>
  );
}

export default connect(mapStateToProps, mapPropsToState)(Header);
