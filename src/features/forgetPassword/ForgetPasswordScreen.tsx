import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

const myFunctionRef = useRef<(() => void) | null>(null);

const ForgetPasswordScreen = () => {
  return (
    <View>
      <Text>ForgetPasswordScreen</Text>
    </View>
  );
};

export {ForgetPasswordScreen};

const MyComponent = forwardRef<any>((props, ref) => {
  const myFunctionRef = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({
    myFunction: () => {
      myFunctionRef.current();
    },
  }));

  const myFunction = () => {
    console.log('Hello from myFunction!');
  };

  myFunctionRef.current = myFunction;

  return <div>My Component</div>;
});


