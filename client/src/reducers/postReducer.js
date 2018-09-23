import { ADD_POST, GET_POSTS, POST_LOADING } from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  loading: false
};

// export default (state = initialState, action) => {
export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        // posts: action.payload,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
}
