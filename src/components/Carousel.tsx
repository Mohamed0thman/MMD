import { StyleSheet, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SCALE, SIZES } from '../constants';
import { useRestyleTheme } from '../style/theme';

const { SC_HEIGHT, SC_Width, s, vs, ms, mvs } = SCALE;

type Props = {
  data: any[];
  carouselItem: (item: any) => React.JSX.Element;
  time?: number;
};

export default ({ data, carouselItem, time }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { colors } = useRestyleTheme();

  let index = 0;
  const totalIndex = data.length - 1;
  const flatListRef = React.useRef<FlatList>(null);
  React.useEffect(() => {
    if (!data.length) return;
    const intervalId = setInterval(() => {
      index++;
      if (index <= totalIndex) {
        setCurrentIndex(index);
        flatListRef.current?.scrollToIndex({ animated: true, index: index });
      } else {
        index = 0;
        setCurrentIndex(index);
        flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
      }
    }, time || 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={data}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{ flexGrow: 0 }}
        keyExtractor={(item, i) => `${i}`}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>{carouselItem(item)}</View>
        )}
        getItemLayout={(_, i) => ({
          length: SC_Width,
          offset: SC_Width * i,
          index: i,
        })}
        initialScrollIndex={0}
        initialNumToRender={data.length}
      />

      <View style={styles.row}>
        {data.map((item, i) => (
          <View
            key={i}
            style={[
              { ...styles.dote, backgroundColor: colors.secondaryBackground },
              i === currentIndex && {
                ...styles.activeDote,
                backgroundColor: colors.primaryBackground,
              },
            ]}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: SC_Width,
    paddingHorizontal: ms(SIZES.base),
    paddingVertical: mvs(SIZES.base),
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
    marginTop: mvs(SIZES.padding),
  },
  dote: {
    width: s(6),
    height: vs(4),
    borderRadius: SIZES.radius,
  },
  activeDote: { width: s(SIZES.base) },
});
