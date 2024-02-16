import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '../../../services/axios/apiClient';
import { APIError } from '../../../../types/api';

type LoginResponse = {
  success: boolean;
  data: [];
  errors: [];
  message: string;
  token: string;
};

const lessonRead = async (lessonId: number) => {
  return await apiClient.post<LoginResponse>(`/lessons/${lessonId}/read`);
};

export const uselessonsRead = ({
  onError,
  onSuccess,
}: {
  onError?: (error: AxiosError<APIError>) => void;
  onSuccess?: (data: LoginResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: (lessonId: number) => lessonRead(lessonId),
    onError(error) {
      onError?.(error as AxiosError<APIError>);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
