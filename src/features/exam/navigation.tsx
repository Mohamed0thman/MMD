import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BackHeaderIcon } from '../../navigation/components/Header';
import { ExamPlaygroundScreen, ExamSettingsScreen } from './screens';

type ExamNavigationScreenParamsList = {
  ExamSettings: undefined;
  ExamPlayground: undefined;
};

const ExamNavigationScreens: {
  name: keyof ExamNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'ExamSettings',
    component: ExamSettingsScreen,
    options: {
      headerLeft: () =>
        BackHeaderIcon({ title: 'اعدادات الأختبار', icon: 'boy-head' }),
    },
  },
  {
    name: 'ExamPlayground',
    component: ExamPlaygroundScreen,
    options: {
      headerLeft: () =>
        BackHeaderIcon({ title: ' الأختبار', icon: 'boy-head' }),
    },
  },
];

const Stack = createNativeStackNavigator<ExamNavigationScreenParamsList>();

const ExamStack = () => (
  <Stack.Navigator initialRouteName="ExamSettings">
    {ExamNavigationScreens.map((screen, index) => (
      <Stack.Screen
        key={index}
        name={screen.name}
        component={screen.component}
        options={screen.options}
      />
    ))}
  </Stack.Navigator>
);

const useExamNavigation = useNavigation<
  NavigationProp<ExamNavigationScreenParamsList>
>;

export { ExamStack, useExamNavigation };
