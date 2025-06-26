import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from './src/components/Header';
import { useState } from 'react';
import Card from './src/components/Card';
import { theme } from './src/theme/theme';
import ErrorBoundary from 'react-native-error-boundary';


const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <View style={styles.errorContainer}>
    <Text>OOps</Text>
    <Text>Une erreur est survenue</Text>
    <ScrollView style={styles.errorDetailsContainer}>
      <Text>
        {error.name} : {error.message}
      </Text>
    </ScrollView>
    <TouchableOpacity onPress={resetError}>
      <Text>Réessayer l'action</Text>
    </TouchableOpacity>
  </View>
)


export default function App() {
  const [cardCount, setCardCount] = useState(1);


  const addCard = () => {
    setCardCount(cardCount + 1)
  }

  const logError = (error: Error, stackTrace: string) => {
    console.log("Erreur :", error, stackTrace)
  }

  const triggerError = () => {
    throw new Error("Erreur de test");
  }
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <SafeAreaView style={styles.container}>
      <Header title="My WikiApp"></Header>
      <View style={styles.mainContent}>
        {cardCount === 5 && (null as any).crash}
        
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{cardCount}</Text>
            <Text style={styles.statLabel}>Articles</Text>
          </View>
          <TouchableOpacity style={styles.statCard} onPress={triggerError}>
            <Text style={[styles.statNumber, {color: theme.colors.danger}]}>err!</Text>
            <Text style={styles.statLabel}>Déclencher l'erreur</Text>
          </TouchableOpacity>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Vues</Text>
          </View>                    
        </View>


        <ScrollView style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Mes cartes d'article </Text>
          {/* créer autant de cartes que ma valeur "count" *  */}
          {/* Créer un tableau de la taill count qui contient count * cartes */}
          {Array.from({length: cardCount}, (_, index) => (
              <Card
                key={index}
                title={`Article ${index + 1}`}
                description="Ceci est un exemple d'article"

                ></Card>
          ))}
          <View style={styles.bottomSpacer}/>
        </ScrollView>

          <View style={styles.floatingButtonContainer}>
            <TouchableOpacity style={styles.floatingButton} onPress={addCard}>
              <Text style={styles.floatingButtonText}>Ajouter une carte</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
    errorTitle: {
    ...theme.typography.h1,
    fontSize: 48,
    color: theme.colors.danger,
    marginBottom: theme.spacing.sm,
  },
  errorSubtitle: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  errorDetailsContainer: {
    backgroundColor: '#ffebee',
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    width: '100%',
    maxHeight: 200,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  // Section de statistiques horizontale
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Section de contenu principal
  contentSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
    marginTop: 8,
  },
  // Bouton flottant
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 200,
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 100, // Espace pour le bouton flottant
  },
});



// [stat  stat  stat]
// ...Scrollview...
