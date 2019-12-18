import React from "react";
import ReactHtmlParser from "react-html-parser";

const EpisodesList = props => {
  const { episodes, toggleFavEpisode, favorites } = props;

  return episodes.map(episode => {
    return (
      <section key={episode.id}>
        <img src={episode.image.medium} alt={`House ${episode.name}`} />
        <div>{episode.name}</div>
        <section>
          <div>
            Season: {episode.season} Number: {episode.number}
          </div>
          <div>{ReactHtmlParser(`${episode.summary}`)}</div>
          <button type="button" onClick={() => toggleFavEpisode(episode)}>
            {favorites.find(fav => fav.id === episode.id)
              ? "Unfavorite"
              : "Favorite"}
          </button>
        </section>
      </section>
    );
  });
};

export default EpisodesList;
