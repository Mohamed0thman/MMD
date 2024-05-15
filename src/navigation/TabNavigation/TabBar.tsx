import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SCALE } from '../../constants';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Path, Svg } from 'react-native-svg';
import DropShadow from 'react-native-drop-shadow';

const { SC_Width, s, vs, ms } = SCALE;

type Props = BottomTabBarProps & {};

const TabBar = ({ state, descriptors, navigation }: Props) => {

  return (
    <DropShadow
      style={[
        styles.container,
        {
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
      ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          (options.tabBarLabel as React.ReactNode) || (route.name as string);
        const TabIcon = options.tabBarIcon as React.ElementType;
        const TabBarLabel = options.tabBarLabel as React.ElementType;
        const tabBarItemStyle = options.tabBarItemStyle;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (index === 1) {
          return (
            <View
              style={[styles.middleBtnContainer]}
              key={`${index}--${route.key}`}>
              <Svg width="100%" height="100%" viewBox="0 0 93 60">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M45.9835 40C68.8052 40 87.3058 22.0914 87.3058 0H93V60H0V0H4.66116C4.66116 22.0914 23.1618 40 45.9835 40Z"
                  fill="#fff"
                />
              </Svg>

              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: vs(10),
                  width: s(125),
                  alignSelf: 'center',
                  //   backgroundColor: THEME[themeName].foreground,
                  zIndex: -1,
                }}
              />

              <TouchableOpacity
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                style={[styles.middleBtn]}
                onPress={onPress}
                onLongPress={onLongPress}>
                {/* <Image source={images.logo} width={s(55)} height={vs(55)} /> */}
                <TabIcon focused={isFocused} />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabButton]}
            key={`${index}--${route.key}`}>
            <View style={[styles.innerView, tabBarItemStyle]}>
              <TabIcon focused={isFocused} />
              <TabBarLabel focused={isFocused} />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SC_Width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    height: vs(60),
  },
  tabButton: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  middleBtnContainer: {
    flex: 1,
    marginHorizontal: s(-20),
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleBtn: {
    width: s(66),
    height: vs(66),
    borderRadius: s(66),
    position: 'absolute',
    top: vs(-40),
    overflow: 'hidden',
    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { TabBar };
