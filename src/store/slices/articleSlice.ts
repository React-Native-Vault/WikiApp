import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WikiArticle {
    id: string;
    title: string;
    extract: string;
    thumbnail?: {
        source: string;
        width: number;
        height: number;
    }
    pageUrl: string;
}


interface ArticlesState {
  searchResults: WikiArticle[];
  favorites: WikiArticle[];
  searchHistory: string[];
  currentArticle: WikiArticle | null;
  isLoading: boolean;
  error: string | null;
  lastQuery: string;
}

const initialState: ArticlesState = {
  searchResults: [],
  favorites: [],
  searchHistory: [],
  currentArticle: null,
  isLoading: false,
  error: null,
  lastQuery: '',
};


export const searchArticles = createAsyncThunk(
  'articles/searchArticles',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}?redirect=true`
      );
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.type === 'disambiguation') {
        // Gérer les pages de désambiguïsation
        return rejectWithValue('Page de désambiguïsation trouvée');
      }
      
      const article: WikiArticle = {
        id: data.pageid?.toString() || Math.random().toString(),
        title: data.title,
        extract: data.extract || 'Pas de résumé disponible',
        thumbnail: data.thumbnail,
        pageUrl: data.content_urls?.desktop?.page || `https://fr.wikipedia.org/wiki/${data.title}`,
      };
      
      return { article, query };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Erreur inconnue');
    }
  }
);


export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const exists = state.favorites.find(article => article.id === action.payload.id)
            if (!exists) {
                state.favorites.push(action.payload);
            }
        },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(article => article.id !== action.payload);
    },

    addToHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.searchHistory.includes(query)) {
        state.searchHistory.unshift(query);
        // Limiter l'historique à 10 éléments
        if (state.searchHistory.length > 10) {
          state.searchHistory.pop();
        }
      }
    },

    clearHistory: (state) => {
      state.searchHistory = [];
    },

    setCurrentArticle: (state, action: PayloadAction<WikiArticle | null>) => {
      state.currentArticle = action.payload;
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
      state.error = null;
    },


    clearError: (state) => {
      state.error = null;
    },


    }

})



export const {
    addToFavorites,
    removeFromFavorites,
    addToHistory,
    clearHistory,
    setCurrentArticle,
    clearSearchResults,
    clearError,
} = articlesSlice.actions;


export const selectArticles = (state: {articles: ArticlesState}) => state.articles;
export const selectSearchResults = (state: { articles: ArticlesState }) => state.articles.searchResults;
export const selectFavorites = (state: { articles: ArticlesState }) => state.articles.favorites;
export const selectSearchHistory = (state: { articles: ArticlesState }) => state.articles.searchHistory;
export const selectCurrentArticle = (state: { articles: ArticlesState }) => state.articles.currentArticle;
export const selectIsLoading = (state: { articles: ArticlesState }) => state.articles.isLoading;
export const selectError = (state: { articles: ArticlesState }) => state.articles.error;


export default articlesSlice.reducer;