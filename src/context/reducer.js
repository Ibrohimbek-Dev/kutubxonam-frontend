export const actionType = {
  SET_AUTHOR: "SET_AUTHOR",
  SET_AUTHOR_FILTER: "SET_AUTHOR_FILTER",

  SET_BOOK: "SET_BOOK",
  SET_BOOK_FILTER: "SET_BOOK_FILTER",

  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",

  SET_SEARCH_TERM: "SEARCH",
  SET_SEARCH_FILTER: "SEARCH_FILTER",

  SET_ALL_STORIES: "SET_ALL_STORIES",

  SET_STORY_PLAYING: "SET_STORY_PLAYING",

  SET_MINI_PLAYER: "SET_MINI_PLAYER",

  SET_STORY: "SET_STORY",

  SET_FILTERED_STORIES: "SET_FILTERED_STORIES",

  SET_PLAY: "SET_PLAY",

  SET_FAVOURITES_STORIES: "SET_FAVOURITES_STORIES",

  SET_FILTER_TERM: "SET_FILTER_TERM",

  SET_SEARCH_ITEM: "SET_SEARCH_ITEM",

  SET_SEARCH_BY: "SET_SEARCH_BY",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_BOOK_FILTER:
      return {
        ...state,
        bookFilter: action.bookFilter,
      };

    case actionType.SET_AUTHOR_FILTER:
      return {
        ...state,
        authorFilter: action.authorFilter,
      };

    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    case actionType.SET_ALL_STORIES:
      return {
        ...state,
        allStories: action.allStories,
      };

    case actionType.SET_STORY_PLAYING:
      return {
        ...state,
        isStoryPlaying: action.isStoryPlaying,
      };

    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        miniPlayer: action.miniPlayer,
      };

    case actionType.SET_STORY:
      return {
        ...state,
        story: action.story,
      };

    case actionType.SET_FILTERED_STORIES:
      return {
        ...state,
        filteredStories: action.filteredStories,
      };

    case actionType.SET_PLAY:
      return {
        ...state,
        play: action.play,
      };

    case actionType.SET_FAVOURITES_STORIES:
      return {
        ...state,
        allFavouritesStories: action.allFavouritesStories,
      };

    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };
    case actionType.SET_SEARCH_ITEM:
      return {
        ...state,
        searchItem: action.searchItem,
      };
    case actionType.SET_SEARCH_BY:
      return {
        ...state,
        searchBy: action.searchBy,
      };
    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    default:
      return state;
  }
};

export default reducer;
