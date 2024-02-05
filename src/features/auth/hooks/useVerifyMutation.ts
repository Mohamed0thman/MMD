import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../../../services/axios/apiClient';
import { APIError } from '../../../../types/api';

type VerifyMutationParams = {
  code: string;
};

type VerifyResponse = {
  success: boolean;
  data: [];
  errors: [];
  message: string;
  token: string;
};

const verifyUser = async (body: VerifyMutationParams) => {
  return await apiClient.post<VerifyResponse>('/user-verify', body);
};

export const useVerifyMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: AxiosError<APIError>) => void;
  onSuccess?: (data: VerifyResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: VerifyMutationParams) => verifyUser(params),
    onError(error) {
      onError?.(error as AxiosError<APIError>);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
