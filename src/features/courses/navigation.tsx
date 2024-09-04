import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { LessonScreen, LevelsScreen, UnitsScreen } from './screens';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  BackHeaderIcon,
  MainHeaderIcon,
} from '../../navigation/components/Header';
import { Lesson } from './types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation/TabNavigation';

type CoursesNavigationScreenParamsList = {
  Levels: undefined;
  Units: { levelId: number };
  Lesson: { lesson: Lesson };
};

const CoursesNavigationScreens: {
  name: keyof CoursesNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Levels',
    component: LevelsScreen,
    options: {
      title: '',
      header: MainHeaderIcon,
      headerBackVisible: true,
      navigationBarColor: 'white',
    },
  },
  {
    name: 'Units',
    component: UnitsScreen,
    options: {
      title: '',
      headerRight: () => <BackHeaderIcon title="الوحدات" />,
      headerLeft: () => <></>,
    },
  },
  {
    name: 'Lesson',
    component: LessonScreen,
    options: {
      title: '',
      headerRight: () => <BackHeaderIcon title="الدرس" />,
      headerLeft: () => <></>,
    },
  },
];

const Stack = createNativeStackNavigator();

type Props = BottomTabScreenProps<TabParamList, 'Courses'> & {};

const CoursesStack = ({ navigation }: Props) => {
  return (
    <Stack.Navigator>
      {CoursesNavigationScreens.map((screen, index) => (
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

const useCoursesNavigation = () =>
  useNavigation<NavigationProp<CoursesNavigationScreenParamsList>>();

const useRouteNavigation = <T extends keyof CoursesNavigationScreenParamsList>(
  _screenName: T,
) => useRoute<RouteProp<CoursesNavigationScreenParamsList, T>>();

export {
  CoursesStack,
  useCoursesNavigation,
  useRouteNavigation,
  type CoursesNavigationScreenParamsList,
};
