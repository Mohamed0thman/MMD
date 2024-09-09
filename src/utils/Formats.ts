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
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

export { convertObjectToObjectWithKeys, isSubscriptionActive, openURL };
