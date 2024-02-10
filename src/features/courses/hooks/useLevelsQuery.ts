import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../services/axios/apiClient';

const getLevels = async () => {
  return (await apiClient.get('/levels')).data;
};

export const useLevelsQuery = () =>
  useQuery({ queryKey: ['levels'], queryFn: getLevels });
