import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { addToFavorites, selectTheme, setTheme, useAppDispatch, useAppSelector } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReduxDemo() {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');


    const searchResults = useAppSelector(selectSearchResults);
    const favorites = useAppSelector(selectFavorites);
    const searchHistory = useAppSelector(selectSearchHistory);
    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectError);
    const currentTheme = useAppSelector(selectTheme);
    const notifications = useAppSelector(selectNotifications);


    const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchArticles(searchQuery.trim()));
      dispatch(addToHistory(searchQuery.trim()));
    }
  };

  const handleAddToFavorites = (article: any) => {
    dispatch(addToFavorites(article));
    Alert.alert('Succès', 'Article ajouté aux favoris !');
  };

  const handleRemoveFromFavorites = (articleId: string) => {
    dispatch(removeFromFavorites(articleId));
    Alert.alert('Succès', 'Article retiré des favoris !');
  };

  const handleToggleTheme = () => {
    dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'));
  };

  const handleToggleNotifications = () => {
    dispatch(toggleNotifications());
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
    Alert.alert('Succès', 'Historique effacé !');
  };

    return (
        <ScrollView>
            <Text>Démo redux</Text>

            {/* Params */}
            <Text>Paramètres</Text>

            <View>
                <TouchableOpacity onPress={handleToggleTheme}>
                    <Text> Thème:  {currentTheme === 'light' ? 'Clair' : 'Sombre'}</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={handleToggleNotifications}>
            <Text >
              Notifications: {notifications ? '🔔 ON' : '🔕 OFF'}
            </Text>
          </TouchableOpacity>
            </View>

        </ScrollView>



    )
}