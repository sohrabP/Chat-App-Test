import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

export default function HomeScreen({ navigation }) {
  const [name, setName] = React.useState("");

  function Submit() {
    navigation.navigate("Chat", {
      name,
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      <Button disabled={!name} title="Login" onPress={Submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    margin: 12,
    borderWidth: 0.5,
    padding: 5,
  },
});
