import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { theme } from "../theme/theme";


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
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    ...theme.shadows.light,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: theme.radii.md,
    borderTopRightRadius: theme.radii.md,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
}); 


