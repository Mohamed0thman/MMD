import { Dimensions, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Box } from '../../../../components';
import Pdf from 'react-native-pdf';
import { useRouteNavigation } from '../../navigation';
import { useAppStore } from '../../../../store/appStore';

const LessonScreen = () => {
  const { lesson } = useRouteNavigation('Lesson').params;

  const { toggleTabBar } = useAppStore();

  useLayoutEffect(() => {
    toggleTabBar(true);
    return () => toggleTabBar(false);
  }, []);

  return (
    <Box style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{
          uri: lesson.attachment_url,
        }}
        enablePaging
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </Box>
  );
};

export { LessonScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
