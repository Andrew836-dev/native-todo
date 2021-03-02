import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

function TodoItem ({ dispatch, index, todo }) {
  const [isEditMode, setIsEditMode] = useState(!todo.task);
  const [textField, setTextField] = useState(todo.task);

  function finishEdit () {
    if (!textField) return dispatch({ type: "remove", index });
    const newDate = todo.date || Date.now();
    setIsEditMode(() => false);
    dispatch({ type: "update", index, todo: { task: textField, date: newDate, done: false } })
  }

  return isEditMode ?
    (
      <View style={{ flexDirection: "row" }}>
        <TextInput value={textField} autoFocus={true} onChangeText={setTextField} onSubmitEditing={finishEdit} />
        <Button title="Submit" onPress={finishEdit} />
      </View>
    ) : (
      <View style={{ flexDirection: "row" }}>
        <Text>{new Date(todo.date).toLocaleTimeString()}</Text>
        <Text style={{ textDecorationLine: todo.done ? "line-through" : "none" }}>{todo.task}</Text>
        <SimpleLineIcons name="check" color={todo.done ? "#f00" : "#0f0"} style={styles.iconButton} onPress={() => dispatch({ type: "toggle_complete", index })} />
        <SimpleLineIcons name="pencil" style={styles.iconButton} onPress={() => setIsEditMode(prevState => !prevState)} />
        <SimpleLineIcons name="trash" color="#f00" style={styles.iconButton} onPress={() => dispatch({ type: "remove", index })} />
      </View>
    );
}

const styles = StyleSheet.create({
  iconButton: {
    fontSize: 20,
    height: 30,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 15
  }
})

export default TodoItem;