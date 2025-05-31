
import { Conversation, ConversationDetail } from "@/types/inbox";

// Mock API responses for now - replace with actual API calls
export interface GetConversationsResponse {
  conversations: Conversation[];
  total: number;
}

export interface GetMessagesResponse {
  conversation: ConversationDetail;
}

export interface GenericApiResponse {
  success: boolean;
  message?: string;
}

// For now, using mock implementations until actual API endpoints are connected
export const getConversations = async (
  _accountData: any[],
  search: string,
  _pending: boolean,
  _cursor?: string,
  selectedAccountsIds?: string[],
  _selectedAnswerStatus?: any,
): Promise<GetConversationsResponse> => {
  // Mock data matching the real API structure
  const mockConversations: Conversation[] = [
    {
      id: "1",
      urn: "urn:li:conversation:1",
      lastActivityAt: Date.now(),
      accountURNs: ["urn:li:account:1"],
      accounts: [
        {
          urn: "urn:li:account:1",
          firstName: "Sampath",
          lastName: "Goud"
        }
      ],
      lastMessage: {
        senderURN: "urn:li:account:2",
        text: "Hi, Hrishikesh"
      }
    },
    {
      id: "2",
      urn: "urn:li:conversation:2",
      lastActivityAt: Date.now() - 86400000,
      accountURNs: ["urn:li:account:3"],
      accounts: [
        {
          urn: "urn:li:account:3",
          firstName: "Mahammad Fahad",
          lastName: "Khadeer"
        }
      ],
      lastMessage: {
        senderURN: "urn:li:account:2",
        text: "Hi, Hrishikesh"
      }
    }
  ];

  // Filter by search term
  const filtered = search 
    ? mockConversations.filter(conv => 
        conv.accounts.some(account => 
          `${account.firstName} ${account.lastName}`.toLowerCase().includes(search.toLowerCase())
        ) || conv.lastMessage.text.toLowerCase().includes(search.toLowerCase())
      )
    : mockConversations;

  return {
    conversations: filtered,
    total: filtered.length
  };
};

export const getMessages = async (conversationId: string): Promise<GetMessagesResponse> => {
  const mockConversationDetail: ConversationDetail = {
    id: conversationId,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now(),
    status: "active",
    urn: `urn:li:conversation:${conversationId}`,
    lastActivityAt: Date.now(),
    accountURNs: ["urn:li:account:1"],
    messages: [
      {
        createdAt: Date.now() - 3600000,
        updatedAt: Date.now() - 3600000,
        urn: "urn:li:message:1",
        senderUrn: "urn:li:account:2",
        text: "Hi Sampath,\nThanks for connecting!",
        sentAt: Date.now() - 3600000
      },
      {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        urn: "urn:li:message:2",
        senderUrn: "urn:li:account:1",
        text: "Hi, Hrishikesh",
        sentAt: Date.now()
      }
    ]
  };

  return {
    conversation: mockConversationDetail
  };
};

export const postMessage = async (conversationId: string, text: string): Promise<GenericApiResponse> => {
  console.log(`Sending message to conversation ${conversationId}: ${text}`);
  return {
    success: true,
    message: "Message sent successfully"
  };
};

export const campaignMessage = async (senderURN: string, url: string, message: string): Promise<GenericApiResponse> => {
  console.log(`Sending campaign message from ${senderURN} to ${url}: ${message}`);
  return {
    success: true,
    message: "Campaign message sent successfully"
  };
};
