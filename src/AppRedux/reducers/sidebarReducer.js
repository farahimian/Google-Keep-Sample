import * as ACTION_TYPES from "../actions/actionTypes";
const initialState = {
  openSidebar: true,
  drawerWidth: 180,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        openSidebar: !state.openSidebar,
        drawerWidth: state.drawerWidth === 180 ? 60 : 180,
      };

    default:
      return state;
  }
};
export default sidebarReducer;
