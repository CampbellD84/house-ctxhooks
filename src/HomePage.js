import React, { lazy, useContext, useEffect, Suspense } from "react";
import { Store } from "./Store";
import { houseEpisodesAPI as HouseAPI } from "./API";

const EpisodesList = lazy(() => import("./EpisodesList"));

const HomePage = () => {
  const { state, dispatch } = useContext(Store);

  const fetchShowData = async () => {
    const data = await fetch(HouseAPI);
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes
    });
  };

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

  useEffect(() => {
    state.episodes.length === 0 && fetchShowData();
  });

  const props = {
    episodes: state.episodes,
    toggleFavEpisode,
    favorites: state.favorites
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <EpisodesList {...props} />
        </section>
      </Suspense>
    </>
  );
};

export default HomePage;
