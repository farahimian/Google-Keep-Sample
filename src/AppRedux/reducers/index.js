import { combineReducers } from "redux";

import noteReducer from "./noteReducer";
import listViewReducer from "./listViewReducer";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
  noteReducer,
  listViewReducer,
  sidebarReducer,
});

export default rootReducer;
