import React, { useContext } from "react";
import { Store } from "./Store";
import { Link } from "@reach/router";

const App = props => {
  const { state } = useContext(Store);

  return (
    <>
      <header>
        <div>
          <h1>House</h1>
          <p>Pick your favorite episodes</p>
        </div>
        <div>
          <Link to="/">Home</Link>{" "}
          <Link to="/faves">Favorite(s) {state.favorites.length}</Link>
        </div>
      </header>
      {props.children}
    </>
  );
};

export default App;
