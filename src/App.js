import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import { useStateValue } from "./Context/StateProvider";
import { Login, Player } from "./Pages/index";
import { userToken } from "./spotify";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();
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
      //spotify.getNewReleases().then((data) => console.log(data));
    }
  }, [token, dispatch]);
  useEffect(() => {
    //get width of the screen
    const hanleScreenSize = () => {
      let screensize = window.innerWidth;
      dispatch({
        type: "SET_SCREENSIZE",
        ScreenSize: screensize,
      });
    };

    //get width of the windo on evrey resize of the screnn
    window.addEventListener("resize", hanleScreenSize);
    hanleScreenSize();

    return () => {
      window.removeEventListener("resize", hanleScreenSize);
    };
  }, []);
  return <div>{token ? <Player spotify={spotify} /> : <Login />}</div>;
}

export default App;
