import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button onPress={schedulePushNotification} title="Send Notification" />
    </View>
  );
}
async function schedulePushNotification() {

  const hasPushNotificationPermissionGranted = await allowsNotificationsAsync()

  if (hasPushNotificationPermissionGranted) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! ",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 3 },
    });

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});