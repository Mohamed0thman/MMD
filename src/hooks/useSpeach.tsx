import { useEffect, useState } from 'react';

import Voice, {
  SpeechEndEvent,
  SpeechStartEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';

const useSpeach = (lang: string = 'ar') => {
  const [recognized, setRecognized] = useState<string>('');
  const [started, setStarted] = useState<boolean>(false);
  const [results, setResults] = useState<string[] | undefined>([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognition = async () => {
    try {
      await Voice.start(lang);
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechStart = (e: SpeechStartEvent) => {
    setStarted(true);
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    setRecognized('√');
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('new', e.value);
    setResults(e.value);
  };

  const onSpeechEnd = (e: SpeechEndEvent) => {
    setStarted(false);
    console.log('e', e);
  };

  const stopRecognition = async () => {
    try {
      setStarted(false);
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };
  return { stopRecognition, startRecognition, started, results };
};

export  {useSpeach};
