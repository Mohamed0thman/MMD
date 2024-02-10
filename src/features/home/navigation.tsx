import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { HomeScreen } from './screens';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BackHeaderIcon } from '../../navigation/components/Header';

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
      headerTitleAlign: 'center',
    },
  },
];

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerRight: BackHeaderIcon,
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

const useHomeNavigation = useNavigation<
  NavigationProp<HomeNavigationScreenParamsList>
>;

export { HomeStack, useHomeNavigation };
