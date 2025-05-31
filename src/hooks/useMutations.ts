
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { GenericApiResponse } from "@/api/inbox";
import { postMessage, campaignMessage } from "@/api/inbox";

export const usePostMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<GenericApiResponse, { conversationId: string; text: string }>({
    mutationKey: ["postMessage"],
    mutationFn: async ({ conversationId, text }) => await postMessage(conversationId, text),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["conversations"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["messages"],
        }),
      ]);
    },
  });
};

export const useCampaignMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<GenericApiResponse, { senderURN: string, url: string, message: string }>({
    mutationKey: ["campaignMessage"],
    mutationFn: async ({ senderURN, url, message }) => await campaignMessage(senderURN, url, message),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["conversations"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["messages"],
        }),
      ]);
    },
  });
};
