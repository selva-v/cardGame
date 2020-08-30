import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import GameScreen from './app/screens/GameScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <GameScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    //alignItems: 'center',
    //padding: 10,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 24,
  },
});
