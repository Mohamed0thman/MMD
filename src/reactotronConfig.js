import Reactotron from 'reactotron-react-native';
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { queryClient } from './App';

const queryClientManager = new QueryClientManager({
  queryClient,
});

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .connect();

export default Reactotron;
