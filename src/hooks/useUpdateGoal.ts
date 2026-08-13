import { goalRepository } from "@/repositories/goal.repositories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateGoal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ year, target }: { year: number; target: number}) => {
            return goalRepository.update(year, target)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reading-goal'] });
        }
    })
}