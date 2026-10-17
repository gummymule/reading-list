import { authRepository } from "@/repositories/auth.repositories";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
  return useMutation({ mutationFn: authRepository.resetPassword })
}