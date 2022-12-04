export const initialState = {
  user: null,
  playlists: [],
  selectedPlaylistId: null,
  spotify: null,
  top_artists: null,
  playing: null,
  item: null,
  token: null,
  playerState: false,
  selectedRoote: "Player",
  topArtists: null,
  selectedArtist: null,
  selectedAlbum: null,
  searchInput: false,
  categoryPlayLists: [],
  SearchResults: [],
  SearchResultsEp: [],
  SearchResultsSh: [],
  ShowMobileMenu: false,
  ScreenSize: null,
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
    case "SET_ROUTE":
      return {
        ...state,
        selectedRoote: action.selectedRoote,
      };
    case "GET_TOPARTISTS":
      return {
        ...state,
        topArtists: action.topArtists,
      };
    case "SET_SELECTED_ARTIST":
      return {
        ...state,
        selectedArtist: action.selectedArtist,
      };
    case "SET_SELECTED_Album":
      return {
        ...state,
        selectedAlbum: action.selectedAlbum,
      };
    case "SET_SEARCHINPUT":
      return {
        ...state,
        searchInput: action.searchInput,
      };
    case "SET_CATEGORY_PLAYLIST":
      return {
        ...state,
        categoryPlayLists: action.categoryPlayLists,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        SearchResults: action.SearchResults,
      };
    case "SET_SEARCH_RESULTS_EP":
      return {
        ...state,
        SearchResultsEp: action.SearchResultsEp,
      };
    case "SET_SEARCH_RESULTS_SH":
      return {
        ...state,
        SearchResultsSh: action.SearchResultsSh,
      };
    case "SET_SHOW_MENU":
      return {
        ...state,
        ShowMobileMenu: action.ShowMobileMenu,
      };
    case "SET_SCREENSIZE":
      return {
        ...state,
        ScreenSize: action.ScreenSize,
      };
    default:
      return state;
  }
};
