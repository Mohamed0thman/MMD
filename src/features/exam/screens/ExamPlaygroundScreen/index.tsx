import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  Icons,
  StyledText,
  WaveButton,
} from '../../../../components';
import {
  generateRandomNumber,
  main0,
  sleep,
  main2,
} from '../../../../utils/helpers';
import {
  ExamSettingType,
  useExamSettingStore,
} from '../../../../store/examSetting';
import { useAppStore } from '../../../../store/appStore';
import { TextInput } from 'react-native-gesture-handler';
import { theme } from '../../../../style/theme';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { useSpeach } from '../../../../hooks';
import { showMessage } from 'react-native-flash-message';
import { leve_1 } from '../../../../utils/levelOne';
import Modal from 'react-native-modal';

type Hestory = {
  correct: number;
  wrong: number;
};

const ExamPlaygroundScreen = () => {
  const { examSettings } = useExamSettingStore();

  const { toggleTabBar } = useAppStore();
  const [number, setNumber] = useState<number | string | null>(null);

  const [userAnswer, setUserAnswer] = useState<string>('');
  const [canAnswer, setCanAnswer] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [correactAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [genratedNumbers, setGenratedNumbers] = useState<number[]>([]);

  const [start, setStart] = useState(false);

  const [hestory, setHestory] = useState<Hestory>({
    correct: 0,
    wrong: 0,
  });

  const { readText, voiceStart } = useTextToSpeech();

  const { results, startRecognition, started, stopRecognition } =
    useSpeach('ar');

  const correctAnswer = async (answer: string) => {
    if (Number(answer) === correactAnswer) {
      setHestory(prev => ({
        ...prev,
        correct: prev.correct + 1,
      }));
      await readText('أحسنت');
      showMessage({
        message: 'أحسنت أجابة صحيحة',
        type: 'success',
      });
    } else {
      setHestory(prev => ({
        ...prev,
        wrong: prev.wrong + 1,
      }));
      showMessage({
        message: 'للأسف جابة خاطئة',
        type: 'danger',
      });

      await readText('خطأ');
    }
    setShowAlert(true);
    setStart(false);
  };

  const handleOnStart = () => {
    setStart(true);
    // setTime(30);
  };
  const gameProcessLevel2 = useCallback(
    async (
      _examSettings: ExamSettingType,
      isMountedRef: { current: boolean },
    ) => {
      setCanAnswer(false);

      const { result, sum } = main2(
        _examSettings.numOfOperations,
        _examSettings.digits,
      );
      setGenratedNumbers(result);

      for (let i = 0; i < result.length; i++) {
        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }

        setNumber(result[i]);

        await readText(result[i].toString());
        await sleep(_examSettings.showDelay * 100);

        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }

        setNumber(null);
        await sleep(_examSettings.clearDelay * 100);
      }
      // const sum = numbers.reduce((acc, current) => acc + current, 0);

      setCorrectAnswer(sum);

      setCanAnswer(true);
    },
    [],
  );
  const gameProcessLevel1 = useCallback(
    async (
      _examSettings: ExamSettingType,
      isMountedRef: { current: boolean },
    ) => {
      setCanAnswer(false);

      const { result, sum } = leve_1(
        _examSettings.numOfOperations,
        _examSettings.digits,
      );
      setGenratedNumbers(result);
      for (let i = 0; i < result.length; i++) {
        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }
        setNumber(result[i]);

        await readText(result[i].toString());
        await sleep(_examSettings.showDelay * 100);

        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }

        setNumber(null);
        await sleep(_examSettings.clearDelay * 100);
      }
      // const sum = numbers.reduce((acc, current) => acc + current, 0);

      setCorrectAnswer(sum);

      setCanAnswer(true);
    },
    [],
  );
  const gameProcessLevel0 = useCallback(
    async (
      _examSettings: ExamSettingType,
      isMountedRef: { current: boolean },
    ) => {
      setCanAnswer(false);

      const { result, sum } = main0(
        _examSettings.numOfOperations,
        _examSettings.digits,
      );
      setGenratedNumbers(result);

      for (let i = 0; i < result.length; i++) {
        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }

        setNumber(result[i]);

        await readText(result[i].toString());
        await sleep(_examSettings.showDelay * 100);

        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }

        setNumber(null);
        await sleep(_examSettings.clearDelay * 100);
      }
      // const sum = numbers.reduce((acc, current) => acc + current, 0);

      setCorrectAnswer(sum);

      setCanAnswer(true);
    },
    [],
  );

  const gameProcess = useCallback(
    async (
      _examSettings: ExamSettingType,
      isMountedRef: { current: boolean },
    ) => {
      setCanAnswer(false);
      const randomNumbers: number[] = [];
      let firstNum = true;

      for (let i = 0; i < _examSettings.numOfOperations + 1; i++) {
        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }
        let generateRandom = generateRandomNumber(
          _examSettings.digits,
          _examSettings.subtraction,
        );

        if (firstNum) {
          generateRandom = generateRandom;

          firstNum = false;
        } else {
          if (Number(generateRandom) > 0) {
            generateRandom = '+' + generateRandom;
          } else {
            generateRandom = generateRandom;
          }
        }

        randomNumbers.push(Number(generateRandom));

        setNumber(generateRandom);

        await readText(generateRandom.toString());
        await sleep(_examSettings.showDelay * 100);

        if (!isMountedRef.current) {
          return; // Stop the loop if the component is unmounted
        }

        setNumber(null);
        await sleep(_examSettings.clearDelay * 100);
      }
      const sum = randomNumbers.reduce((acc, current) => acc + current, 0);

      setCorrectAnswer(sum);

      setCanAnswer(true);
    },
    [],
  );

  useEffect(() => {
    if (results?.length) {
      const numbersArray = results.filter(item => !isNaN(parseInt(item, 10)));

      correctAnswer(numbersArray?.[0] as string);
    }
  }, [results]);

  useEffect(() => {
    let isMounted = true;
    const isMountedRef = { current: true };

    const cleanup = () => {
      isMounted = false;
      isMountedRef.current = false;
    };
    if (start) {
      if (examSettings.level === 0) {
        gameProcessLevel0(examSettings, isMountedRef);
      } else if (examSettings.level === 1) {
        gameProcessLevel1(examSettings, isMountedRef);
      } else {
        gameProcessLevel2(examSettings, isMountedRef);
      }
    }

    return cleanup;
  }, [examSettings, start]);

  useLayoutEffect(() => {
    toggleTabBar(true);
    return () => toggleTabBar(false);
  }, []);

  useEffect(() => {
    if (canAnswer) inputRef.current?.focus();
  }, [canAnswer]);
  const operationText = genratedNumbers
    .map((num, i) =>
      num >= 0 && i > 0 ? `+ ${num}` : num.toString().replace('-', '- '),
    )
    .join(' ');

  return (
    <Box flex={1} backgroundColor="mainBackground" paddingHorizontal="l">
      <Modal isVisible={showAlert}>
        <Box
          flex={0.5}
          backgroundColor="white"
          borderRadius="l"
          alignItems="center"
          paddingHorizontal="m"
          paddingVertical="l">
          <Icons
            icon={
              userAnswer.toString() === correactAnswer?.toString()
                ? 'circle-check'
                : 'circle-xmark'
            }
            width={80}
            height={80}
          />
          <Box marginTop="l" />
          <StyledText color="black" marginVertical="l" variant="headingL">
            العملية: {operationText}
          </StyledText>
          <StyledText color="black" variant="headingL">
            الاجابة: {correactAnswer}
          </StyledText>

          <Button
            marginTop="auto"
            title="حسنا"
            onPress={() => setShowAlert(false)}
          />
        </Box>
      </Modal>
      <Box flexDirection="row" justifyContent="space-between" paddingTop="m">
        <Box flexDirection="row" gap="s">
          <Box flexDirection="row" gap="s">
            <Icons icon="wrong" />
            <StyledText color="black">{hestory.wrong}</StyledText>
          </Box>
          <Box flexDirection="row" gap="s">
            <Icons icon="correct" />
            <StyledText color="black">{hestory.correct}</StyledText>
          </Box>
        </Box>
        {/* <CountdownTimer duration={time} /> */}
        <Box />
      </Box>

      {!start ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <TouchableOpacity onPress={handleOnStart}>
            <View
              style={{
                width: 200,
                height: 200,
                borderRadius: 200,
                backgroundColor: theme.colors.primaryBackground,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <StyledText color="white" fontSize={50}>
                أبدا
              </StyledText>
            </View>
          </TouchableOpacity>
        </Box>
      ) : (
        <>
          {/* render top */}
          {!canAnswer && (
            <Box
              width={'100%'}
              flex={1}
              justifyContent="center"
              alignItems="center">
              <StyledText
                fontWeight="700"
                fontSize={70}
                color="primaryBackground">
                {number?.toString()}
              </StyledText>
            </Box>
          )}

          <Box flex={1} justifyContent="center" alignItems="center">
            {canAnswer && examSettings.showKeboard && (
              <TextInput
                ref={inputRef}
                keyboardType="decimal-pad"
                onChangeText={text => setUserAnswer(text)}
                style={{
                  fontSize: 70,
                  fontWeight: 'bold',
                  color: theme.colors.primaryBackground,
                }}
              />
            )}
          </Box>

          <>
            {examSettings.showKeboard ? (
              <Button
                title="اجب"
                disabled={!canAnswer || !userAnswer.length}
                onPress={() => correctAnswer(userAnswer)}
                marginTop="auto"
                marginBottom="l"
              />
            ) : (
              <WaveButton
                wave={started}
                onPressIn={startRecognition}
                onPressOut={stopRecognition}
                icon={<Icons icon="mic" />}
              />
            )}
          </>
        </>
      )}
    </Box>
  );
};

export { ExamPlaygroundScreen };
