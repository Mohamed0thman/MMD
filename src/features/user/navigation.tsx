import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ProfileScreen } from './screens';
import { BackHeaderIcon } from '../../navigation/components/Header';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type UserNavigationScreenParamsList = {
  Profile: undefined;
};

const UsergNavigationScreens: {
  name: keyof UserNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      headerRight: () => <BackHeaderIcon title="الشخصية" />,
      headerLeft: () => <></>,
      headerTitle: '',
    },
  },
];

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      {UsergNavigationScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

const useProfileNavigation = () =>
  useNavigation<NavigationProp<UserNavigationScreenParamsList>>();

export { UserStack, useProfileNavigation, type UserNavigationScreenParamsList };
