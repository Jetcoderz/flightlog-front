import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';
import Login from './components/Login';

export default function App() {
  return (
    <View>
      <Navbar />
      <Login />
    </View>
  );
}
