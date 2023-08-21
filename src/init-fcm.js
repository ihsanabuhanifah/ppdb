import * as firebase from "firebase/app";
import "firebase/messaging";

firebase.initializeApp({
    apiKey: "AIzaSyACqkG52CtzYgbl0_EVw8qkUxvWslXB4MA",
    authDomain: "fir-psb-notif-1dd4e.firebaseapp.com",
    projectId: "fir-psb-notif-1dd4e",
    storageBucket: "fir-psb-notif-1dd4e.appspot.com",
    messagingSenderId: "139127533328",
    appId: "1:139127533328:web:6ef745184db40701903f95",
});

let messaging = firebase.messaging();

messaging.onMessage(function (payload) {
  try {  //try???
    console.log('Message received. ', payload);

    const noteTitle = payload.notification.title;
    const noteOptions = {
      body: payload.notification.body,
      icon: "typewriter.jpg", //this is my image in my public folder
    };

    console.log("title ", noteTitle, " ", payload.notification.body);
    //var notification = //examples include this, seems not needed

    new Notification(noteTitle, noteOptions).onclick = function (event) {
      // console.log(event);
      // console.log(payload.notification.click_action);
      if(payload && payload.notification &&  payload.notification.click_action &&  payload.notification.click_action.length > 0)
      {
        window.open(payload.notification.click_action, '_blank');
      }
      this.close();
    };
  }
  catch (err) {
    console.log('Caught error: ', err);
  }
});

messaging.usePublicVapidKey(
    "BIJnu5Rq_eI-nulWKTQ-TwbADc44bfyXZ4oolgf0L-36kdAwHJQKyh-QEaHcALMv4fl5xyohUNsrir-ppoingM4"
);

export { messaging };