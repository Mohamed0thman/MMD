import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../../../services/axios/apiClient';
import { APIError } from '../../../../types/api';

type LoginMutationParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: Date | null;
    subscription_expires_at: string;
  };
  errors: { email: string; password: string };
  message: string;
  token: string;
};

const loginUser = async (body: LoginMutationParams) => {
  return await apiClient.post<LoginResponse>('/login', body);
};

export const useLoginMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: AxiosError<APIError>) => void;
  onSuccess?: (data: LoginResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: LoginMutationParams) => loginUser(params),
    onError(error) {
      onError?.(error as AxiosError<APIError>);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
