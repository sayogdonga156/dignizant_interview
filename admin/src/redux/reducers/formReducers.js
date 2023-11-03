const initialState = {
  forms: [],
  loading: false,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FORMS":
      return {
        ...state,
        forms: [...state.forms, action.payload],
      };
    case "GET_FORMS":
      return {
        ...state,
        forms: action.payload,
      };
    case "DELETE_FORM":
      return {
        ...state,
        forms: state.forms.filter((e) => e._id !== action.payload),
      };
    case "UPDATE_FORM":
      return {
        ...state,
        forms: state.forms.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };
    default:
      return state;
  }
};

export default formReducer;
