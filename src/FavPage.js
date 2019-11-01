import React, { lazy, Suspense, useContext } from "react";
import { Store } from "./Store";

const EpisodesList = lazy(() => import("./EpisodesList"));

const FavPage = () => {
  const { state, dispatch } = useContext(Store);

  const toggleFavEpisode = episode => {
    const episodeInFavArr = state.favorites.includes(episode);
    let dispatchObj = { type: "ADD_FAV_EPISODE", payload: episode };
    if (episodeInFavArr) {
      const favWithoutEpisode = state.favorites.filter(
        fav => fav.id !== episode.id
      );
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favWithoutEpisode
      };
    }
    return dispatch(dispatchObj);
  };

  const props = {
    episodes: state.favorites,
    toggleFavEpisode,
    favorites: state.favorites
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <EpisodesList {...props} />
      </div>
    </Suspense>
  );
};

export default FavPage;
