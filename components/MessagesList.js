import { StyleSheet, View, FlatList } from "react-native";
import Message from "./Message";

//Create functions outside of list to avoid having to re-create them during re-renders
const keyExtractor = (item) => item.id;

const renderItem = ({ item }) => (
  <Message name={item.name} text={item.text} date={item.date} />
);

const sortByDateAscending = function (a, b) {
  return new Date(b.date) - new Date(a.date);
};

export default function MessagesList({ messages, FetchMore }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages.sort(sortByDateAscending)}
        inverted
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={FetchMore}
        onEndReachedThreshold={0.5}
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
