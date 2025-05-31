
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { getConversations, getMessages } from "@/api/inbox";
import { ConversationDetail } from "@/types/inbox";

export const useConversationsQuery = (
  pending: boolean,
  search?: string,
  setSearchLoading?: Dispatch<SetStateAction<boolean>>,
) => {
  const accountData: any[] = []; // Mock account data for now
  const selectedAnswerStatus = new Map();
  const selectedAccounts = new Map();

  const selectedAccountIds: string[] = [];
  (accountData ?? []).forEach((account) => {
    if (!selectedAccounts.has(account.id) || (selectedAccounts.has(account.id) && selectedAccounts.get(account.id))) {
      selectedAccountIds.push(account.id);
    }
  });

  return useQuery({
    queryKey: ["conversations", search, pending, accountData, selectedAccountIds, selectedAnswerStatus],
    queryFn: async () => {
      const response = await getConversations(
        accountData ?? [],
        search ?? "",
        pending,
        undefined,
        selectedAccountIds,
        selectedAnswerStatus,
      );
      return response.conversations;
    },
    refetchInterval: 7000,
    onSuccess: () => {
      setSearchLoading?.(false);
    },
  });
};

export const useMessagesQuery = (conversationId: string | undefined) => {
  return useQuery<ConversationDetail>({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const response = await getMessages(conversationId!);
      return response.conversation;
    },
    refetchInterval: 7000,
    enabled: !!conversationId,
  });
};
