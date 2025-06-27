import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WikipediaService, WikipediaSearchResult } from '../services/wikipediaApi';


export default function SearchScreen() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<WikipediaSearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            Alert.alert('Attention', 'Veuillez un terme de recherche')
            return;
        }

        setIsLoading(true)
        setError(null)

        try {
            // Faire ma recherche
            const results = await WikipediaService.searchArticles(searchQuery.trim(), 12)
            setSearchResults(results)

            if (results.length === 0) {
                setError('Aucun résultat trouvé')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la recherche')
        } finally {
            setIsLoading(false)
        }


    }

    const renderSearchResult = ({ item }: { item: WikipediaSearchResult }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultContent}>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.resultExtract} numberOfLines={3}>
            {item.extract}
          </Text>
        </View>
        {item.thumbnail && (
          <Image 
            source={{ uri: item.thumbnail.source }} 
            style={styles.resultThumbnail}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );

    const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>🔍</Text>
      <Text style={styles.emptyStateTitle}>Rechercher dans Wikipedia</Text>
      <Text style={styles.emptyStateText}>
        Tapez un mot-clé dans la barre de recherche pour découvrir des articles Wikipedia.
      </Text>
    </View>
  );


    const renderError = () => (
    <View style={styles.errorState}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Erreur</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleSearch}>
        <Text style={styles.retryButtonText}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );





    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text> Retour</Text>
                </TouchableOpacity>
                <Text>Recherche Wikipedia</Text>

            </View>

            <View>
                <TextInput
                
                placeholder='Rechercher des articles'
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                />
                <TouchableOpacity
                    onPress={handleSearch}
                    disabled={isLoading}
                >
                    
                    { isLoading ? (
                    <ActivityIndicator size="small"/>
                    ) : (
                    <Text>🔍</Text>
                    )}

                </TouchableOpacity>
            </View>

            <View>


            { error ? (
                renderError()
            ) : searchResults.length === 0 && !isLoading ? 
            (renderEmptyState() )                   
             :   
            (                 
                    <FlatList
                        data={searchResults}
                        renderItem={renderSearchResult}
                        keyExtractor={(item) => item.pageid.toString()}                        
                    />)}
            </View>

        </SafeAreaView>
    )
}