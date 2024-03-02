import Tts, { Options } from 'react-native-tts';
import { isIos } from '../../../utils/platform';
import { useEffect, useState } from 'react';

export const useTextToSpeech = () => {
  const [voiceStart, setVoiceStart] = useState<boolean>(false);

  const handleTtsStart = () => setVoiceStart(true);
  const handleTtsFinish = () => setVoiceStart(false);
  const handleTtsCancel = () => setVoiceStart(false);

  useEffect(() => {
    Tts.addEventListener('tts-start', handleTtsStart);
    Tts.addEventListener('tts-finish', handleTtsFinish);
    Tts.addEventListener('tts-cancel', handleTtsCancel);

    return () => {
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
    };
  }, []);

  const readText = async (text: string) => {
    Tts.stop();
    return new Promise<void>(async (resolve, reject) => {
      setVoiceStart(true);

      try {
        await Tts.setDefaultLanguage('ar');
      } catch (error) {
        await Tts.setDefaultLanguage('en');
      }

      const onTtsFinish = () => {
        // Remove the event listener to avoid memory leaks
        Tts.removeAllListeners('tts-finish');
        setVoiceStart(false);
        resolve();
      };

      Tts.addEventListener('tts-finish', onTtsFinish);

      if (isIos) {
        Tts.speak(text, {
          iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
          rate: 0.5,
        } as Options | undefined);
      } else {
        Tts.speak(text, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        } as Options | undefined);
      }
    });
  };

  return {
    readText,
    voiceStart,
  };
};
