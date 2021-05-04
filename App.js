import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [Output,setOutput]=useState('initial value')
  return (
    <View style={{borderColor:'red',height:100,borderWidth:3}}>
      <Text>part1</Text>
      <View style={{borderColor:'black',borderWidth:3,height:100}}>
        <Text>part2</Text>
      </View>
      <View style={{borderColor:'black',borderWidth:3,height:100}}>
        <Text>part2</Text>
      </View>
      <View style={{borderColor:'black',borderWidth:3,height:200}}>
        <Text>part2</Text>
      </View>
      <View style={{borderColor:'black',borderWidth:3,height:200}}>
        <Text>part2</Text>
      </View>
      <View style={{borderColor:'black',borderWidth:3,height:200}}>
        <Text>part2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
