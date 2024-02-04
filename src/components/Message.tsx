import {Text, View} from 'react-native';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';

import {flashMessageManager, MessageHelpers} from '../utils/flashmanger';

type Props = {};

const Message = ({}: Props) => {
  const [data, setData] = useState('');
  const messageRef = useRef<MessageHelpers | null>(null);

  useImperativeHandle(
    messageRef,
    () => {
      return {
        showMessage() {
          setData('yes');
        },

        hideMessage() {
          setData('flase');
        },
      };
    },
    [],
  );
  console.log('data', data);

  useEffect(() => {
    flashMessageManager.register(messageRef.current);
  }, [messageRef]);
  return (
    <View>
      <Text>Message</Text>
    </View>
  );
};

export default Message;

export function showMessage() {
  if (flashMessageManager.enabled) {
    const ref = flashMessageManager.getCurrent();
    if (ref) ref.showMessage();
  }
}

export function hideMessage() {
  if (!!flashMessageManager.enabled) {
    const ref = flashMessageManager.getCurrent();
    if (!!ref) ref.hideMessage();
  }
}
