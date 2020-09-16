/** @format */

import {AppRegistry} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import App from './src/components/App';
import {name as appName} from './app.json';
import BackgroundFetch from "react-native-background-fetch";

import notifWorker from './src/actions/notificationsAvisos';

var PushNotification = require('react-native-push-notification');
PushNotification.cancelAllLocalNotifications();

BackgroundFetch.configure({
    minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
  }, async (taskId) => {
    console.log("[js] Received background-fetch event: ", taskId);
    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time

    const nw = new notifWorker();
    nw.execute();
    BackgroundFetch.finish(taskId);

  }, (error) => {
    console.log("[js] RNBackgroundFetch failed to start");
  });


AppRegistry.registerComponent(appName, () => App);
