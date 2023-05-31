import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

export default function WriteMessagePanel({ SaveMessage }) {
  const [text, setText] = React.useState("");
  const [height, setHeight] = React.useState();

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        style={[styles.input, { height }]}
        onChangeText={setText}
        value={text}
        placeholder="Write a message"
        onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
      />
      <Button disabled={!text} title="Send Message" onPress={() => SaveMessage(text)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "40%",
  },
  input: {
    width: "100%",
    margin: 12,
    borderWidth: 0.5,
    padding: 5,
  },
});
