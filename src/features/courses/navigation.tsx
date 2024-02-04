import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { LessonScreen, LevelsScreen, UnitsScreen } from './screens';

type CoursesNavigationScreenParamsList = {
  Levels: undefined;
  Units: undefined;
  Lesson: undefined;
};

const CoursesNavigationScreens: {
  name: keyof CoursesNavigationScreenParamsList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  {
    name: 'Levels',
    component: LevelsScreen,
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

export { CoursesNavigationScreens, type CoursesNavigationScreenParamsList };
