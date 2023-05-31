import React from "react";
import { StyleSheet, View } from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  limitToLast,
  orderBy,
  endBefore,
} from "firebase/firestore";
import MessagesList from "../components/MessagesList";
import WriteMessagePanel from "../components/WriteMessagePanel";
import db from "../firestore";

export default function ChatScreen({ route }) {
  const { name } = route.params;
  const [messages, setMessages] = React.useState([]);

  const lastDocument = React.useRef(null);

  //Add listener to database on component mount
  React.useEffect(() => {
    const q = query(
      collection(db, "chat-app-uppsala-2.0"),
      limitToLast(25),
      orderBy("date")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setMessages((oldMessages) => [...oldMessages, change.doc.data()]);
        }
      });

      if (lastDocument.current === null) {
        lastDocument.current = snapshot.docs[0];
      }
    });

    //remove listener on component unmount
    return () => unsubscribe();
  }, []);

  async function Fetch() {
    const q = query(
      collection(db, "chat-app-uppsala-2.0"),
      orderBy("date"),
      endBefore(lastDocument.current),
      limitToLast(25)
    );
    const documentSnapshots = await getDocs(q);

    if (documentSnapshots.docs.length !== 0) {
      documentSnapshots.forEach((doc) => {
        setMessages((oldMessages) => [...oldMessages, doc.data()]);
      });

      lastDocument.current = documentSnapshots.docs[0];
    }
  }

  async function SaveMessage(text) {
    try {
      const docRef = await addDoc(collection(db, "chat-app-uppsala-2.0"), {
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
      <MessagesList name={name} messages={messages} Fetch={Fetch} />
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
