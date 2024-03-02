import React, { useEffect, useState } from 'react';

import { Box, Icons, StyledText } from '../../../components';

type Props = {
  duration: number;
  onTimerFinish?: () => void;
  onResendCode?: () => void;
};

const CountdownTimer = ({ duration, onTimerFinish, onResendCode }: Props) => {
  const [time, setTime] = useState<number>(duration);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    setTime(duration);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime(prevTime => prevTime - 1);
        } else {
          setTimerActive(false);
          clearInterval(interval);
          onTimerFinish?.();
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
      onResendCode?.();
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
    <Box flexDirection="row" gap="s" alignItems="center">
      <Icons icon="clock" />
      <StyledText variant="headingM" color="black">
        {formatTime(time)}
      </StyledText>
    </Box>
  );
};

export { CountdownTimer };
