import { gql } from "graphql-request";
import * as F from "./fragments";

export const getCampaigns_ByAdminByIds = gql/* GraphQL */ `
  query getCampaigns_ByAdminByIds(
    $first: Int!
    $skip: Int!
    $admin: Bytes!
    $airstreamIds: [String!]
    $subgraphId: BigInt!
    $chainId: BigInt!
  ) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: {
        and: [
          { admin: $admin }
          { id_in: $airstreamIds }
          { subgraphId_lt: $subgraphId }
          { chainId: $chainId }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getCampaigns_ByAdminByAsset = gql/* GraphQL */ `
  query getCampaigns_ByAdminByAsset(
    $first: Int!
    $skip: Int!
    $admin: Bytes!
    $asset: String!
    $subgraphId: BigInt!
    $chainId: BigInt!
  ) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: {
        and: [
          { admin: $admin }
          { asset: $asset }
          { subgraphId_lt: $subgraphId }
          { chainId: $chainId }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getCampaigns_ByAdmin = gql/* GraphQL */ `
  query getCampaigns_ByAdmin(
    $first: Int!
    $skip: Int!
    $admin: Bytes!
    $subgraphId: BigInt!
    $chainId: BigInt!
  ) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: {
        and: [
          { admin: $admin }
          { subgraphId_lt: $subgraphId }
          { chainId: $chainId }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getCampaigns_ByIds = gql/* GraphQL */ `
  query getCampaigns_ByIds(
    $first: Int!
    $skip: Int!
    $airstreamIds: [String!]
    $subgraphId: BigInt!
    $chainId: BigInt!
  ) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: {
        id_in: $airstreamIds
        subgraphId_lt: $subgraphId
        chainId: $chainId
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getCampaigns_ByAsset = gql/* GraphQL */ `
  query getCampaigns_ByAsset(
    $first: Int!
    $skip: Int!
    $asset: String!
    $subgraphId: BigInt!
    $chainId: BigInt!
  ) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: { asset: $asset, subgraphId_lt: $subgraphId, chainId: $chainId }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getCampaigns = gql/* GraphQL */ `
  query getCampaigns($first: Int!, $skip: Int!, $subgraphId: BigInt!) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: desc
      where: { subgraphId_lt: $subgraphId }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getCampaigns_Asc = gql/* GraphQL */ `
  query getCampaigns($first: Int!, $skip: Int!, $chainId: Int!) {
    campaigns(
      first: $first
      skip: $skip
      orderBy: subgraphId
      orderDirection: asc
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getCampaignById = gql/* GraphQL */ `
  query getCampaignById($airstreamId: ID!) {
    campaign(id: $airstreamId) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;

export const getActions_ByCampaign = gql/* GraphQL */ `
  query getActions_ByCampaign(
    $first: Int!
    $airstreamId: String!
    $subgraphId: BigInt!
    $chainId: BigInt!
  ) {
    actions(
      first: $first
      orderBy: subgraphId
      orderDirection: desc
      where: {
        campaign: $airstreamId
        subgraphId_lt: $subgraphId
        chainId: $chainId
      }
    ) {
      ...ActionFragment
      campaign {
        id
        asset {
          ...AssetFragment
        }
      }
    }
  }

  ${F.ActionFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
`;

export const getMetadata_ByCampaign = gql/* GraphQL */ `
  query getMetadata_ByCampaign(
    $campaignId: ID!
    $campaignIdClone: String!
    $dayFrom: BigInt!
    $dayTo: BigInt!
  ) {
    campaign(id: $campaignId) {
      id
      asset {
        ...AssetFragment
      }
      activities(first: 7, where: { day_gte: $dayFrom, day_lte: $dayTo }) {
        ...ActivityFragment
      }
      actions(first: 5, orderBy: subgraphId, orderDirection: desc) {
        ...ActionFragment
      }
    }
    actions(
      first: 10
      orderBy: subgraphId
      orderDirection: desc
      where: { campaign: $campaignIdClone, category: Claim }
    ) {
      ...ActionFragment
    }
  }

  ${F.CampaignFragment_TheGraph}
  ${F.ActionFragment_TheGraph}
  ${F.ActivityFragment_TheGraph}
  ${F.AssetFragment_TheGraph}
  ${F.FactoryFragment_TheGraph}
`;
