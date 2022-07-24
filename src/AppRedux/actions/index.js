import * as ACTION_TYPES from "./actionTypes";
let nextNoteId = 3;

export const ADD_NOTE = (title, text, tags) => ({
  type: ACTION_TYPES.ADD_NOTE,
  id: nextNoteId++,
  text,
  title,
  tags,
});

export const EDIT_NOTE = (id, title, text) => ({
  type: ACTION_TYPES.EDIT_NOTE,
  id,
  text,
  title,
});

export const REMOVE_NOTE = (id) => ({
  type: ACTION_TYPES.REMOVE_NOTE,
  id,
});

export const TOGGLE_LIST_VIEW = {
  type: ACTION_TYPES.TOGGLE_LIST_VIEW,
};
export const ADD_TAG = (id, name) => ({
  type: ACTION_TYPES.ADD_TAG,
  name,
  id,
});
export const FILTER_NOTE = (input) => ({
  type: ACTION_TYPES.FILTER_NOTE,
  input,
});
export const FILTER_TAG = (input) => ({
  type: ACTION_TYPES.FILTER_TAG,
  input,
});
export const TOGGLE_SIDEBAR = {
  type: ACTION_TYPES.TOGGLE_SIDEBAR,
};
export const SHOW_BIN = {
  type: ACTION_TYPES.SHOW_BIN,
};
