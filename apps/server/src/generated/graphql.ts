/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type CreditBalance = {
  __typename?: 'CreditBalance';
  balance: Scalars['BigInt']['output'];
  batch: CreditBatch;
  id: Scalars['ID']['output'];
  user: User;
};

export type CreditBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CreditBalance_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  batch?: InputMaybe<Scalars['String']['input']>;
  batch_?: InputMaybe<CreditBatch_Filter>;
  batch_contains?: InputMaybe<Scalars['String']['input']>;
  batch_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_ends_with?: InputMaybe<Scalars['String']['input']>;
  batch_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_gt?: InputMaybe<Scalars['String']['input']>;
  batch_gte?: InputMaybe<Scalars['String']['input']>;
  batch_in?: InputMaybe<Array<Scalars['String']['input']>>;
  batch_lt?: InputMaybe<Scalars['String']['input']>;
  batch_lte?: InputMaybe<Scalars['String']['input']>;
  batch_not?: InputMaybe<Scalars['String']['input']>;
  batch_not_contains?: InputMaybe<Scalars['String']['input']>;
  batch_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  batch_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  batch_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  batch_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  batch_starts_with?: InputMaybe<Scalars['String']['input']>;
  batch_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CreditBalance_Filter>>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum CreditBalance_OrderBy {
  Balance = 'balance',
  Batch = 'batch',
  BatchAmount = 'batch__amount',
  BatchId = 'batch__id',
  BatchIssuedAt = 'batch__issuedAt',
  BatchRetiredAmount = 'batch__retiredAmount',
  BatchTokenUri = 'batch__tokenURI',
  Id = 'id',
  User = 'user',
  UserCertificationCid = 'user__certificationCid',
  UserDocumentCid = 'user__documentCid',
  UserId = 'user__id',
  UserProofOfAddressCid = 'user__proofOfAddressCid',
  UserRole = 'user__role'
}

export type CreditBatch = {
  __typename?: 'CreditBatch';
  amount: Scalars['BigInt']['output'];
  creditBalances: Array<CreditBalance>;
  developer?: Maybe<User>;
  id: Scalars['ID']['output'];
  issuedAt: Scalars['Timestamp']['output'];
  project?: Maybe<Project>;
  retiredAmount: Scalars['BigInt']['output'];
  tokenURI: Scalars['String']['output'];
};


export type CreditBatchCreditBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CreditBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CreditBalance_Filter>;
};

export type CreditBatch_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<CreditBatch_Filter>>>;
  creditBalances_?: InputMaybe<CreditBalance_Filter>;
  developer?: InputMaybe<Scalars['String']['input']>;
  developer_?: InputMaybe<User_Filter>;
  developer_contains?: InputMaybe<Scalars['String']['input']>;
  developer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_gt?: InputMaybe<Scalars['String']['input']>;
  developer_gte?: InputMaybe<Scalars['String']['input']>;
  developer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_lt?: InputMaybe<Scalars['String']['input']>;
  developer_lte?: InputMaybe<Scalars['String']['input']>;
  developer_not?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  issuedAt?: InputMaybe<Scalars['Timestamp']['input']>;
  issuedAt_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  issuedAt_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  issuedAt_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  issuedAt_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  issuedAt_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  issuedAt_not?: InputMaybe<Scalars['Timestamp']['input']>;
  issuedAt_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CreditBatch_Filter>>>;
  project?: InputMaybe<Scalars['String']['input']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']['input']>;
  project_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_gt?: InputMaybe<Scalars['String']['input']>;
  project_gte?: InputMaybe<Scalars['String']['input']>;
  project_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_lt?: InputMaybe<Scalars['String']['input']>;
  project_lte?: InputMaybe<Scalars['String']['input']>;
  project_not?: InputMaybe<Scalars['String']['input']>;
  project_not_contains?: InputMaybe<Scalars['String']['input']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  retiredAmount?: InputMaybe<Scalars['BigInt']['input']>;
  retiredAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  retiredAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  retiredAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  retiredAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  retiredAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  retiredAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  retiredAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenURI?: InputMaybe<Scalars['String']['input']>;
  tokenURI_contains?: InputMaybe<Scalars['String']['input']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_gt?: InputMaybe<Scalars['String']['input']>;
  tokenURI_gte?: InputMaybe<Scalars['String']['input']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenURI_lt?: InputMaybe<Scalars['String']['input']>;
  tokenURI_lte?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum CreditBatch_OrderBy {
  Amount = 'amount',
  CreditBalances = 'creditBalances',
  Developer = 'developer',
  DeveloperCertificationCid = 'developer__certificationCid',
  DeveloperDocumentCid = 'developer__documentCid',
  DeveloperId = 'developer__id',
  DeveloperProofOfAddressCid = 'developer__proofOfAddressCid',
  DeveloperRole = 'developer__role',
  Id = 'id',
  IssuedAt = 'issuedAt',
  Project = 'project',
  ProjectCreatedAt = 'project__createdAt',
  ProjectId = 'project__id',
  ProjectStatus = 'project__status',
  RetiredAmount = 'retiredAmount',
  TokenUri = 'tokenURI'
}

export type CreditsIssued = {
  __typename?: 'CreditsIssued';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  developer: User;
  id: Scalars['Int8']['output'];
  internal_id: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
  tokenId: Scalars['BigInt']['output'];
  tokenURI: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CreditsIssued_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<CreditsIssued_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  developer?: InputMaybe<Scalars['String']['input']>;
  developer_?: InputMaybe<User_Filter>;
  developer_contains?: InputMaybe<Scalars['String']['input']>;
  developer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_gt?: InputMaybe<Scalars['String']['input']>;
  developer_gte?: InputMaybe<Scalars['String']['input']>;
  developer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_lt?: InputMaybe<Scalars['String']['input']>;
  developer_lte?: InputMaybe<Scalars['String']['input']>;
  developer_not?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  internal_id?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  internal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CreditsIssued_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenURI?: InputMaybe<Scalars['String']['input']>;
  tokenURI_contains?: InputMaybe<Scalars['String']['input']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_gt?: InputMaybe<Scalars['String']['input']>;
  tokenURI_gte?: InputMaybe<Scalars['String']['input']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenURI_lt?: InputMaybe<Scalars['String']['input']>;
  tokenURI_lte?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum CreditsIssued_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  Developer = 'developer',
  DeveloperCertificationCid = 'developer__certificationCid',
  DeveloperDocumentCid = 'developer__documentCid',
  DeveloperId = 'developer__id',
  DeveloperProofOfAddressCid = 'developer__proofOfAddressCid',
  DeveloperRole = 'developer__role',
  Id = 'id',
  InternalId = 'internal_id',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  TokenUri = 'tokenURI',
  TransactionHash = 'transactionHash'
}

export type CreditsRetired = {
  __typename?: 'CreditsRetired';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  holder: User;
  id: Scalars['Int8']['output'];
  retirementCID?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['Timestamp']['output'];
  tokenId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CreditsRetired_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<CreditsRetired_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  holder?: InputMaybe<Scalars['String']['input']>;
  holder_?: InputMaybe<User_Filter>;
  holder_contains?: InputMaybe<Scalars['String']['input']>;
  holder_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  holder_ends_with?: InputMaybe<Scalars['String']['input']>;
  holder_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  holder_gt?: InputMaybe<Scalars['String']['input']>;
  holder_gte?: InputMaybe<Scalars['String']['input']>;
  holder_in?: InputMaybe<Array<Scalars['String']['input']>>;
  holder_lt?: InputMaybe<Scalars['String']['input']>;
  holder_lte?: InputMaybe<Scalars['String']['input']>;
  holder_not?: InputMaybe<Scalars['String']['input']>;
  holder_not_contains?: InputMaybe<Scalars['String']['input']>;
  holder_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  holder_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  holder_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  holder_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  holder_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  holder_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  holder_starts_with?: InputMaybe<Scalars['String']['input']>;
  holder_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CreditsRetired_Filter>>>;
  retirementCID?: InputMaybe<Scalars['String']['input']>;
  retirementCID_contains?: InputMaybe<Scalars['String']['input']>;
  retirementCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  retirementCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  retirementCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  retirementCID_gt?: InputMaybe<Scalars['String']['input']>;
  retirementCID_gte?: InputMaybe<Scalars['String']['input']>;
  retirementCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  retirementCID_lt?: InputMaybe<Scalars['String']['input']>;
  retirementCID_lte?: InputMaybe<Scalars['String']['input']>;
  retirementCID_not?: InputMaybe<Scalars['String']['input']>;
  retirementCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  retirementCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  retirementCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  retirementCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  retirementCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  retirementCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  retirementCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  retirementCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  retirementCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum CreditsRetired_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  Holder = 'holder',
  HolderCertificationCid = 'holder__certificationCid',
  HolderDocumentCid = 'holder__documentCid',
  HolderId = 'holder__id',
  HolderProofOfAddressCid = 'holder__proofOfAddressCid',
  HolderRole = 'holder__role',
  Id = 'id',
  RetirementCid = 'retirementCID',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  TransactionHash = 'transactionHash'
}

export type DailyCreditStats = {
  __typename?: 'DailyCreditStats';
  id: Scalars['Int8']['output'];
  timestamp: Scalars['Timestamp']['output'];
  total: Scalars['BigInt']['output'];
};

export type DailyCreditStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyCreditStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyCreditStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyCreditStats_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Total = 'total'
}

