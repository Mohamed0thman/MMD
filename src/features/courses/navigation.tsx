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
import { BackHeaderIcon } from '../../navigation/components/Header';
import { Lesson } from './types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation/TabNavigation';
import { useState } from 'react';

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
    },
  },
  {
    name: 'Units',
    component: UnitsScreen,
  },
  {
    name: 'Lesson',
    component: LessonScreen,
  },
];

const Stack = createNativeStackNavigator();

type Props = BottomTabScreenProps<TabParamList, 'Courses'> & {};

const CoursesStack = ({ navigation }: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: BackHeaderIcon,
      }}
      screenListeners={{
        focus: e => {
          console.log('sssssssssssss', e.target?.split('-')[0]);

          if (
            (e.target?.split(
              '-',
            )[0] as keyof CoursesNavigationScreenParamsList) === 'Lesson'
          ) {
            console.log('ddddddddddddddddddddd');

            navigation.setOptions({
              tabBarStyle: {
                display: 'none',
              },
              tabBarShowLabel: false,
            });
          }
        },
      }}>
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
