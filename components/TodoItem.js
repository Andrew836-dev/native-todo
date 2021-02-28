import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

function TodoItem ({ dispatch, index, todo }) {
  const [isEditMode, setIsEditMode] = useState(!todo.task);
  const [textField, setTextField] = useState(todo.task);

  function finishEdit () {
    const newDate = todo.date || Date.now();
    setIsEditMode(() => false);
    dispatch({ type: "update", index, todo: { task: textField, date: newDate, done: false } })
  }

  if (isEditMode) return (<View style={{ flexDirection: "row" }}>
    <TextInput value={textField} autoFocus={true} onChangeText={setTextField} onSubmitEditing={finishEdit} />
    <Button title="Submit" onPress={finishEdit} />
  </View>);
  return (<View style={{ flexDirection: "row" }}>
    <Text>{new Date(todo.date).toUTCString()}</Text>
    <Text style={{ textDecorationLine: todo.done ? "line-through" : "none" }}>{todo.task}</Text>
    <Button title="Remove" onPress={() => dispatch({ type: "remove", index })} />
    <Button title="Complete" onPress={() => dispatch({ type: "complete", index })} />
    <Button title="Edit" onPress={() => setIsEditMode(prevState => !prevState)} />
  </View>);
}

export default TodoItem;