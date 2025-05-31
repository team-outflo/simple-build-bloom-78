
import { useQuery } from "@tanstack/react-query";
import { getAccounts, getAccount } from "@/api/accounts";
import { Account } from "@/types/accounts";

export const useAccountsQuery = () => {
  return useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await getAccounts();
      return response.data;
    },
    refetchInterval: 120000,
  });
};

export const useAccountQuery = (accountId: string) => {
  return useQuery<Account>({
    queryKey: ["accounts", accountId],
    queryFn: async () => {
      const response = await getAccount(accountId);
      return response.data;
    },
    enabled: !!accountId,
  });
};
