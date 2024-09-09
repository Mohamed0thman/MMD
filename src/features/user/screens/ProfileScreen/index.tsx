import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import {
  Box,
  Icons,
  MappingList,
  PressableBox,
  StyledText,
} from '../../../../components';
import { useUserStore } from '../../../../store/authStore';
import { useSettingStore } from '../../../../store/settingStore';
import { useRestyleTheme } from '../../../../style/theme';
import Share from 'react-native-share';
import { useMainNavigation } from '../../../../navigation/RootNavigation';
import { openURL } from '../../../../utils/Formats';

const ProfileScreen = () => {
  const { user } = useUserStore();
  const { themeName } = useSettingStore();

  const { logout } = useUserStore();

  const navigation = useMainNavigation();

  const { colors } = useRestyleTheme();

  const data = [
    {
      id: 1,
      label: 'شارك مع أصدقائق',
      icon: <Icons icon="share" />,
      onPress: () =>
        Share.open({
          title: 'مرحبا صديقي',
          message:
            'انا استخدم ابلكيشن MMD للتدرب علي الحساب الذهني أبدا معي الأن',
          url: 'https://play.google.com/store/apps/details?id=com.belahedod.academy',
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          }),
    },

    {
      id: 2,
      label: 'تواصل مع الدعم',
      icon: <Icons icon="support" />,
      onPress: () => openURL('http://mmdoaa.com/'),
    },
    {
      id: 3,
      label: 'سياسة الاستخدام',
      icon: <Icons icon="list" />,
      onPress: () => openURL('http://mmdoaa.com/terms-and-conditions'),
    },
    {
      id: 4,
      label: 'سياسة الخصوصية',
      icon: <Icons icon="shield" />,
      onPress: () => openURL('https://mmdoaa.com/privacy'),
    },
    {
      id: 5,
      label: 'الأعدادت',
      icon: <Icons icon="setting" />,
      onPress: () => '',
    },
    {
      id: 6,
      label: 'الخروج',
      icon: <Icons icon="logout" />,
      onPress: () => {
        logout();
      },
    },
    {
      id: 7,
      label: 'حذف الحساب',
      icon: <Icons icon="logout" />,
      onPress: () => openURL('http://mmdoaa.com/'),
    },
  ];

  const renderItem = (item: (typeof data)[0]) => (
    <PressableBox
      flexDirection="row"
      gap="m"
      alignItems="center"
      marginHorizontal="m"
      borderColor="secondaryBackground"
      borderWidth={1}
      paddingVertical="s"
      paddingHorizontal="m"
      borderRadius="m"
      marginBottom="l"
      onPress={item.onPress}>
      {item.icon}
      <StyledText variant="headingM" color="black">
        {item.label}
      </StyledText>
    </PressableBox>
  );

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box
        padding="l"
        backgroundColor="secondaryBackground"
        style={{ borderRadius: 1000 }}
        alignItems="center"
        justifyContent="center"
        alignSelf="center"
        marginBottom="s">
        <Icons
          icon={themeName === 'blue' ? 'boy-head' : 'girl-head'}
          width={120}
          height={120}
          fill={colors.white}
        />
      </Box>
      <Box alignItems="center">
        <StyledText variant="headingM" color="black">
          {user?.name}
        </StyledText>
        <StyledText variant="labelL" color="black">
          {user?.email}
        </StyledText>
      </Box>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20 }}>
        <MappingList data={data} renderItem={renderItem} />
      </ScrollView>
    </Box>
  );
};

export { ProfileScreen };
