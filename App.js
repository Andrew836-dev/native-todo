import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import TodoItem from './components/TodoItem';

export default function App () {
  const [todos, setTodos] = useState([{ task: "Add a Todo", date: Date.now(), done: true }]);

  function dispatch (action) {
    switch (action.type) {
      case "update":
        setTodos(currentTodos => currentTodos.map((todo, index) => index === action.index ? action.todo : todo));
        break;
      case "remove":
        setTodos(currentTodos => currentTodos.filter((_todo, index) => index !== action.index));
        break;
      case "complete":
        setTodos(currentTodos => currentTodos.map((todo, index) => index === action.index ? ({ ...todo, done: true }) : todo));
        break;
      default:
    }
  }

  return (
    <View style={styles.container}>
      <Text>ToDo List</Text>
      {!!todos.length && todos.map((todo, i) => (
        <TodoItem dispatch={dispatch} index={i} todo={todo} key={todo.date} />
      ))}
      <Button
        title="Add Todo"
        onPress={() => setTodos(prevTodos => [...prevTodos, { task: "", date: Date.now(), done: false }])}
      />
      <StatusBar style="auto" />
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
  textBox: {
    borderBottomColor: '#ddd',
  }
});
