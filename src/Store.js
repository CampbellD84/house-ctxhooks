import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initState = {
  episodes: [],
  favorites: []
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    case "ADD_FAV_EPISODE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAV":
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

export const StoreProvider = props => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
