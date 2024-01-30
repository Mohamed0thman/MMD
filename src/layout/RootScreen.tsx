import {StyleSheet, View, StatusBar, StatusBarProps} from 'react-native';
import React, {FC, PropsWithChildren} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../constants';

type Props = React.ComponentProps<typeof View> & {
  statusBarConfig?: StatusBarProps;
};

const RootScreen: FC<PropsWithChildren<Props>> = ({
  children,
  style,
  statusBarConfig,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: statusBarConfig ? 0 : insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
        {...statusBarConfig}
      />

      {children}
    </View>
  );
};

export {RootScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
