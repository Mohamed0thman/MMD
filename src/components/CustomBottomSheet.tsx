import React, { PropsWithChildren, forwardRef, useCallback } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRestyleTheme } from '../style/theme';

import { Box, Icons, PressableBox, StyledText } from '.';
import { isAndroid } from '../utils/platform';

type Props = BottomSheetModalProps & {
  title?: string;
  showCloseIcon?: boolean;
};

const CustomBottomSheet = forwardRef<
  BottomSheetModal,
  PropsWithChildren<Props>
>(({ children, onChange, title, showCloseIcon, ...rest }, ref) => {
  const { spacing, colors } = useRestyleTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const showHeader = showCloseIcon || title;
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      handleIndicatorStyle={{ backgroundColor: colors.gray200, width: 40 }}
      enableDynamicSizing
      enablePanDownToClose
      onChange={onChange}
      backdropComponent={renderBackdrop}
      topInset={top + 50}
      keyboardBehavior={isAndroid ? 'extend' : 'interactive'}
      keyboardBlurBehavior="restore"
      style={{ borderTopLeftRadius: spacing.l, overflow: 'hidden' }}
      {...rest}>
      <BottomSheetView style={{ paddingBottom: bottom }}>
        {showHeader && (
          <Box
            flexDirection="row"
            alignSelf="stretch"
            justifyContent="center"
            paddingHorizontal="l"
            paddingBottom="l"
            paddingTop="xs">
            {showCloseIcon && (
              <PressableBox
                onPress={() => dismiss()}
                flex={1}
                position="absolute"
                top={spacing.xs}
                left={spacing.l}>
                <Icons
                  icon="close"
                  width={22}
                  height={22}
                  fill={colors.primaryBackground}
                />
              </PressableBox>
            )}
            {title && (
              <StyledText textAlign="center" variant="labelL">
                {title}
              </StyledText>
            )}
          </Box>
        )}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          {children}
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export { CustomBottomSheet };
