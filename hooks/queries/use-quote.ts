import { getQuote, type GetQuoteParams } from "@/lib/api/quote";
import { useQuery } from "@tanstack/react-query";

export const useQuote = (params: GetQuoteParams) => {
  return useQuery({
    queryKey: ["quote", params],
    queryFn: () => getQuote(params),
  });
};
