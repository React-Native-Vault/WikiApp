import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";


interface CardProps {
    title: String;
    description: String;
    imageUrl?: String;
}


export default function Card({title, description, imageUrl} : CardProps) {
    return (<View style={styles.container}>
        {/* Image */}
        {/* { CONDITION && CEQUEJEVEUXRENDRE } */}

        {imageUrl && (
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                
            />
        )}
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </View>)
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
}); 


