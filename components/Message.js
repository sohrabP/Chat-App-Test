import React from 'react';
import { StyleSheet, View, Text } from "react-native";

function Message({ name, text, date }) {
  return (
    <View style={styles.message}>
      <Text style={styles.name}>{name}:</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    display: "flex",
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  date: {
    fontSize: 11,
    color: "#888",
    marginTop: 5,
  },
});

export default React.memo(Message);
