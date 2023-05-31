import React from "react";
import { StyleSheet, View } from "react-native";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import MessagesList from "../components/MessagesList";
import WriteMessagePanel from "../components/WriteMessagePanel";
import db from "../firestore";

export default function ChatScreen({ route }) {
  const { name } = route.params;
  const [messages, setMessages] = React.useState([]);

  //Add listener to database on component mount
  React.useEffect(() => {
    const q = query(collection(db, "chat-app-uppsala"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setMessages((oldMessages) => [...oldMessages, change.doc.data()]);
        }
      });
    });

    //remove listener on component unmount
    return () => unsubscribe();
  }, []);

  async function SaveMessage(text) {
    try {
      const docRef = await addDoc(collection(db, "chat-app-uppsala"), {
        name,
        text,
        date: new Date().toLocaleString("sv-SE"),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View style={styles.container}>
      <MessagesList name={name} messages={messages} />
      <WriteMessagePanel name={name} SaveMessage={SaveMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
