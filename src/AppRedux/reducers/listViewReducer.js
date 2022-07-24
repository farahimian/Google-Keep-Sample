import * as ACTION_TYPES from "../actions/actionTypes";
const initialState = {
  listView: false,
};

const listViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_LIST_VIEW:
      return {
        ...state,
        listView: !state.listView,
      };

    default:
      return state;
  }
};
export default listViewReducer;
