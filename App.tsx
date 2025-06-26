import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from './src/components/Header';
import { useState } from 'react';
import Card from './src/components/Card';

export default function App() {
  const [cardCount, setCardCount] = useState(1);


  const addCard = () => {
    setCardCount(cardCount + 1)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My WikiApp"></Header>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Mes cartes d'article </Text>
        {/* créer autant de cartes que ma valeur "count" *  */}
        {/* Créer un tableau de la taill count qui contient count * cartes */}
        {Array.from({length: cardCount}, (_, index) => (
            <Card
              key={index}
              title={`Article ${index + 1}`}
              description="Ceci est un exemple d'article"

              ></Card>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={addCard}>
        <Text style={styles.buttonText}>Ajouter une carte</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
