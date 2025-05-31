
import { Account, GetAccountsResponse, GetAccountResponse, SyncState } from "@/types/accounts";

// Mock function to simulate API call
const mockAccounts: Account[] = [
  {
    id: "1",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z",
    status: SyncState.INACTIVE,
    orgId: "org-1",
    urn: "urn:li:person:sarah-johnson",
    firstName: "Sarah",
    lastName: "Johnson",
    convFetchedFailures: 0,
    campaignFailures: 0,
  },
  {
    id: "2",
    createdAt: "2024-01-12T08:20:00Z",
    updatedAt: "2024-01-18T12:30:00Z",
    status: SyncState.INACTIVE,
    orgId: "org-1",
    urn: "urn:li:person:michael-chen",
    firstName: "Michael",
    lastName: "Chen",
    convFetchedFailures: 1,
    campaignFailures: 0,
  },
  {
    id: "3",
    createdAt: "2024-01-10T14:15:00Z",
    updatedAt: "2024-01-22T09:20:00Z",
    status: SyncState.ACTIVE,
    orgId: "org-1",
    urn: "urn:li:person:dev-prashtrip",
    firstName: "DEV",
    lastName: "PRASHTRIP",
    convFetchedFailures: 0,
    campaignFailures: 0,
  },
];

export const getAccounts = async (): Promise<GetAccountsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const updatedAccounts = mockAccounts.map(account => {
    // If already inactive, return as is
    if (account.status === SyncState.INACTIVE) {
      return account;
    }

    // Check conversation fetch failures
    if (account.convFetchedFailures && account.convFetchedFailures >= 3) {
      return {
        ...account,
        status: SyncState.INACTIVE
      };
    }

    // Check campaign failures
    if (account.accountActions?.campaignFailures && account.accountActions.campaignFailures >= 3) {
      return {
        ...account,
        status: SyncState.INACTIVE
      };
    }

    return account;
  });

  return {
    data: updatedAccounts
  };
};

export const getAccount = async (accountId: string): Promise<GetAccountResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const account = mockAccounts.find(acc => acc.id === accountId);
  if (!account) {
    throw new Error(`Account with id ${accountId} not found`);
  }

  // If already inactive, return as is
  if (account.status === SyncState.INACTIVE) {
    return { data: account };
  }

  // Check conversation fetch failures
  if (account.convFetchedFailures && account.convFetchedFailures >= 3) {
    return {
      data: {
        ...account,
        status: SyncState.INACTIVE
      }
    };
  }

  // Check campaign failures
  if (account.campaignFailures && account.campaignFailures >= 3) {
    return {
      data: {
        ...account,
        status: SyncState.INACTIVE
      }
    };
  }

  return { data: account };
};