export type DailyMarketplaceListingStats = {
  __typename?: 'DailyMarketplaceListingStats';
  dailyListings: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  timestamp: Scalars['Timestamp']['output'];
};

export type DailyMarketplaceListingStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyMarketplaceListingStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyMarketplaceListingStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyMarketplaceListingStats_OrderBy {
  DailyListings = 'dailyListings',
  Id = 'id',
  Timestamp = 'timestamp'
}

export type DailyMarketplaceStats = {
  __typename?: 'DailyMarketplaceStats';
  dailyFees: Scalars['BigInt']['output'];
  dailyPurchases: Scalars['BigInt']['output'];
  dailyVolume: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  timestamp: Scalars['Timestamp']['output'];
};

export type DailyMarketplaceStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyMarketplaceStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyMarketplaceStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyMarketplaceStats_OrderBy {
  DailyFees = 'dailyFees',
  DailyPurchases = 'dailyPurchases',
  DailyVolume = 'dailyVolume',
  Id = 'id',
  Timestamp = 'timestamp'
}

export type DailyProjectStats = {
  __typename?: 'DailyProjectStats';
  id: Scalars['Int8']['output'];
  timestamp: Scalars['Timestamp']['output'];
  total: Scalars['BigInt']['output'];
};

export type DailyProjectStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyProjectStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyProjectStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyProjectStats_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Total = 'total'
}

export type DailyProofStats = {
  __typename?: 'DailyProofStats';
  approvals: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  rejections: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
};

export type DailyProofStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyProofStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyProofStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyProofStats_OrderBy {
  Approvals = 'approvals',
  Id = 'id',
  Rejections = 'rejections',
  Timestamp = 'timestamp'
}

export type DailyRetirementStats = {
  __typename?: 'DailyRetirementStats';
  count: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  timestamp: Scalars['Timestamp']['output'];
  total: Scalars['BigInt']['output'];
};

export type DailyRetirementStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyRetirementStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyRetirementStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyRetirementStats_OrderBy {
  Count = 'count',
  Id = 'id',
  Timestamp = 'timestamp',
  Total = 'total'
}

export type DailyReviewStats = {
  __typename?: 'DailyReviewStats';
  approvals: Scalars['BigInt']['output'];
  count: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  rejections: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
};

export type DailyReviewStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyReviewStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyReviewStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyReviewStats_OrderBy {
  Approvals = 'approvals',
  Count = 'count',
  Id = 'id',
  Rejections = 'rejections',
  Timestamp = 'timestamp'
}

export type DailyTransactionStats = {
  __typename?: 'DailyTransactionStats';
  count: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  timestamp: Scalars['Timestamp']['output'];
  total: Scalars['BigInt']['output'];
};

export type DailyTransactionStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DailyTransactionStats_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyTransactionStats_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum DailyTransactionStats_OrderBy {
  Count = 'count',
  Id = 'id',
  Timestamp = 'timestamp',
  Total = 'total'
}

export type Listed = {
  __typename?: 'Listed';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  endTime: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  internal_id: Scalars['BigInt']['output'];
  pricePerUnit: Scalars['BigInt']['output'];
  seller: Scalars['Bytes']['output'];
  startTime: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
  tokenId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Listed_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Listed_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  internal_id?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  internal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Listed_Filter>>>;
  pricePerUnit?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pricePerUnit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_not?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seller?: InputMaybe<Scalars['Bytes']['input']>;
  seller_contains?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_gte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  seller_lt?: InputMaybe<Scalars['Bytes']['input']>;
  seller_lte?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Listed_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  EndTime = 'endTime',
  Id = 'id',
  InternalId = 'internal_id',
  PricePerUnit = 'pricePerUnit',
  Seller = 'seller',
  StartTime = 'startTime',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  TransactionHash = 'transactionHash'
}

export enum ListingStatus {
  Active = 'Active',
  Cancelled = 'Cancelled',
  Filled = 'Filled'
}

export type MarketplaceListing = {
  __typename?: 'MarketplaceListing';
  amount: Scalars['BigInt']['output'];
  createdAt: Scalars['Timestamp']['output'];
  endTime?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  pricePerUnit: Scalars['BigInt']['output'];
  purchases: Array<MarketplacePurchase>;
  remaining: Scalars['BigInt']['output'];
  seller: User;
  startTime?: Maybe<Scalars['Timestamp']['output']>;
  status: ListingStatus;
  token: CreditBatch;
  updatedAt: Scalars['Timestamp']['output'];
};


export type MarketplaceListingPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketplacePurchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MarketplacePurchase_Filter>;
};

export type MarketplaceListing_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<MarketplaceListing_Filter>>>;
  createdAt?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_not?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  endTime?: InputMaybe<Scalars['Timestamp']['input']>;
  endTime_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  endTime_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  endTime_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  endTime_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  endTime_not?: InputMaybe<Scalars['Timestamp']['input']>;
  endTime_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MarketplaceListing_Filter>>>;
  pricePerUnit?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pricePerUnit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_not?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerUnit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  purchases_?: InputMaybe<MarketplacePurchase_Filter>;
  remaining?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_gt?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_gte?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  remaining_lt?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_lte?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_not?: InputMaybe<Scalars['BigInt']['input']>;
  remaining_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seller?: InputMaybe<Scalars['String']['input']>;
  seller_?: InputMaybe<User_Filter>;
  seller_contains?: InputMaybe<Scalars['String']['input']>;
  seller_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_ends_with?: InputMaybe<Scalars['String']['input']>;
  seller_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_gt?: InputMaybe<Scalars['String']['input']>;
  seller_gte?: InputMaybe<Scalars['String']['input']>;
  seller_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seller_lt?: InputMaybe<Scalars['String']['input']>;
  seller_lte?: InputMaybe<Scalars['String']['input']>;
  seller_not?: InputMaybe<Scalars['String']['input']>;
  seller_not_contains?: InputMaybe<Scalars['String']['input']>;
  seller_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  seller_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seller_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  seller_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_starts_with?: InputMaybe<Scalars['String']['input']>;
  seller_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Timestamp']['input']>;
  startTime_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  startTime_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  startTime_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  startTime_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  startTime_not?: InputMaybe<Scalars['Timestamp']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  status?: InputMaybe<ListingStatus>;
  status_in?: InputMaybe<Array<ListingStatus>>;
  status_not?: InputMaybe<ListingStatus>;
  status_not_in?: InputMaybe<Array<ListingStatus>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<CreditBatch_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Timestamp']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  updatedAt_not?: InputMaybe<Scalars['Timestamp']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum MarketplaceListing_OrderBy {
  Amount = 'amount',
  CreatedAt = 'createdAt',
  EndTime = 'endTime',
  Id = 'id',
  PricePerUnit = 'pricePerUnit',
  Purchases = 'purchases',
  Remaining = 'remaining',
  Seller = 'seller',
  SellerCertificationCid = 'seller__certificationCid',
  SellerDocumentCid = 'seller__documentCid',
  SellerId = 'seller__id',
  SellerProofOfAddressCid = 'seller__proofOfAddressCid',
  SellerRole = 'seller__role',
  StartTime = 'startTime',
  Status = 'status',
  Token = 'token',
  TokenAmount = 'token__amount',
  TokenId = 'token__id',
  TokenIssuedAt = 'token__issuedAt',
  TokenRetiredAmount = 'token__retiredAmount',
  TokenTokenUri = 'token__tokenURI',
  UpdatedAt = 'updatedAt'
}

export type MarketplacePurchase = {
  __typename?: 'MarketplacePurchase';
  blockNumber: Scalars['BigInt']['output'];
  buyer: User;
  feePaid: Scalars['BigInt']['output'];
  id: Scalars['Int8']['output'];
  listing: MarketplaceListing;
  quantity: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
  totalPaid: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type MarketplacePurchase_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketplacePurchase_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  buyer?: InputMaybe<Scalars['String']['input']>;
  buyer_?: InputMaybe<User_Filter>;
  buyer_contains?: InputMaybe<Scalars['String']['input']>;
  buyer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_gt?: InputMaybe<Scalars['String']['input']>;
  buyer_gte?: InputMaybe<Scalars['String']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyer_lt?: InputMaybe<Scalars['String']['input']>;
  buyer_lte?: InputMaybe<Scalars['String']['input']>;
  buyer_not?: InputMaybe<Scalars['String']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['String']['input']>;
  buyer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  feePaid?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feePaid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_not?: InputMaybe<Scalars['BigInt']['input']>;
  feePaid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  listing?: InputMaybe<Scalars['String']['input']>;
  listing_?: InputMaybe<MarketplaceListing_Filter>;
  listing_contains?: InputMaybe<Scalars['String']['input']>;
  listing_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  listing_ends_with?: InputMaybe<Scalars['String']['input']>;
  listing_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  listing_gt?: InputMaybe<Scalars['String']['input']>;
  listing_gte?: InputMaybe<Scalars['String']['input']>;
  listing_in?: InputMaybe<Array<Scalars['String']['input']>>;
  listing_lt?: InputMaybe<Scalars['String']['input']>;
  listing_lte?: InputMaybe<Scalars['String']['input']>;
  listing_not?: InputMaybe<Scalars['String']['input']>;
  listing_not_contains?: InputMaybe<Scalars['String']['input']>;
  listing_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  listing_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  listing_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  listing_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  listing_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  listing_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  listing_starts_with?: InputMaybe<Scalars['String']['input']>;
  listing_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketplacePurchase_Filter>>>;
  quantity?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quantity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_not?: InputMaybe<Scalars['BigInt']['input']>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  totalPaid?: InputMaybe<Scalars['BigInt']['input']>;
  totalPaid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPaid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPaid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalPaid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPaid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPaid_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalPaid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum MarketplacePurchase_OrderBy {
  BlockNumber = 'blockNumber',
  Buyer = 'buyer',
  BuyerCertificationCid = 'buyer__certificationCid',
  BuyerDocumentCid = 'buyer__documentCid',
  BuyerId = 'buyer__id',
  BuyerProofOfAddressCid = 'buyer__proofOfAddressCid',
  BuyerRole = 'buyer__role',
  FeePaid = 'feePaid',
  Id = 'id',
  Listing = 'listing',
  ListingAmount = 'listing__amount',
  ListingCreatedAt = 'listing__createdAt',
  ListingEndTime = 'listing__endTime',
  ListingId = 'listing__id',
  ListingPricePerUnit = 'listing__pricePerUnit',
  ListingRemaining = 'listing__remaining',
  ListingStartTime = 'listing__startTime',
  ListingStatus = 'listing__status',
  ListingUpdatedAt = 'listing__updatedAt',
  Quantity = 'quantity',
  Timestamp = 'timestamp',
  TotalPaid = 'totalPaid',
  TransactionHash = 'transactionHash'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['Timestamp']['output'];
  credit?: Maybe<CreditBatch>;
  developer: User;
  id: Scalars['ID']['output'];
  proofs: Array<Proof>;
  proposal: Proposal;
  status: ProjectStatus;
};


export type ProjectProofsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proof_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Proof_Filter>;
};

