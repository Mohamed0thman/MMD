import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { ExamScreen } from './screens';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BackHeaderIcon } from '../../navigation/components/Header';

type ExamNavigationScreenParamsList = {
  examOptions: undefined;
};

const ExamNavigationScreens: {
  name: keyof ExamNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'examOptions',
    component: ExamScreen,
    options: {
      title: 'exam',
    },
  },
];

const Stack = createNativeStackNavigator();

const ExamStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerLeft: BackHeaderIcon,
    }}>
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
