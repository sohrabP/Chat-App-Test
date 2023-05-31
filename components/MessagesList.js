import { StyleSheet, View, FlatList } from "react-native";
import Message from "./Message";

export default function MessagesList({ messages }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        })}
        inverted
        renderItem={({ item }) => (
          <Message name={item.name} text={item.text} date={item.date} />
        )}
        initialNumToRender={25}
        windowSize={10}
        maxToRenderPerBatch={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    width: "100%",
  },
});
