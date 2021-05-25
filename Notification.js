import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'



const NOTIFICATION_KEY = "NOTIFICATION:FlashCard"

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
export const checkForToday = async()=>{
    return await AsyncStorage.getItem(NOTIFICATION_KEY)
}
  function createNotification () {
    return {
      title: 'Log your stats!',
      body: "👋 don't forget to log your stats for today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export  function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelScheduledNotificationAsync
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
             Notifications.scheduleNotificationAsync({
                  content: {
                      title: 'Hey!',
                  },
                  trigger: {
                    repeats: true,
                    hour: tomorrow.getHours(),
                    minute: tomorrow.getMinutes()
                  }
                }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }