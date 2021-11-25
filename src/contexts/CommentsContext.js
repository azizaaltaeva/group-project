import { logRoles } from "@testing-library/dom";
import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

export const commentsContext = createContext();
const API = "http://localhost:8000/comments";

const initialState = {
  comments: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_COMMENTS":
      return { ...state, comments: action.payload };

    default:
      return state;
  }
};

const CommentsContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchComments = async () => {
    try {
      const { data } = await axios(API);
      dispatch({
        type: "GET_COMMENTS",
        payload: data,
      });
      // console.log([data]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addComment = async (newComment) => {
    try {
      await axios.post(API, newComment).then((res) => {
        if (res.status === 201) {
          fetchComments();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteComment = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const values = {
    comments: state.comments,
    fetchComments,
    addComment,
    deleteComment,
  };
  return (
    <commentsContext.Provider value={values}>
      {children}
    </commentsContext.Provider>
  );
};

export default CommentsContext;