export type ProjectProposed = {
  __typename?: 'ProjectProposed';
  blockNumber: Scalars['BigInt']['output'];
  developer: User;
  id: Scalars['Int8']['output'];
  internal_id: Scalars['BigInt']['output'];
  meta_description: Scalars['String']['output'];
  meta_eiaCID: Scalars['String']['output'];
  meta_estimatedCredits: Scalars['BigInt']['output'];
  meta_location: Scalars['String']['output'];
  meta_metadataCID: Scalars['String']['output'];
  meta_methodology: Scalars['String']['output'];
  meta_name: Scalars['String']['output'];
  meta_otherDocsCID: Scalars['String']['output'];
  meta_projectPlanCID: Scalars['String']['output'];
  meta_standard: Standard;
  meta_vintage: Scalars['Int']['output'];
  timestamp: Scalars['Timestamp']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProjectProposed_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProjectProposed_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  developer?: InputMaybe<Scalars['String']['input']>;
  developer_?: InputMaybe<User_Filter>;
  developer_contains?: InputMaybe<Scalars['String']['input']>;
  developer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_gt?: InputMaybe<Scalars['String']['input']>;
  developer_gte?: InputMaybe<Scalars['String']['input']>;
  developer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_lt?: InputMaybe<Scalars['String']['input']>;
  developer_lte?: InputMaybe<Scalars['String']['input']>;
  developer_not?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  internal_id?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  internal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  meta_description?: InputMaybe<Scalars['String']['input']>;
  meta_description_contains?: InputMaybe<Scalars['String']['input']>;
  meta_description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_description_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_description_gt?: InputMaybe<Scalars['String']['input']>;
  meta_description_gte?: InputMaybe<Scalars['String']['input']>;
  meta_description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_description_lt?: InputMaybe<Scalars['String']['input']>;
  meta_description_lte?: InputMaybe<Scalars['String']['input']>;
  meta_description_not?: InputMaybe<Scalars['String']['input']>;
  meta_description_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_description_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_contains?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_gt?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_gte?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_eiaCID_lt?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_lte?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_not?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_eiaCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_eiaCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_estimatedCredits?: InputMaybe<Scalars['BigInt']['input']>;
  meta_estimatedCredits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  meta_estimatedCredits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  meta_estimatedCredits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  meta_estimatedCredits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  meta_estimatedCredits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  meta_estimatedCredits_not?: InputMaybe<Scalars['BigInt']['input']>;
  meta_estimatedCredits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  meta_location?: InputMaybe<Scalars['String']['input']>;
  meta_location_contains?: InputMaybe<Scalars['String']['input']>;
  meta_location_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_location_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_location_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_location_gt?: InputMaybe<Scalars['String']['input']>;
  meta_location_gte?: InputMaybe<Scalars['String']['input']>;
  meta_location_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_location_lt?: InputMaybe<Scalars['String']['input']>;
  meta_location_lte?: InputMaybe<Scalars['String']['input']>;
  meta_location_not?: InputMaybe<Scalars['String']['input']>;
  meta_location_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_location_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_location_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_location_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_location_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_location_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_location_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_location_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_location_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_contains?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_gt?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_gte?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_metadataCID_lt?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_lte?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_not?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_metadataCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_metadataCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_methodology?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_contains?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_gt?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_gte?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_methodology_lt?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_lte?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_not?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_methodology_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_methodology_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_name?: InputMaybe<Scalars['String']['input']>;
  meta_name_contains?: InputMaybe<Scalars['String']['input']>;
  meta_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_name_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_name_gt?: InputMaybe<Scalars['String']['input']>;
  meta_name_gte?: InputMaybe<Scalars['String']['input']>;
  meta_name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_name_lt?: InputMaybe<Scalars['String']['input']>;
  meta_name_lte?: InputMaybe<Scalars['String']['input']>;
  meta_name_not?: InputMaybe<Scalars['String']['input']>;
  meta_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_name_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_contains?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_gt?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_gte?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_otherDocsCID_lt?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_lte?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_not?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_otherDocsCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_otherDocsCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_contains?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_gt?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_gte?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_projectPlanCID_lt?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_lte?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_not?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  meta_projectPlanCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  meta_projectPlanCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  meta_standard?: InputMaybe<Standard>;
  meta_standard_in?: InputMaybe<Array<Standard>>;
  meta_standard_not?: InputMaybe<Standard>;
  meta_standard_not_in?: InputMaybe<Array<Standard>>;
  meta_vintage?: InputMaybe<Scalars['Int']['input']>;
  meta_vintage_gt?: InputMaybe<Scalars['Int']['input']>;
  meta_vintage_gte?: InputMaybe<Scalars['Int']['input']>;
  meta_vintage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  meta_vintage_lt?: InputMaybe<Scalars['Int']['input']>;
  meta_vintage_lte?: InputMaybe<Scalars['Int']['input']>;
  meta_vintage_not?: InputMaybe<Scalars['Int']['input']>;
  meta_vintage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProjectProposed_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProjectProposed_OrderBy {
  BlockNumber = 'blockNumber',
  Developer = 'developer',
  DeveloperCertificationCid = 'developer__certificationCid',
  DeveloperDocumentCid = 'developer__documentCid',
  DeveloperId = 'developer__id',
  DeveloperProofOfAddressCid = 'developer__proofOfAddressCid',
  DeveloperRole = 'developer__role',
  Id = 'id',
  InternalId = 'internal_id',
  MetaDescription = 'meta_description',
  MetaEiaCid = 'meta_eiaCID',
  MetaEstimatedCredits = 'meta_estimatedCredits',
  MetaLocation = 'meta_location',
  MetaMetadataCid = 'meta_metadataCID',
  MetaMethodology = 'meta_methodology',
  MetaName = 'meta_name',
  MetaOtherDocsCid = 'meta_otherDocsCID',
  MetaProjectPlanCid = 'meta_projectPlanCID',
  MetaStandard = 'meta_standard',
  MetaVintage = 'meta_vintage',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash'
}

export enum ProjectStatus {
  AuditRejected = 'AuditRejected',
  Finalized = 'Finalized',
  InProgress = 'InProgress',
  None = 'None',
  ProofSubmitted = 'ProofSubmitted'
}

export type Project_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Project_Filter>>>;
  createdAt?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_not?: InputMaybe<Scalars['Timestamp']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  credit_?: InputMaybe<CreditBatch_Filter>;
  developer?: InputMaybe<Scalars['String']['input']>;
  developer_?: InputMaybe<User_Filter>;
  developer_contains?: InputMaybe<Scalars['String']['input']>;
  developer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_gt?: InputMaybe<Scalars['String']['input']>;
  developer_gte?: InputMaybe<Scalars['String']['input']>;
  developer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_lt?: InputMaybe<Scalars['String']['input']>;
  developer_lte?: InputMaybe<Scalars['String']['input']>;
  developer_not?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Project_Filter>>>;
  proofs_?: InputMaybe<Proof_Filter>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_?: InputMaybe<Proposal_Filter>;
  proposal_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_gt?: InputMaybe<Scalars['String']['input']>;
  proposal_gte?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt?: InputMaybe<Scalars['String']['input']>;
  proposal_lte?: InputMaybe<Scalars['String']['input']>;
  proposal_not?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectStatus>;
  status_in?: InputMaybe<Array<ProjectStatus>>;
  status_not?: InputMaybe<ProjectStatus>;
  status_not_in?: InputMaybe<Array<ProjectStatus>>;
};

