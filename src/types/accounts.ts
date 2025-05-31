
export enum SyncState {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export type Account = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: SyncState;
  orgId: string;
  urn: string;
  firstName: string;
  lastName: string;
  convFetchedFailures?: number;
  accountActions?: {
    campaignFailures?: number;
  };
  campaignFailures?: number;
};

export type GetAccountsResponse = {
  data: Account[];
};

export type GetAccountResponse = {
  data: Account;
};
