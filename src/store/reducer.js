import {
  API_DATA_FETCH,
  API_DATA_FETCH_ERROR,
  API_DATA_FETCH_REQUEST,
  ADD_CREATE_POST_DATA,
  SELECTED_POST_DATA,
  DELETE_SELECTED_POST
} from "./actionType";

const init = {
  data: [],
  loading: false,
  error: false,
  meta:{
    page: 1,
    start: 0,
    limit:10,
    metadata: []
  }
};

export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case API_DATA_FETCH:
      return {
        ...state,
        data: payload,
        loading: false,
        error: false,
      };

    case API_DATA_FETCH_REQUEST:
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
      };

    case API_DATA_FETCH_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      };

    case ADD_CREATE_POST_DATA:
      return {
        ...state,
        data: [...state.data, payload],
        loading: false,
        error: false,
      };

    case SELECTED_POST_DATA:
      // console.log("selectedPost", payload);
      return {
        ...state,
        selected: payload,
        loading: false,
        error: false,
      };

    case DELETE_SELECTED_POST:
      // console.log("deletePayload", payload);

      const newData = state.data.filter((post) => post.id !== payload)
      return {
        ...state,
        data: newData,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};
