import { authRepository } from "@/repositories/auth.repositories";
import { useMutation } from "@tanstack/react-query";

export function useForgotPassword() {
  return useMutation({ mutationFn: authRepository.forgotPassword })
}