import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../../../services/axios/apiClient';
import { APIError } from '../../../../types/api';

type RequestChangePasswordMutationParams = {
  email: string;
};

type RequestChangePasswordResponse = {
  success: true;
  data: [];
  errors: [];
  message: string;
  token: string;
};

const requestChangePassword = async (
  body: RequestChangePasswordMutationParams,
) => {
  return await apiClient.post<RequestChangePasswordResponse>(
    '/password/request',
    body,
  );
};

export const useRequestChangePasswordMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: AxiosError<APIError>) => void;
  onSuccess?: (data: RequestChangePasswordResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: RequestChangePasswordMutationParams) =>
      requestChangePassword(params),
    onError(error) {
      onError?.(error as AxiosError<APIError>);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