export enum Project_OrderBy {
  CreatedAt = 'createdAt',
  Credit = 'credit',
  CreditAmount = 'credit__amount',
  CreditId = 'credit__id',
  CreditIssuedAt = 'credit__issuedAt',
  CreditRetiredAmount = 'credit__retiredAmount',
  CreditTokenUri = 'credit__tokenURI',
  Developer = 'developer',
  DeveloperCertificationCid = 'developer__certificationCid',
  DeveloperDocumentCid = 'developer__documentCid',
  DeveloperId = 'developer__id',
  DeveloperProofOfAddressCid = 'developer__proofOfAddressCid',
  DeveloperRole = 'developer__role',
  Id = 'id',
  Proofs = 'proofs',
  Proposal = 'proposal',
  ProposalDescription = 'proposal__description',
  ProposalEiaCid = 'proposal__eiaCID',
  ProposalEstimatedCredits = 'proposal__estimatedCredits',
  ProposalId = 'proposal__id',
  ProposalLocation = 'proposal__location',
  ProposalMetadataCid = 'proposal__metadataCID',
  ProposalMethodology = 'proposal__methodology',
  ProposalName = 'proposal__name',
  ProposalOtherDocsCid = 'proposal__otherDocsCID',
  ProposalProjectPlanCid = 'proposal__projectPlanCID',
  ProposalStandard = 'proposal__standard',
  ProposalStatus = 'proposal__status',
  ProposalSubmittedAt = 'proposal__submittedAt',
  ProposalVintage = 'proposal__vintage',
  Status = 'status'
}

export type Proof = {
  __typename?: 'Proof';
  audits: Array<ProofAudit>;
  developer: User;
  id: Scalars['ID']['output'];
  project: Project;
  proofCID: Scalars['String']['output'];
  submittedAt: Scalars['Timestamp']['output'];
};


export type ProofAuditsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProofAudit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProofAudit_Filter>;
};

export type ProofAudit = {
  __typename?: 'ProofAudit';
  action: ReviewAction;
  auditor: User;
  commentCID?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  proof: Proof;
  timestamp: Scalars['Timestamp']['output'];
};

export type ProofAudit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<ReviewAction>;
  action_in?: InputMaybe<Array<ReviewAction>>;
  action_not?: InputMaybe<ReviewAction>;
  action_not_in?: InputMaybe<Array<ReviewAction>>;
  and?: InputMaybe<Array<InputMaybe<ProofAudit_Filter>>>;
  auditor?: InputMaybe<Scalars['String']['input']>;
  auditor_?: InputMaybe<User_Filter>;
  auditor_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_gt?: InputMaybe<Scalars['String']['input']>;
  auditor_gte?: InputMaybe<Scalars['String']['input']>;
  auditor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_lt?: InputMaybe<Scalars['String']['input']>;
  auditor_lte?: InputMaybe<Scalars['String']['input']>;
  auditor_not?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_gt?: InputMaybe<Scalars['String']['input']>;
  commentCID_gte?: InputMaybe<Scalars['String']['input']>;
  commentCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_lt?: InputMaybe<Scalars['String']['input']>;
  commentCID_lte?: InputMaybe<Scalars['String']['input']>;
  commentCID_not?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProofAudit_Filter>>>;
  proof?: InputMaybe<Scalars['String']['input']>;
  proof_?: InputMaybe<Proof_Filter>;
  proof_contains?: InputMaybe<Scalars['String']['input']>;
  proof_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proof_ends_with?: InputMaybe<Scalars['String']['input']>;
  proof_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proof_gt?: InputMaybe<Scalars['String']['input']>;
  proof_gte?: InputMaybe<Scalars['String']['input']>;
  proof_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proof_lt?: InputMaybe<Scalars['String']['input']>;
  proof_lte?: InputMaybe<Scalars['String']['input']>;
  proof_not?: InputMaybe<Scalars['String']['input']>;
  proof_not_contains?: InputMaybe<Scalars['String']['input']>;
  proof_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proof_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proof_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proof_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proof_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proof_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proof_starts_with?: InputMaybe<Scalars['String']['input']>;
  proof_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum ProofAudit_OrderBy {
  Action = 'action',
  Auditor = 'auditor',
  AuditorCertificationCid = 'auditor__certificationCid',
  AuditorDocumentCid = 'auditor__documentCid',
  AuditorId = 'auditor__id',
  AuditorProofOfAddressCid = 'auditor__proofOfAddressCid',
  AuditorRole = 'auditor__role',
  CommentCid = 'commentCID',
  Id = 'id',
  Proof = 'proof',
  ProofId = 'proof__id',
  ProofProofCid = 'proof__proofCID',
  ProofSubmittedAt = 'proof__submittedAt',
  Timestamp = 'timestamp'
}

export type ProofAudited = {
  __typename?: 'ProofAudited';
  action: Scalars['BigInt']['output'];
  auditor: User;
  blockNumber: Scalars['BigInt']['output'];
  commentCID: Scalars['String']['output'];
  id: Scalars['Int8']['output'];
  internal_id: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProofAudited_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Scalars['BigInt']['input']>;
  action_gt?: InputMaybe<Scalars['BigInt']['input']>;
  action_gte?: InputMaybe<Scalars['BigInt']['input']>;
  action_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  action_lt?: InputMaybe<Scalars['BigInt']['input']>;
  action_lte?: InputMaybe<Scalars['BigInt']['input']>;
  action_not?: InputMaybe<Scalars['BigInt']['input']>;
  action_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<ProofAudited_Filter>>>;
  auditor?: InputMaybe<Scalars['String']['input']>;
  auditor_?: InputMaybe<User_Filter>;
  auditor_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_gt?: InputMaybe<Scalars['String']['input']>;
  auditor_gte?: InputMaybe<Scalars['String']['input']>;
  auditor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_lt?: InputMaybe<Scalars['String']['input']>;
  auditor_lte?: InputMaybe<Scalars['String']['input']>;
  auditor_not?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commentCID?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_gt?: InputMaybe<Scalars['String']['input']>;
  commentCID_gte?: InputMaybe<Scalars['String']['input']>;
  commentCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_lt?: InputMaybe<Scalars['String']['input']>;
  commentCID_lte?: InputMaybe<Scalars['String']['input']>;
  commentCID_not?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  internal_id?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  internal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProofAudited_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProofAudited_OrderBy {
  Action = 'action',
  Auditor = 'auditor',
  AuditorCertificationCid = 'auditor__certificationCid',
  AuditorDocumentCid = 'auditor__documentCid',
  AuditorId = 'auditor__id',
  AuditorProofOfAddressCid = 'auditor__proofOfAddressCid',
  AuditorRole = 'auditor__role',
  BlockNumber = 'blockNumber',
  CommentCid = 'commentCID',
  Id = 'id',
  InternalId = 'internal_id',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash'
}

export type Proof_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proof_Filter>>>;
  audits_?: InputMaybe<ProofAudit_Filter>;
  developer?: InputMaybe<Scalars['String']['input']>;
  developer_?: InputMaybe<User_Filter>;
  developer_contains?: InputMaybe<Scalars['String']['input']>;
  developer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_gt?: InputMaybe<Scalars['String']['input']>;
  developer_gte?: InputMaybe<Scalars['String']['input']>;
  developer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_lt?: InputMaybe<Scalars['String']['input']>;
  developer_lte?: InputMaybe<Scalars['String']['input']>;
  developer_not?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Proof_Filter>>>;
  project?: InputMaybe<Scalars['String']['input']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']['input']>;
  project_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_gt?: InputMaybe<Scalars['String']['input']>;
  project_gte?: InputMaybe<Scalars['String']['input']>;
  project_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_lt?: InputMaybe<Scalars['String']['input']>;
  project_lte?: InputMaybe<Scalars['String']['input']>;
  project_not?: InputMaybe<Scalars['String']['input']>;
  project_not_contains?: InputMaybe<Scalars['String']['input']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofCID?: InputMaybe<Scalars['String']['input']>;
  proofCID_contains?: InputMaybe<Scalars['String']['input']>;
  proofCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proofCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  proofCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofCID_gt?: InputMaybe<Scalars['String']['input']>;
  proofCID_gte?: InputMaybe<Scalars['String']['input']>;
  proofCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proofCID_lt?: InputMaybe<Scalars['String']['input']>;
  proofCID_lte?: InputMaybe<Scalars['String']['input']>;
  proofCID_not?: InputMaybe<Scalars['String']['input']>;
  proofCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  proofCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proofCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proofCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proofCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proofCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  proofCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  submittedAt?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  submittedAt_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_not?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum Proof_OrderBy {
  Audits = 'audits',
  Developer = 'developer',
  DeveloperCertificationCid = 'developer__certificationCid',
  DeveloperDocumentCid = 'developer__documentCid',
  DeveloperId = 'developer__id',
  DeveloperProofOfAddressCid = 'developer__proofOfAddressCid',
  DeveloperRole = 'developer__role',
  Id = 'id',
  Project = 'project',
  ProjectCreatedAt = 'project__createdAt',
  ProjectId = 'project__id',
  ProjectStatus = 'project__status',
  ProofCid = 'proofCID',
  SubmittedAt = 'submittedAt'
}

export type Proposal = {
  __typename?: 'Proposal';
  description: Scalars['String']['output'];
  developer: User;
  eiaCID: Scalars['String']['output'];
  estimatedCredits: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  metadataCID: Scalars['String']['output'];
  methodology: Scalars['String']['output'];
  name: Scalars['String']['output'];
  otherDocsCID: Scalars['String']['output'];
  project?: Maybe<Project>;
  projectPlanCID: Scalars['String']['output'];
  reviews: Array<ProposalReview>;
  standard: Standard;
  status: ProposalStatus;
  submittedAt: Scalars['Timestamp']['output'];
  vintage: Scalars['Int']['output'];
};


export type ProposalReviewsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalReview_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProposalReview_Filter>;
};

