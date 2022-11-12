export const initialState = {
  user: null,
  playlists: [],
  selectedPlaylistId: null,
  spotify: null,
  discover_weekly: null,
  top_artists: null,
  playing: null,
  item: null,
  token: null,
  playerState: false,
};

export const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_INITALPLAYLIST":
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case "SET_SelectedPlayList":
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_PLAYER_STATE":
      return {
        ...state,
        playerState: action.playerState,
      };
    case "SET_SELECTEDPLAYLIST_ID":
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };

    default:
      return state;
  }
};
