import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface SettingsState {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  language: 'fr' | 'en';
  notifications: boolean;
  autoSave: boolean;
  maxHistoryItems: number;
  isFirstLaunch: boolean;
}



const initialState: SettingsState = {
  theme: 'light',
  fontSize: 'medium',
  language: 'fr',
  notifications: true,
  autoSave: true,
  maxHistoryItems: 10,
  isFirstLaunch: true,
};



export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Changer le thème
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    
    // Changer la taille de police
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    
    // Changer la langue
    setLanguage: (state, action: PayloadAction<'fr' | 'en'>) => {
      state.language = action.payload;
    },
    
    // Activer/désactiver les notifications
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    
    // Activer/désactiver la sauvegarde automatique
    toggleAutoSave: (state) => {
      state.autoSave = !state.autoSave;
    },
    
    // Définir le nombre max d'éléments d'historique
    setMaxHistoryItems: (state, action: PayloadAction<number>) => {
      state.maxHistoryItems = Math.max(1, Math.min(50, action.payload));
    },
    
    // Marquer que l'application n'est plus au premier lancement
    setFirstLaunchComplete: (state) => {
      state.isFirstLaunch = false;
    },
    
    // Réinitialiser les paramètres
    resetSettings: (state) => {
      Object.assign(state, initialState);
    },
  },
});



export const {
  setTheme,
  setFontSize,
  setLanguage,
  toggleNotifications,
  toggleAutoSave,
  setMaxHistoryItems,
  setFirstLaunchComplete,
  resetSettings,
} = settingsSlice.actions;


export const selectSettings = (state: { settings: SettingsState }) => state.settings;
export const selectTheme = (state: { settings: SettingsState }) => state.settings.theme;
export const selectFontSize = (state: { settings: SettingsState }) => state.settings.fontSize;
export const selectLanguage = (state: { settings: SettingsState }) => state.settings.language;
export const selectNotifications = (state: { settings: SettingsState }) => state.settings.notifications;
export const selectAutoSave = (state: { settings: SettingsState }) => state.settings.autoSave;
export const selectMaxHistoryItems = (state: { settings: SettingsState }) => state.settings.maxHistoryItems;
export const selectIsFirstLaunch = (state: { settings: SettingsState }) => state.settings.isFirstLaunch;


export default settingsSlice.reducer;