export { store } from './store'
export type { RootState, AppDispatch} from './store'



export { useAppDispatch, useAppSelector } from './hooks'



export {
  searchArticles,
  addToFavorites,
  removeFromFavorites,
  addToHistory,
  clearHistory,
  setCurrentArticle,
  clearSearchResults,
  clearError,
  selectArticles,
  selectSearchResults,
  selectFavorites,
  selectSearchHistory,
  selectCurrentArticle,
  selectIsLoading,
  selectError,
} from './slices/articleSlice'
export type { WikiArticle } from './slices/articleSlice'



export {
  setTheme,
  setFontSize,
  setLanguage,
  toggleNotifications,
  toggleAutoSave,
  setMaxHistoryItems,
  setFirstLaunchComplete,
  resetSettings,
  selectSettings,
  selectTheme,
  selectFontSize,
  selectLanguage,
  selectNotifications,
  selectAutoSave,
  selectMaxHistoryItems,
  selectIsFirstLaunch,
} from './slices/settingsSlice';
export type { SettingsState } from './slices/settingsSlice'; 