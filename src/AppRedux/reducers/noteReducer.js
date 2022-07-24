import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  notes: [
    { title: "note1", text: "some text", id: "0", tags: ["tag1"] },
    { title: "note2", text: "some text ", id: "1", tags: [] },
  ],
  filteredNotes: [
    { title: "note1", text: "some text", id: "0", tags: ["tag1"] },
    { title: "note2", text: "some text ", id: "1", tags: [] },
  ],
  bin: [{ title: "deleted note", text: "some text", id: "2", tags: [] }],
  allTags: ["tag1"],
  hideActions: false,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: action.id,
            text: action.text,
            title: action.title,
            tags: [],
          },
        ],
        filteredNotes: [
          ...state.filteredNotes,
          {
            id: action.id,
            text: action.text,
            title: action.title,
            tags: [],
          },
        ],
        bin: state.bin,
      };
    case ACTION_TYPES.EDIT_NOTE:
      return {
        notes: state.notes.map((note) =>
          note.id === action.id
            ? { ...note, text: action.text, title: action.title }
            : note
        ),
        filteredNotes: state.filteredNotes.map((note) =>
          note.id === action.id
            ? { ...note, text: action.text, title: action.title }
            : note
        ),
        allTags: state.allTags,
        bin: state.bin,
      };
    case ACTION_TYPES.REMOVE_NOTE:
      return {
        notes: state.notes.filter((note) => note.id !== action.id),
        filteredNotes: state.filteredNotes.filter(
          (note) => note.id !== action.id
        ),
        bin: [
          ...state.bin,
          ...state.notes.filter((note) => note.id === action.id),
        ],
        allTags: state.allTags,
      };
    case ACTION_TYPES.ADD_TAG:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.id
            ? { ...note, tags: note.tags.concat(action.name) }
            : note
        ),
        filteredNotes: state.filteredNotes.map((note) =>
          note.id === action.id
            ? { ...note, tags: note.tags.concat(action.name) }
            : note
        ),
        allTags: state.allTags.includes(action.name)
          ? state.allTags
          : state.allTags.concat(action.name),
        bin: state.bin,
      };

    case ACTION_TYPES.FILTER_NOTE:
      return {
        ...state,
        filteredNotes: state.notes.filter(
          (note) =>
            note.title.includes(action.input) ||
            note.text.includes(action.input) ||
            note.tags.includes(action.input)
        ),
      };
    case ACTION_TYPES.FILTER_TAG:
      return {
        ...state,
        filteredNotes: state.notes.filter((note) =>
          note.tags.includes(action.input)
        ),
      };
    case ACTION_TYPES.SHOW_BIN:
      return {
        ...state,
        filteredNotes: state.bin,
      };
    default:
      return state;
  }
};

export default noteReducer;
