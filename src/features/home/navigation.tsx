import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { HomeScreen, PaymentScreen, SelectPaymentScreen } from './screens';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainHeaderIcon } from '../../navigation/components/Header';

export type HomeNavigationScreenParamsList = {
  Home: undefined;
  Payment: { url: string };
  Select: undefined;
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
      title: '',
      header: MainHeaderIcon,
      headerBackVisible: true,
    },
  },

  {
    name: 'Payment',
    component: PaymentScreen,
    options: {
      title: '',
      header: MainHeaderIcon,
    },
  },

  {
    name: 'Select',
    component: SelectPaymentScreen,
    options: {
      title: '',
      header: MainHeaderIcon,
    },
  },
];

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
