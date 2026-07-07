import { submitContact } from "@/lib/api/contact";
import { useMutation } from "@tanstack/react-query";

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: submitContact,
  });
};