export type ProposalReview = {
  __typename?: 'ProposalReview';
  action: ReviewAction;
  auditor: User;
  commentCID?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  proposal: Proposal;
  timestamp: Scalars['Timestamp']['output'];
};

export type ProposalReview_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<ReviewAction>;
  action_in?: InputMaybe<Array<ReviewAction>>;
  action_not?: InputMaybe<ReviewAction>;
  action_not_in?: InputMaybe<Array<ReviewAction>>;
  and?: InputMaybe<Array<InputMaybe<ProposalReview_Filter>>>;
  auditor?: InputMaybe<Scalars['String']['input']>;
  auditor_?: InputMaybe<User_Filter>;
  auditor_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_gt?: InputMaybe<Scalars['String']['input']>;
  auditor_gte?: InputMaybe<Scalars['String']['input']>;
  auditor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_lt?: InputMaybe<Scalars['String']['input']>;
  auditor_lte?: InputMaybe<Scalars['String']['input']>;
  auditor_not?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_gt?: InputMaybe<Scalars['String']['input']>;
  commentCID_gte?: InputMaybe<Scalars['String']['input']>;
  commentCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_lt?: InputMaybe<Scalars['String']['input']>;
  commentCID_lte?: InputMaybe<Scalars['String']['input']>;
  commentCID_not?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProposalReview_Filter>>>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_?: InputMaybe<Proposal_Filter>;
  proposal_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_gt?: InputMaybe<Scalars['String']['input']>;
  proposal_gte?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt?: InputMaybe<Scalars['String']['input']>;
  proposal_lte?: InputMaybe<Scalars['String']['input']>;
  proposal_not?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum ProposalReview_OrderBy {
  Action = 'action',
  Auditor = 'auditor',
  AuditorCertificationCid = 'auditor__certificationCid',
  AuditorDocumentCid = 'auditor__documentCid',
  AuditorId = 'auditor__id',
  AuditorProofOfAddressCid = 'auditor__proofOfAddressCid',
  AuditorRole = 'auditor__role',
  CommentCid = 'commentCID',
  Id = 'id',
  Proposal = 'proposal',
  ProposalDescription = 'proposal__description',
  ProposalEiaCid = 'proposal__eiaCID',
  ProposalEstimatedCredits = 'proposal__estimatedCredits',
  ProposalId = 'proposal__id',
  ProposalLocation = 'proposal__location',
  ProposalMetadataCid = 'proposal__metadataCID',
  ProposalMethodology = 'proposal__methodology',
  ProposalName = 'proposal__name',
  ProposalOtherDocsCid = 'proposal__otherDocsCID',
  ProposalProjectPlanCid = 'proposal__projectPlanCID',
  ProposalStandard = 'proposal__standard',
  ProposalStatus = 'proposal__status',
  ProposalSubmittedAt = 'proposal__submittedAt',
  ProposalVintage = 'proposal__vintage',
  Timestamp = 'timestamp'
}

export type ProposalReviewed = {
  __typename?: 'ProposalReviewed';
  action: Scalars['Int']['output'];
  auditor: User;
  blockNumber: Scalars['BigInt']['output'];
  commentCID: Scalars['String']['output'];
  id: Scalars['Int8']['output'];
  internal_id: Scalars['BigInt']['output'];
  timestamp: Scalars['Timestamp']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProposalReviewed_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  action?: InputMaybe<Scalars['Int']['input']>;
  action_gt?: InputMaybe<Scalars['Int']['input']>;
  action_gte?: InputMaybe<Scalars['Int']['input']>;
  action_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  action_lt?: InputMaybe<Scalars['Int']['input']>;
  action_lte?: InputMaybe<Scalars['Int']['input']>;
  action_not?: InputMaybe<Scalars['Int']['input']>;
  action_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  and?: InputMaybe<Array<InputMaybe<ProposalReviewed_Filter>>>;
  auditor?: InputMaybe<Scalars['String']['input']>;
  auditor_?: InputMaybe<User_Filter>;
  auditor_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_gt?: InputMaybe<Scalars['String']['input']>;
  auditor_gte?: InputMaybe<Scalars['String']['input']>;
  auditor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_lt?: InputMaybe<Scalars['String']['input']>;
  auditor_lte?: InputMaybe<Scalars['String']['input']>;
  auditor_not?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains?: InputMaybe<Scalars['String']['input']>;
  auditor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auditor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with?: InputMaybe<Scalars['String']['input']>;
  auditor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commentCID?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_gt?: InputMaybe<Scalars['String']['input']>;
  commentCID_gte?: InputMaybe<Scalars['String']['input']>;
  commentCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_lt?: InputMaybe<Scalars['String']['input']>;
  commentCID_lte?: InputMaybe<Scalars['String']['input']>;
  commentCID_not?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  commentCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  commentCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  internal_id?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  internal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProposalReviewed_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProposalReviewed_OrderBy {
  Action = 'action',
  Auditor = 'auditor',
  AuditorCertificationCid = 'auditor__certificationCid',
  AuditorDocumentCid = 'auditor__documentCid',
  AuditorId = 'auditor__id',
  AuditorProofOfAddressCid = 'auditor__proofOfAddressCid',
  AuditorRole = 'auditor__role',
  BlockNumber = 'blockNumber',
  CommentCid = 'commentCID',
  Id = 'id',
  InternalId = 'internal_id',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash'
}

export enum ProposalStatus {
  Approved = 'Approved',
  ChangesRequested = 'ChangesRequested',
  PendingReview = 'PendingReview',
  Rejected = 'Rejected'
}

export type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer?: InputMaybe<Scalars['String']['input']>;
  developer_?: InputMaybe<User_Filter>;
  developer_contains?: InputMaybe<Scalars['String']['input']>;
  developer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_gt?: InputMaybe<Scalars['String']['input']>;
  developer_gte?: InputMaybe<Scalars['String']['input']>;
  developer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_lt?: InputMaybe<Scalars['String']['input']>;
  developer_lte?: InputMaybe<Scalars['String']['input']>;
  developer_not?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains?: InputMaybe<Scalars['String']['input']>;
  developer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  developer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with?: InputMaybe<Scalars['String']['input']>;
  developer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eiaCID?: InputMaybe<Scalars['String']['input']>;
  eiaCID_contains?: InputMaybe<Scalars['String']['input']>;
  eiaCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  eiaCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  eiaCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eiaCID_gt?: InputMaybe<Scalars['String']['input']>;
  eiaCID_gte?: InputMaybe<Scalars['String']['input']>;
  eiaCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eiaCID_lt?: InputMaybe<Scalars['String']['input']>;
  eiaCID_lte?: InputMaybe<Scalars['String']['input']>;
  eiaCID_not?: InputMaybe<Scalars['String']['input']>;
  eiaCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  eiaCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  eiaCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  eiaCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eiaCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eiaCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  eiaCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  eiaCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  eiaCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  estimatedCredits?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedCredits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedCredits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedCredits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  estimatedCredits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedCredits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedCredits_not?: InputMaybe<Scalars['BigInt']['input']>;
  estimatedCredits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  location_contains?: InputMaybe<Scalars['String']['input']>;
  location_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  location_ends_with?: InputMaybe<Scalars['String']['input']>;
  location_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  location_gt?: InputMaybe<Scalars['String']['input']>;
  location_gte?: InputMaybe<Scalars['String']['input']>;
  location_in?: InputMaybe<Array<Scalars['String']['input']>>;
  location_lt?: InputMaybe<Scalars['String']['input']>;
  location_lte?: InputMaybe<Scalars['String']['input']>;
  location_not?: InputMaybe<Scalars['String']['input']>;
  location_not_contains?: InputMaybe<Scalars['String']['input']>;
  location_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  location_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  location_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  location_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  location_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  location_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  location_starts_with?: InputMaybe<Scalars['String']['input']>;
  location_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadataCID?: InputMaybe<Scalars['String']['input']>;
  metadataCID_contains?: InputMaybe<Scalars['String']['input']>;
  metadataCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadataCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadataCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadataCID_gt?: InputMaybe<Scalars['String']['input']>;
  metadataCID_gte?: InputMaybe<Scalars['String']['input']>;
  metadataCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataCID_lt?: InputMaybe<Scalars['String']['input']>;
  metadataCID_lte?: InputMaybe<Scalars['String']['input']>;
  metadataCID_not?: InputMaybe<Scalars['String']['input']>;
  metadataCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadataCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadataCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadataCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadataCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadataCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  metadataCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadataCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  methodology?: InputMaybe<Scalars['String']['input']>;
  methodology_contains?: InputMaybe<Scalars['String']['input']>;
  methodology_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  methodology_ends_with?: InputMaybe<Scalars['String']['input']>;
  methodology_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  methodology_gt?: InputMaybe<Scalars['String']['input']>;
  methodology_gte?: InputMaybe<Scalars['String']['input']>;
  methodology_in?: InputMaybe<Array<Scalars['String']['input']>>;
  methodology_lt?: InputMaybe<Scalars['String']['input']>;
  methodology_lte?: InputMaybe<Scalars['String']['input']>;
  methodology_not?: InputMaybe<Scalars['String']['input']>;
  methodology_not_contains?: InputMaybe<Scalars['String']['input']>;
  methodology_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  methodology_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  methodology_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  methodology_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  methodology_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  methodology_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  methodology_starts_with?: InputMaybe<Scalars['String']['input']>;
  methodology_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  otherDocsCID?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_contains?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_gt?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_gte?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otherDocsCID_lt?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_lte?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_not?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otherDocsCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  otherDocsCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_contains?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_ends_with?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_gt?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_gte?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_in?: InputMaybe<Array<Scalars['String']['input']>>;
  projectPlanCID_lt?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_lte?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_not?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_not_contains?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  projectPlanCID_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_starts_with?: InputMaybe<Scalars['String']['input']>;
  projectPlanCID_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_?: InputMaybe<Project_Filter>;
  reviews_?: InputMaybe<ProposalReview_Filter>;
  standard?: InputMaybe<Standard>;
  standard_in?: InputMaybe<Array<Standard>>;
  standard_not?: InputMaybe<Standard>;
  standard_not_in?: InputMaybe<Array<Standard>>;
  status?: InputMaybe<ProposalStatus>;
  status_in?: InputMaybe<Array<ProposalStatus>>;
  status_not?: InputMaybe<ProposalStatus>;
  status_not_in?: InputMaybe<Array<ProposalStatus>>;
  submittedAt?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  submittedAt_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_not?: InputMaybe<Scalars['Timestamp']['input']>;
  submittedAt_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  vintage?: InputMaybe<Scalars['Int']['input']>;
  vintage_gt?: InputMaybe<Scalars['Int']['input']>;
  vintage_gte?: InputMaybe<Scalars['Int']['input']>;
  vintage_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  vintage_lt?: InputMaybe<Scalars['Int']['input']>;
  vintage_lte?: InputMaybe<Scalars['Int']['input']>;
  vintage_not?: InputMaybe<Scalars['Int']['input']>;
  vintage_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum Proposal_OrderBy {
  Description = 'description',
  Developer = 'developer',
  DeveloperCertificationCid = 'developer__certificationCid',
  DeveloperDocumentCid = 'developer__documentCid',
  DeveloperId = 'developer__id',
  DeveloperProofOfAddressCid = 'developer__proofOfAddressCid',
  DeveloperRole = 'developer__role',
  EiaCid = 'eiaCID',
  EstimatedCredits = 'estimatedCredits',
  Id = 'id',
  Location = 'location',
  MetadataCid = 'metadataCID',
  Methodology = 'methodology',
  Name = 'name',
  OtherDocsCid = 'otherDocsCID',
  Project = 'project',
  ProjectPlanCid = 'projectPlanCID',
  ProjectCreatedAt = 'project__createdAt',
  ProjectId = 'project__id',
  ProjectStatus = 'project__status',
  Reviews = 'reviews',
  Standard = 'standard',
  Status = 'status',
  SubmittedAt = 'submittedAt',
  Vintage = 'vintage'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  creditBalance?: Maybe<CreditBalance>;
  creditBalances: Array<CreditBalance>;
  creditBatch?: Maybe<CreditBatch>;
  creditBatches: Array<CreditBatch>;
  creditsIssued?: Maybe<CreditsIssued>;
  creditsIssueds: Array<CreditsIssued>;
  creditsRetired?: Maybe<CreditsRetired>;
  creditsRetireds: Array<CreditsRetired>;
  /** Collection of aggregated `DailyCreditStats` values */
  dailyCreditStats_collection: Array<DailyCreditStats>;
  /** Collection of aggregated `DailyMarketplaceListingStats` values */
  dailyMarketplaceListingStats_collection: Array<DailyMarketplaceListingStats>;
  /** Collection of aggregated `DailyMarketplaceStats` values */
  dailyMarketplaceStats_collection: Array<DailyMarketplaceStats>;
  /** Collection of aggregated `DailyProjectStats` values */
  dailyProjectStats_collection: Array<DailyProjectStats>;
  /** Collection of aggregated `DailyProofStats` values */
  dailyProofStats_collection: Array<DailyProofStats>;
  /** Collection of aggregated `DailyRetirementStats` values */
  dailyRetirementStats_collection: Array<DailyRetirementStats>;
  /** Collection of aggregated `DailyReviewStats` values */
  dailyReviewStats_collection: Array<DailyReviewStats>;
  /** Collection of aggregated `DailyTransactionStats` values */
  dailyTransactionStats_collection: Array<DailyTransactionStats>;
  listed?: Maybe<Listed>;
  listeds: Array<Listed>;
  marketplaceListing?: Maybe<MarketplaceListing>;
  marketplaceListings: Array<MarketplaceListing>;
  marketplacePurchase?: Maybe<MarketplacePurchase>;
  marketplacePurchases: Array<MarketplacePurchase>;
  project?: Maybe<Project>;
  projectProposed?: Maybe<ProjectProposed>;
  projectProposeds: Array<ProjectProposed>;
  projects: Array<Project>;
  proof?: Maybe<Proof>;
  proofAudit?: Maybe<ProofAudit>;
  proofAudited?: Maybe<ProofAudited>;
  proofAuditeds: Array<ProofAudited>;
  proofAudits: Array<ProofAudit>;
  proofs: Array<Proof>;
  proposal?: Maybe<Proposal>;
  proposalReview?: Maybe<ProposalReview>;
  proposalReviewed?: Maybe<ProposalReviewed>;
  proposalRevieweds: Array<ProposalReviewed>;
  proposalReviews: Array<ProposalReview>;
  proposals: Array<Proposal>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryCreditBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCreditBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CreditBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CreditBalance_Filter>;
};


export type QueryCreditBatchArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCreditBatchesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CreditBatch_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CreditBatch_Filter>;
};


