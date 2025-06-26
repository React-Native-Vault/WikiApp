import React from "react";
import { Text, View, StyleSheet } from "react-native";


interface HeaderProps {
    title: String
}

export default function Header({title} : HeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#007bff',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#0056b3',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center' 
    }
})