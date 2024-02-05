import * as Keychain from 'react-native-keychain';

export const getToken = async (username: string) => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      const savedUsername = credentials.username;
      const token = credentials.password;

      if (savedUsername === username) {
        console.log(`Retrieved Token for ${username}:`, token);
        return token;
      } else {
        console.log(`No token found for ${username}.`);
      }
    } else {
      console.log(`No token found for ${username}.`);
    }
  } catch (error) {
    console.error(`Error retrieving token for ${username}:`, error);
  }
  return null;
};
