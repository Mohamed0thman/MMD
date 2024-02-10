import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { HomeScreen } from './screens';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BackHeaderIcon } from '../../navigation/components/Header';
import { useUserStore } from '../../store/authStore';

type HomeNavigationScreenParamsList = {
  Home: undefined;
};

const HomeNavigationScreens: {
  name: keyof HomeNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      headerTitleAlign: 'left',
    },
  },
];

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const { user } = useUserStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () =>
          BackHeaderIcon({ title: user?.name, icon: 'boy-head' }),
      }}>
      {HomeNavigationScreens.map((screen, index) => (
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

const useHomeNavigation = useNavigation<
  NavigationProp<HomeNavigationScreenParamsList>
>;

export { HomeStack, useHomeNavigation };