export type QueryCreditsIssuedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCreditsIssuedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CreditsIssued_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CreditsIssued_Filter>;
};


export type QueryCreditsRetiredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCreditsRetiredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CreditsRetired_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CreditsRetired_Filter>;
};


export type QueryDailyCreditStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyCreditStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyCreditStats_Filter>;
};


export type QueryDailyMarketplaceListingStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyMarketplaceListingStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyMarketplaceListingStats_Filter>;
};


export type QueryDailyMarketplaceStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyMarketplaceStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyMarketplaceStats_Filter>;
};


export type QueryDailyProjectStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyProjectStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyProjectStats_Filter>;
};


export type QueryDailyProofStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyProofStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyProofStats_Filter>;
};


export type QueryDailyRetirementStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyRetirementStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyRetirementStats_Filter>;
};


export type QueryDailyReviewStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyReviewStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyReviewStats_Filter>;
};


export type QueryDailyTransactionStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  interval: Aggregation_Interval;
  orderBy?: InputMaybe<DailyTransactionStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyTransactionStats_Filter>;
};


export type QueryListedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryListedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Listed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Listed_Filter>;
};


export type QueryMarketplaceListingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketplaceListingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketplaceListing_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketplaceListing_Filter>;
};


export type QueryMarketplacePurchaseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketplacePurchasesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketplacePurchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketplacePurchase_Filter>;
};


export type QueryProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectProposedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectProposedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectProposed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectProposed_Filter>;
};


export type QueryProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type QueryProofArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProofAuditArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProofAuditedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProofAuditedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProofAudited_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProofAudited_Filter>;
};


export type QueryProofAuditsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProofAudit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProofAudit_Filter>;
};


export type QueryProofsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proof_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proof_Filter>;
};


export type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalReviewArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalReviewedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalReviewedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalReviewed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalReviewed_Filter>;
};


export type QueryProposalReviewsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalReview_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalReview_Filter>;
};


export type QueryProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export enum ReviewAction {
  Approve = 'Approve',
  Reject = 'Reject',
  RequestChanges = 'RequestChanges'
}

export enum Role {
  Auditor = 'Auditor',
  Developer = 'Developer',
  Public = 'Public'
}

export enum Standard {
  GoldStandard = 'GoldStandard',
  Shariah = 'Shariah',
  Vcs = 'VCS'
}

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt']['output'];
  from: Scalars['Bytes']['output'];
  id: Scalars['Int8']['output'];
  timestamp: Scalars['Timestamp']['output'];
  to: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  TokenId = 'tokenId',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type User = {
  __typename?: 'User';
  certificationCid?: Maybe<Scalars['String']['output']>;
  creditBalances: Array<CreditBalance>;
  documentCid?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  proofOfAddressCid?: Maybe<Scalars['String']['output']>;
  proofs: Array<Proof>;
  proposals: Array<Proposal>;
  reviews: Array<ProposalReview>;
  role: Role;
};


export type UserCreditBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CreditBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CreditBalance_Filter>;
};


export type UserProofsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proof_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Proof_Filter>;
};


export type UserProposalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Proposal_Filter>;
};


