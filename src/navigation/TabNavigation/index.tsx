import React from 'react';
import { SCALE } from '../../constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icons, StyledText } from '../../components';
import { LevelsScreen } from '../../features/courses/screens';
import { Image } from 'react-native';
import images from '../../constants/images';
import { TabBar } from './TabBar';
import { TabHeader } from './TabHeader';

export type TabParamList = {
  Courses: undefined;
  Home: undefined;
  Profile: undefined;
};

const { s, vs } = SCALE;

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: props => <TabHeader {...props} />,
        tabBarStyle: {},
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={'Home'}>
      <Tab.Screen
        options={{
          tabBarItemStyle: { borderTopLeftRadius: s(24) },
          tabBarLabel: () => <StyledText>دروسي</StyledText>,
          tabBarIcon: ({ focused }) => <Icons icon="book" />,
        }}
        name={'Courses'}
        component={LevelsScreen}
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
            />
          ),
        }}
        name={'Home'}
        component={LevelsScreen}
      />
      <Tab.Screen
        options={{
          tabBarItemStyle: { borderTopRightRadius: s(24) },
          tabBarLabel: () => <StyledText>الأختبار</StyledText>,
          tabBarIcon: ({ focused }) => <Icons icon="pin" />,
        }}
        name={'Profile'}
        component={LevelsScreen}
      />
    </Tab.Navigator>
  );
};

export { TabNavigator };
