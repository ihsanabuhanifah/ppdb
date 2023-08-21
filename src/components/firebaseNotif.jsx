import React from "react";
import firebase from "../firebaseInit";

export default function FirebaseNotif() {
  React.useEffect(() => {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then((token) => {
        console.log("Token", token);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);
  return (
    <div>
      <p>ok</p>
    </div>
  );
}
