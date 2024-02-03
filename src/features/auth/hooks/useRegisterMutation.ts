import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../../../services/axios/apiClient';
import { APIError } from '../../../../types/api';

type RegisterMutationParams = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type RegiserResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
  };
  errors: [];
  message: string;
  token: string;
};

const regiserUser = async (body: RegisterMutationParams) => {
  console.log('body', body);
  console.log(apiClient.getUri());

  return await apiClient.post<RegiserResponse>('/register', body);
};

export const useRegisterMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: AxiosError<APIError>) => void;
  onSuccess?: (data: RegiserResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: RegisterMutationParams) => regiserUser(params),
    onError(error) {
      onError?.(error as AxiosError<APIError>);
      console.log('error', error);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