export type UserReviewsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalReview_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProposalReview_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  certificationCid?: InputMaybe<Scalars['String']['input']>;
  certificationCid_contains?: InputMaybe<Scalars['String']['input']>;
  certificationCid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  certificationCid_ends_with?: InputMaybe<Scalars['String']['input']>;
  certificationCid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  certificationCid_gt?: InputMaybe<Scalars['String']['input']>;
  certificationCid_gte?: InputMaybe<Scalars['String']['input']>;
  certificationCid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  certificationCid_lt?: InputMaybe<Scalars['String']['input']>;
  certificationCid_lte?: InputMaybe<Scalars['String']['input']>;
  certificationCid_not?: InputMaybe<Scalars['String']['input']>;
  certificationCid_not_contains?: InputMaybe<Scalars['String']['input']>;
  certificationCid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  certificationCid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  certificationCid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  certificationCid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  certificationCid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  certificationCid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  certificationCid_starts_with?: InputMaybe<Scalars['String']['input']>;
  certificationCid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creditBalances_?: InputMaybe<CreditBalance_Filter>;
  documentCid?: InputMaybe<Scalars['String']['input']>;
  documentCid_contains?: InputMaybe<Scalars['String']['input']>;
  documentCid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  documentCid_ends_with?: InputMaybe<Scalars['String']['input']>;
  documentCid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  documentCid_gt?: InputMaybe<Scalars['String']['input']>;
  documentCid_gte?: InputMaybe<Scalars['String']['input']>;
  documentCid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  documentCid_lt?: InputMaybe<Scalars['String']['input']>;
  documentCid_lte?: InputMaybe<Scalars['String']['input']>;
  documentCid_not?: InputMaybe<Scalars['String']['input']>;
  documentCid_not_contains?: InputMaybe<Scalars['String']['input']>;
  documentCid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  documentCid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  documentCid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  documentCid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  documentCid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  documentCid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  documentCid_starts_with?: InputMaybe<Scalars['String']['input']>;
  documentCid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  proofOfAddressCid?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_contains?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_ends_with?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_gt?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_gte?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proofOfAddressCid_lt?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_lte?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_not?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_not_contains?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proofOfAddressCid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_starts_with?: InputMaybe<Scalars['String']['input']>;
  proofOfAddressCid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proofs_?: InputMaybe<Proof_Filter>;
  proposals_?: InputMaybe<Proposal_Filter>;
  reviews_?: InputMaybe<ProposalReview_Filter>;
  role?: InputMaybe<Role>;
  role_in?: InputMaybe<Array<Role>>;
  role_not?: InputMaybe<Role>;
  role_not_in?: InputMaybe<Array<Role>>;
};

export enum User_OrderBy {
  CertificationCid = 'certificationCid',
  CreditBalances = 'creditBalances',
  DocumentCid = 'documentCid',
  Id = 'id',
  ProofOfAddressCid = 'proofOfAddressCid',
  Proofs = 'proofs',
  Proposals = 'proposals',
  Reviews = 'reviews',
  Role = 'role'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type MarketplaceListingsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  status_in?: InputMaybe<Array<ListingStatus> | ListingStatus>;
  seller: Scalars['String']['input'];
}>;


export type MarketplaceListingsQuery = { __typename?: 'Query', marketplaceListings: Array<{ __typename?: 'MarketplaceListing', id: string, amount: any, remaining: any, pricePerUnit: any, startTime?: any | null, endTime?: any | null, status: ListingStatus, createdAt: any, updatedAt: any, seller: { __typename?: 'User', id: string }, token: { __typename?: 'CreditBatch', id: string, amount: any, retiredAmount: any, tokenURI: string, project?: { __typename?: 'Project', proposal: { __typename?: 'Proposal', name: string } } | null }, purchases: Array<{ __typename?: 'MarketplacePurchase', id: any, quantity: any, totalPaid: any, feePaid: any, timestamp: any, buyer: { __typename?: 'User', id: string } }> }> };

export type PublicMarketplaceListingsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
  orderBy?: InputMaybe<MarketplaceListing_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  now: Scalars['Timestamp']['input'];
}>;


export type PublicMarketplaceListingsQuery = { __typename?: 'Query', marketplaceListings: Array<{ __typename?: 'MarketplaceListing', id: string, amount: any, remaining: any, pricePerUnit: any, endTime?: any | null, status: ListingStatus, token: { __typename?: 'CreditBatch', id: string, tokenURI: string, project?: { __typename?: 'Project', id: string, proposal: { __typename?: 'Proposal', name: string, standard: Standard } } | null }, seller: { __typename?: 'User', id: string } }> };

export type ProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, status: ProjectStatus, createdAt: any, proposal: { __typename?: 'Proposal', description: string, id: string, name: string, standard: Standard, location: string, methodology: string, projectPlanCID: string, eiaCID: string, estimatedCredits: any, otherDocsCID: string, vintage: number, developer: { __typename?: 'User', role: Role, id: string } } } | null };

export type ProjectsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  developer?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<ProjectStatus> | ProjectStatus>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, status: ProjectStatus, createdAt: any, proposal: { __typename?: 'Proposal', description: string, id: string, name: string, standard: Standard } }> };

export type ProofQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProofQuery = { __typename?: 'Query', proof?: { __typename?: 'Proof', proofCID: string, submittedAt: any, id: string, audits: Array<{ __typename?: 'ProofAudit', commentCID?: string | null, id: string, action: ReviewAction, timestamp: any, auditor: { __typename?: 'User', id: string } }>, project: { __typename?: 'Project', proposal: { __typename?: 'Proposal', location: string, methodology: string, standard: Standard, vintage: number, estimatedCredits: any, name: string, id: string } } } | null };

export type ProjectsWithProofQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  developer?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  standard_in?: InputMaybe<Array<Standard> | Standard>;
}>;


export type ProjectsWithProofQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', proofs: Array<{ __typename?: 'Proof', id: string, proofCID: string, submittedAt: any }>, proposal: { __typename?: 'Proposal', name: string, standard: Standard, estimatedCredits: any, developer: { __typename?: 'User', id: string } } }> };

export type AuditorFeedbackFieldsFragment = { __typename?: 'ProposalReview', id: string, timestamp: any, commentCID?: string | null, auditor: { __typename?: 'User', id: string } } & { ' $fragmentName'?: 'AuditorFeedbackFieldsFragment' };

export type ProposalQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProposalQuery = { __typename?: 'Query', proposal?: { __typename?: 'Proposal', description: string, eiaCID: string, estimatedCredits: any, id: string, location: string, metadataCID: string, methodology: string, name: string, otherDocsCID: string, projectPlanCID: string, standard: Standard, status: ProposalStatus, vintage: number, submittedAt: any, reviews: Array<(
      { __typename?: 'ProposalReview' }
      & { ' $fragmentRefs'?: { 'AuditorFeedbackFieldsFragment': AuditorFeedbackFieldsFragment } }
    )>, developer: { __typename?: 'User', id: string } } | null };

export type ProposalsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  developer?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<ProposalStatus> | ProposalStatus>;
  standard_in?: InputMaybe<Array<Standard> | Standard>;
}>;


export type ProposalsQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', id: string, name: string, description: string, location: string, estimatedCredits: any, vintage: number, methodology: string, projectPlanCID: string, eiaCID: string, otherDocsCID: string, metadataCID: string, standard: Standard, status: ProposalStatus, submittedAt: any, developer: { __typename?: 'User', id: string } }> };

export type ProposalReviewsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  auditor?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProposalReviewsQuery = { __typename?: 'Query', proposalRevieweds: Array<{ __typename?: 'ProposalReviewed', id: any, timestamp: any, auditor: { __typename?: 'User', id: string, reviews: Array<{ __typename?: 'ProposalReview', action: ReviewAction, timestamp: any, proposal: { __typename?: 'Proposal', id: string, name: string, submittedAt: any, developer: { __typename?: 'User', id: string } } }> } }> };

export type ProofAuditsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  auditor?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProofAuditsQuery = { __typename?: 'Query', proofAudits: Array<{ __typename?: 'ProofAudit', action: ReviewAction, id: string, timestamp: any, proof: { __typename?: 'Proof', id: string, submittedAt: any, project: { __typename?: 'Project', proposal: { __typename?: 'Proposal', name: string } }, developer: { __typename?: 'User', id: string } } }> };

export type PublicStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicStatsQuery = { __typename?: 'Query', dailyCreditStats: Array<{ __typename?: 'DailyCreditStats', id: any, timestamp: any, total: any }>, dailyRetirementStats: Array<{ __typename?: 'DailyRetirementStats', id: any, timestamp: any, total: any, count: any }>, dailyMarketplaceStats: Array<{ __typename?: 'DailyMarketplaceStats', id: any, timestamp: any, dailyVolume: any, dailyPurchases: any, dailyFees: any }>, dailyTransactionStats: Array<{ __typename?: 'DailyTransactionStats', id: any, timestamp: any, count: any }> };

export type DailyCreditStatsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type DailyCreditStatsQuery = { __typename?: 'Query', dailyCreditStats_collection: Array<{ __typename?: 'DailyCreditStats', id: any, timestamp: any, total: any }> };

export type DailyRetirementStatsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type DailyRetirementStatsQuery = { __typename?: 'Query', dailyRetirementStats_collection: Array<{ __typename?: 'DailyRetirementStats', id: any, timestamp: any, total: any, count: any }> };

export type DailyMarketplaceStatsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type DailyMarketplaceStatsQuery = { __typename?: 'Query', dailyMarketplaceStats_collection: Array<{ __typename?: 'DailyMarketplaceStats', id: any, timestamp: any, dailyVolume: any, dailyPurchases: any, dailyFees: any }> };

export type DailyTransactionStatsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type DailyTransactionStatsQuery = { __typename?: 'Query', dailyTransactionStats_collection: Array<{ __typename?: 'DailyTransactionStats', id: any, timestamp: any, count: any }> };

export type DeveloperStatsQueryVariables = Exact<{
  developer: Scalars['String']['input'];
}>;


