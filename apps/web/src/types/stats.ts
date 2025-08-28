export interface DeveloperStats {
  totalProjects: number;
  approvedProjects: number;
  pendingProjects: number;
  totalCreditsIssued: number;
  retiredCredits: number;
  activeListings: number;
  totalSales: number;
  totalUnitsSold: number;
}

export interface AuditorStats {
  totalProposals: number;
  pendingProposals: number;
  totalProofs: number;
  pendingProofs: number;
  totalReviews: number;
  approvals: number;
  rejections: number;
  proofApprovals: number;
}

export interface PublicStats {
  totalCreditsIssued: number;
  retiredCredits: number;
  totalMarketplaceVolume: number;
  totalTransactions: number;

  creditStats:
    | {
        __typename?: 'DailyCreditStats' | undefined;
        id: any;
        timestamp: any;
        total: any;
      }[]
    | undefined;
  retirementStats:
    | {
        __typename?: 'DailyRetirementStats' | undefined;
        id: any;
        timestamp: any;
        total: any;
        count: any;
      }[]
    | undefined;
  marketStats:
    | {
        __typename?: 'DailyMarketplaceStats' | undefined;
        id: any;
        timestamp: any;
        dailyVolume: any;
        dailyPurchases: any;
        dailyFees: any;
      }[]
    | undefined;
  txStats:
    | {
        __typename?: 'DailyTransactionStats' | undefined;
        id: any;
        timestamp: any;
        count: any;
      }[]
    | undefined;
}
