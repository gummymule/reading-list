import { ReadingGoal } from '@/types/goal.types';
import { apiClient } from '@/lib/api-client';

export const goalRepository = {
    get: (year?: number): Promise<ReadingGoal> => {
        return apiClient.get<ReadingGoal>(year ? `/reading-goal?year=${year}` : '/reading-goal')
    },

    update: (year: number, target: number): Promise<ReadingGoal> => {
        return apiClient.patch<ReadingGoal>(`/reading-goal`, { year, target });
    }
};