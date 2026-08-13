import { useQuery } from '@tanstack/react-query';
import { goalQueryKeys } from '@/constants/query-keys.constant';
import { goalRepository } from '@/repositories/goal.repositories';

export function useReadingGoal(year?: number) {
    const query =  useQuery({
        queryKey: goalQueryKeys.byYear(year),
        queryFn: () => goalRepository.get(year)
    });

    return {
        goal: query.data,
        isLoading: query.isLoading,
        isError: query.isError
    };
};