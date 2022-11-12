import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import { useStateValue } from "./Context/StateProvider";
import { Login, Player } from "./Pages/index";
import { userToken } from "./spotify";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token, selectedPlaylistId }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = userToken();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
      spotify.getUserPlaylists().then((data) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: data,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_INITALPLAYLIST",
          selectedPlaylistId: playlists?.items[0]?.id,
        });
      });
      // spotify.skipToNext() spotify.skipToPrevious()
      // spotify
      //   .getPlaylistTracks("37i9dQZEVXcNzoQFScziaD")
      //   .then((data) => console.log(data));
    }
  }, []);
  return <div>{token ? <Player spotify={spotify} /> : <Login />}</div>;
}

export default App;
