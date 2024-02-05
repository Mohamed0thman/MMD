import { Text, View } from 'react-native';
import { Button } from '.';
import { useEffect, useState } from 'react';

const CountdownTimer = ({ duration, onTimerFinish, onResendCode }: any) => {
  const [time, setTime] = useState<number>(duration);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(prevTime => prevTime - 1);
        } else {
          setTimerActive(false);
          clearInterval(interval);
          onTimerFinish();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [time, timerActive, onTimerFinish]);

  const handleResendCode = () => {
    if (!timerActive) {
      // Reset the timer and enable it
      setTime(duration);
      setTimerActive(true);
      // Call the parent component's callback
      onResendCode();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <View>
      <Text>{formatTime(time)}</Text>
      <Button
        title="Resend Code"
        onPress={handleResendCode}
        disabled={timerActive}
      />
    </View>
  );
};

export { CountdownTimer };