export type DeveloperStatsQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', id: string, name: string, description: string, status: ProposalStatus, submittedAt: any, vintage: number, methodology: string }>, creditsIssueds: Array<{ __typename?: 'CreditsIssued', id: any, tokenId: any, amount: any, tokenURI: string, timestamp: any, transactionHash: any }>, creditBatches: Array<{ __typename?: 'CreditBatch', id: string, tokenURI: string, amount: any, issuedAt: any, retiredAmount: any, project?: { __typename?: 'Project', id: string, proposal: { __typename?: 'Proposal', name: string } } | null }>, marketplaceListings: Array<{ __typename?: 'MarketplaceListing', id: string, remaining: any, pricePerUnit: any, startTime?: any | null, endTime?: any | null, token: { __typename?: 'CreditBatch', id: string, tokenURI: string, amount: any, retiredAmount: any } }>, marketplacePurchases: Array<{ __typename?: 'MarketplacePurchase', id: any, quantity: any, totalPaid: any, feePaid: any, timestamp: any, buyer: { __typename?: 'User', id: string }, listing: { __typename?: 'MarketplaceListing', id: string, token: { __typename?: 'CreditBatch', id: string, tokenURI: string } } }> };

export type AuditorStatsQueryVariables = Exact<{
  auditor: Scalars['String']['input'];
}>;


export type AuditorStatsQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', id: string, name: string, status: ProposalStatus, submittedAt: any, developer: { __typename?: 'User', id: string } }>, proofs: Array<{ __typename?: 'Proof', id: string, submittedAt: any, project: { __typename?: 'Project', id: string, status: ProjectStatus, proposal: { __typename?: 'Proposal', name: string } } }>, proposalReviews: Array<{ __typename?: 'ProposalReview', action: ReviewAction, commentCID?: string | null, id: string }>, proofAudits: Array<{ __typename?: 'ProofAudit', action: ReviewAction, commentCID?: string | null, id: string }> };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, role: Role, documentCid?: string | null, proofOfAddressCid?: string | null } | null };

export type UserCreditsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type UserCreditsQuery = { __typename?: 'Query', user?: { __typename?: 'User', creditBalances: Array<{ __typename?: 'CreditBalance', balance: any, id: string, batch: { __typename?: 'CreditBatch', id: string, project?: { __typename?: 'Project', proposal: { __typename?: 'Proposal', vintage: number, name: string } } | null } }> } | null };

export type UserRetiredCreditsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type UserRetiredCreditsQuery = { __typename?: 'Query', creditsRetireds: Array<{ __typename?: 'CreditsRetired', amount: any, blockNumber: any, id: any, retirementCID?: string | null, timestamp: any, tokenId: any, transactionHash: any }> };

export const AuditorFeedbackFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuditorFeedbackFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProposalReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"commentCID"}},{"kind":"Field","name":{"kind":"Name","value":"auditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AuditorFeedbackFieldsFragment, unknown>;
export const MarketplaceListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketplaceListings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListingStatus"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seller"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketplaceListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"createdAt"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status_in"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"seller"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seller"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"retiredAmount"}},{"kind":"Field","name":{"kind":"Name","value":"tokenURI"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"remaining"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"purchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buyer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"totalPaid"}},{"kind":"Field","name":{"kind":"Name","value":"feePaid"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<MarketplaceListingsQuery, MarketplaceListingsQueryVariables>;
export const PublicMarketplaceListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicMarketplaceListings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MarketplaceListing_orderBy"}},"defaultValue":{"kind":"EnumValue","value":"createdAt"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}},"defaultValue":{"kind":"EnumValue","value":"desc"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"now"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Timestamp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketplaceListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status_in"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"Active"}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"endTime_gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"now"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenURI"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"remaining"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PublicMarketplaceListingsQuery, PublicMarketplaceListingsQueryVariables>;
export const ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"methodology"}},{"kind":"Field","name":{"kind":"Name","value":"projectPlanCID"}},{"kind":"Field","name":{"kind":"Name","value":"eiaCID"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCredits"}},{"kind":"Field","name":{"kind":"Name","value":"otherDocsCID"}},{"kind":"Field","name":{"kind":"Name","value":"vintage"}},{"kind":"Field","name":{"kind":"Name","value":"developer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"developer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectStatus"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"developer_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status_in"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"proposal_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"createdAt"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const ProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proof"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofCID"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"audits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentCID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"auditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"methodology"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"vintage"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCredits"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProofQuery, ProofQueryVariables>;
export const ProjectsWithProofDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectsWithProof"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"developer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"standard_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Standard"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"ProofSubmitted"}},{"kind":"ObjectField","name":{"kind":"Name","value":"proposal_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"standard_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"standard_in"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"developer_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proofCID"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"developer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCredits"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsWithProofQuery, ProjectsWithProofQueryVariables>;
export const ProposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eiaCID"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCredits"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"metadataCID"}},{"kind":"Field","name":{"kind":"Name","value":"methodology"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otherDocsCID"}},{"kind":"Field","name":{"kind":"Name","value":"projectPlanCID"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuditorFeedbackFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vintage"}},{"kind":"Field","name":{"kind":"Name","value":"developer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuditorFeedbackFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProposalReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"commentCID"}},{"kind":"Field","name":{"kind":"Name","value":"auditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProposalQuery, ProposalQueryVariables>;
export const ProposalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proposals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"developer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProposalStatus"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"standard_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Standard"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"developer_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status_in"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"standard_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"standard_in"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"submittedAt"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"developer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedCredits"}},{"kind":"Field","name":{"kind":"Name","value":"vintage"}},{"kind":"Field","name":{"kind":"Name","value":"methodology"}},{"kind":"Field","name":{"kind":"Name","value":"projectPlanCID"}},{"kind":"Field","name":{"kind":"Name","value":"eiaCID"}},{"kind":"Field","name":{"kind":"Name","value":"otherDocsCID"}},{"kind":"Field","name":{"kind":"Name","value":"metadataCID"}},{"kind":"Field","name":{"kind":"Name","value":"standard"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}}]}}]}}]} as unknown as DocumentNode<ProposalsQuery, ProposalsQueryVariables>;
export const ProposalReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProposalReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auditor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposalRevieweds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"auditor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auditor"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"auditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"developer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProposalReviewsQuery, ProposalReviewsQueryVariables>;
export const ProofAuditsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProofAudits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auditor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proofAudits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"auditor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auditor"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"proof"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"developer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProofAuditsQuery, ProofAuditsQueryVariables>;
export const PublicStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"dailyCreditStats"},"name":{"kind":"Name","value":"dailyCreditStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"dailyRetirementStats"},"name":{"kind":"Name","value":"dailyRetirementStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"dailyMarketplaceStats"},"name":{"kind":"Name","value":"dailyMarketplaceStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"dailyVolume"}},{"kind":"Field","name":{"kind":"Name","value":"dailyPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"dailyFees"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"dailyTransactionStats"},"name":{"kind":"Name","value":"dailyTransactionStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<PublicStatsQuery, PublicStatsQueryVariables>;
export const DailyCreditStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DailyCreditStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyCreditStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<DailyCreditStatsQuery, DailyCreditStatsQueryVariables>;
export const DailyRetirementStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DailyRetirementStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyRetirementStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<DailyRetirementStatsQuery, DailyRetirementStatsQueryVariables>;
export const DailyMarketplaceStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DailyMarketplaceStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyMarketplaceStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"dailyVolume"}},{"kind":"Field","name":{"kind":"Name","value":"dailyPurchases"}},{"kind":"Field","name":{"kind":"Name","value":"dailyFees"}}]}}]}}]} as unknown as DocumentNode<DailyMarketplaceStatsQuery, DailyMarketplaceStatsQueryVariables>;
export const DailyTransactionStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DailyTransactionStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyTransactionStats_collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"interval"},"value":{"kind":"EnumValue","value":"day"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<DailyTransactionStatsQuery, DailyTransactionStatsQueryVariables>;
export const DeveloperStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DeveloperStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"developer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"developer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"submittedAt"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vintage"}},{"kind":"Field","name":{"kind":"Name","value":"methodology"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creditsIssueds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"developer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"tokenURI"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creditBatches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"developer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"issuedAt"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenURI"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"retiredAmount"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"marketplaceListings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"seller"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"Active"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"createdAt"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenURI"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"retiredAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remaining"}},{"kind":"Field","name":{"kind":"Name","value":"pricePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"marketplacePurchases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"listing_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"seller"},"value":{"kind":"Variable","name":{"kind":"Name","value":"developer"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buyer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"listing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenURI"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"totalPaid"}},{"kind":"Field","name":{"kind":"Name","value":"feePaid"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<DeveloperStatsQuery, DeveloperStatsQueryVariables>;
export const AuditorStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuditorStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"auditor"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"developer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proofs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proposalReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"auditor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auditor"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"commentCID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proofAudits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"auditor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"auditor"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"commentCID"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AuditorStatsQuery, AuditorStatsQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"documentCid"}},{"kind":"Field","name":{"kind":"Name","value":"proofOfAddressCid"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UserCreditsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCredits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creditBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"balance_not"},"value":{"kind":"StringValue","value":"0","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"batch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vintage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserCreditsQuery, UserCreditsQueryVariables>;
export const UserRetiredCreditsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRetiredCredits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creditsRetireds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"holder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"retirementCID"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"transactionHash"}}]}}]}}]} as unknown as DocumentNode<UserRetiredCreditsQuery, UserRetiredCreditsQueryVariables>;