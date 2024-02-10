import React from 'react';
import { SCALE } from '../../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icons, StyledText } from '../../components';
import { Image } from 'react-native';
import images from '../../constants/images';
import { TabBar } from './TabBar';
import { CoursesStack } from '../../features/courses/navigation';
import { HomeStack } from '../../features/home/navigation';
import { ExamStack } from '../../features/exam/navigation';
import { StackActions } from '@react-navigation/routers';
import { useRestyleTheme } from '../../style/theme';

export type TabParamList = {
  Courses: undefined;
  Main: undefined;
  Exam: undefined;
};

const { s } = SCALE;

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const { colors } = useRestyleTheme();

  const resetStackOnTabPress = ({ navigation }: any) => ({
    tabPress: (e: any) => {
      const state = navigation.getState();

      if (state) {
        // Grab all the tabs that are NOT the one we just pressed
        const nonTargetTabs = state.routes.filter(
          (r: any) => r.key !== e.target,
        );

        nonTargetTabs.forEach((tab: any) => {
          // Find the tab we want to reset and grab the key of the nested stack
          const stackKey = tab?.state?.key;

          if (stackKey) {
            // Pass the stack key that we want to reset and use popToTop to reset it
            navigation.dispatch({
              ...StackActions.popToTop(),
              target: stackKey,
            });
          }
        });
      }
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={'Main'}>
      <Tab.Screen
        options={{
          tabBarItemStyle: { borderTopLeftRadius: s(24) },

          tabBarLabel: () => <StyledText>دروسي</StyledText>,
          tabBarIcon: ({ focused }) => (
            <Icons
              icon="book"
              stroke={focused ? colors.primaryBackground : colors.gray700}
            />
          ),
        }}
        name={'Courses'}
        component={CoursesStack}
        listeners={resetStackOnTabPress}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                width: s(66),
                height: s(66),
              }}
              tintColor={focused ? colors.primaryBackground : colors.gray700}
            />
          ),
        }}
        name={'Main'}
        component={HomeStack}
        listeners={resetStackOnTabPress}
      />
      <Tab.Screen
        options={{
          tabBarItemStyle: { borderTopRightRadius: s(24) },
          tabBarLabel: () => <StyledText>الأختبار</StyledText>,
          tabBarIcon: ({ focused }) => (
            <Icons
              icon="pin"
              stroke={focused ? colors.primaryBackground : colors.gray700}
            />
          ),
        }}
        name={'Exam'}
        component={ExamStack}
        listeners={resetStackOnTabPress}
      />
    </Tab.Navigator>
  );
};

export { TabNavigator };
