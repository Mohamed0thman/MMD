import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../../services/axios/apiClient';
import { Unit } from '../types';

type GetUnitResponse = {
  success: boolean;
  data: Unit[];
  errors: [];
  message: string;
  token: string;
};

const getUnits = async (levelId: number) => {
  return (await apiClient.get<GetUnitResponse>(`/levels/${levelId}/units`))
    .data;
};

export const useUnitsQuery = (levelId: number) =>
  useQuery({
    queryKey: ['units'],
    queryFn: () => getUnits(levelId),
  });
