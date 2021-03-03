import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import TodoItem from './components/TodoItem';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default function App () {
  const [todos, setTodos] = useState([{ task: "Add a Todo", date: Date.now(), done: true }]);
  const [storageKey] = useState("@todo_storage_key");
  const AsyncStorage = useAsyncStorage();

  function dispatch (action) {
    switch (action.type) {
      case "update":
        setTodos(currentTodos => currentTodos.map((todo, index) => index === action.index ? action.todo : todo));
        break;
      case "remove":
        setTodos(currentTodos => currentTodos.filter((_todo, index) => index !== action.index));
        break;
      case "toggle_complete":
        setTodos(currentTodos => currentTodos.map((todo, index) => index === action.index ? ({ ...todo, done: !todo.done }) : todo));
        break;
      case "complete":
        setTodos(currentTodos => currentTodos.map((todo, index) => index === action.index ? ({ ...todo, done: true }) : todo));
        break;
      default:
    }
  }

  async function saveTodos () {
    try {
      const jsonString = JSON.stringify(todos);
      await AsyncStorage.setItem(storageKey, jsonString);
    } catch (error) {
      console.log("Couldn't save todos :", error.message);
    }
  }

  async function getTodos () {
    try {
      const response = await AsyncStorage.getItem(storageKey);
      if (response != null) {
        const output = JSON.parse(response);
        setTodos(output);
      }
    } catch (error) {
      console.log("Couldn't find todos :", error.message);
    }
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Text style={styles.titleText}>ToDo List</Text>
      </View>
      {/* <View style={styles.todoContainer}> */}
      <FlatList
        style={{ flex: 10 }}
        data={todos}
        renderItem={({ item, index }) => <TodoItem dispatch={dispatch} index={index} todo={item} />}
      />
      {/* </View> */}
      <View style={styles.addButtonContainer}>
        <SimpleLineIcons
          name="plus"
          size={36}
          color="#4F8EF7"
          onPress={() => setTodos(prevTodos => [...prevTodos, { task: "", date: Date.now(), done: false }])}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2a1",
  },
  todoContainer: {
    flex: 10
  },
  addButtonContainer: {
    flex: 3,
    alignItems: "flex-end"
  },
  titleText: {
    color: "#fff",
    fontSize: 30
  }
});
