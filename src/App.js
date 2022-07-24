import React from "react";
import "./App.css";
import Header from "./components/Header";
import AddNote from "./components/AddNote";
import NoteList from "./components/NoteList";
import SideBar from "./components/Sidebar";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    drawerWidth: state.sidebarReducer.drawerWidth,
  };
}

function App({ drawerWidth }) {
  return (
    <div style={{ padding: "1px !important" }}>
      <Header />
      <Grid container xs={12}>
        <Grid item style={{ width: drawerWidth }}>
          <SideBar />
        </Grid>
        <Grid item style={{ width: `calc(100% - ${drawerWidth}px)` }}>
          <AddNote />

          <NoteList />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps)(App);
