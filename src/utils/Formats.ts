import { Linking, Alert } from 'react-native';

function convertObjectToObjectWithKeys<T extends {}>(obj: T) {
  return Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [key]: key }),
    {} as { [K in keyof T]: K },
  );
}

function isSubscriptionActive(expirationDate: string) {
  // Convert the expiration date string to a Date object
  const expiration = new Date(expirationDate);

  // Get the current date
  const currentDate = new Date();

  // Compare the dates
  return currentDate <= expiration;
}

const openURL = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'An error occurred while trying to open the URL. Please try again later.',
    );
    console.error('Failed to open URL:', error);
  }
};

export { convertObjectToObjectWithKeys, isSubscriptionActive, openURL };
