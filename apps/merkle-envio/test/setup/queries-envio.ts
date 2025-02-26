import { gql } from "graphql-request";
import * as F from "./fragments";

export const getCampaigns_ByAdminByIds = gql/* GraphQL */ `
  query getCampaigns_ByAdminByIds(
    $first: Int!
    $skip: Int!
    $admin: String!
    $airstreamIds: [String!]
    $subgraphId: numeric!
    $chainId: numeric!
  ) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { admin: { _eq: $admin } }
          { id: { _in: $airstreamIds } }
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getCampaigns_ByAdminByAsset = gql/* GraphQL */ `
  query getCampaigns_ByAdminByAsset(
    $first: Int!
    $skip: Int!
    $admin: String!
    $asset: String!
    $subgraphId: numeric!
    $chainId: numeric!
  ) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { admin: { _eq: $admin } }
          { asset: { _iregex: $asset } }
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getCampaigns_ByAdmin = gql/* GraphQL */ `
  query getCampaigns_ByAdmin(
    $first: Int!
    $skip: Int!
    $admin: String!
    $subgraphId: numeric!
    $chainId: numeric!
    $asset: String # Required for compatibility
  ) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { admin: { _eq: $admin } }
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getCampaigns_ByIds = gql/* GraphQL */ `
  query getCampaigns_ByIds(
    $first: Int!
    $skip: Int!
    $airstreamIds: [String!]
    $subgraphId: numeric!
    $chainId: numeric!
    $asset: String # Required for compatibility
  ) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { id: { _in: $airstreamIds } }
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getCampaigns_ByAsset = gql/* GraphQL */ `
  query getCampaigns_ByAsset(
    $first: Int!
    $skip: Int!
    $asset: String!
    $subgraphId: numeric!
    $chainId: numeric!
  ) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { asset: { _iregex: $asset } }
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getCampaigns = gql/* GraphQL */ `
  query getCampaigns(
    $first: Int!
    $skip: Int!
    $subgraphId: numeric!
    $chainId: numeric!
    $asset: String # Required for compatibility
  ) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getCampaigns_Asc = gql/* GraphQL */ `
  query getCampaigns($first: Int!, $skip: Int!, $chainId: numeric!) {
    Campaign(
      limit: $first
      offset: $skip
      distinct_on: [subgraphId]
      order_by: { subgraphId: asc }
      where: { chainId: { _eq: $chainId } }
    ) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getCampaignById = gql/* GraphQL */ `
  query getCampaignById($airstreamId: String!) {
    Campaign(where: { id: { _eq: $airstreamId } }) {
      ...CampaignFragment
    }
  }

  ${F.CampaignFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;

export const getActions_ByCampaign = gql/* GraphQL */ `
  query getActions_ByCampaign(
    $first: Int!
    $airstreamId: String!
    $subgraphId: numeric!
    $chainId: numeric!
  ) {
    Action(
      limit: $first
      distinct_on: [subgraphId]
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { campaign: { _eq: $airstreamId } }
          { subgraphId: { _lt: $subgraphId } }
          { chainId: { _eq: $chainId } }
        ]
      }
    ) {
      ...ActionFragment
      campaignObject {
        id
        assetObject {
          ...AssetFragment
        }
      }
    }
  }

  ${F.ActionFragment_Envio}
  ${F.AssetFragment_Envio}
`;

export const getMetadata_ByCampaign = gql/* GraphQL */ `
  query getMetadata_ByCampaign(
    $campaignId: String!
    $campaignIdClone: String!
    $dayFrom: numeric!
    $dayTo: numeric!
  ) {
    Campaign(where: { id: { _eq: $campaignId } }) {
      id
      assetObject {
        ...AssetFragment
      }
      activities(
        limit: 7
        where: { _and: [{ day: { _gte: $dayFrom, _lte: $dayTo } }] }
      ) {
        ...ActivityFragment
      }
      actions(limit: 5, order_by: { subgraphId: desc }) {
        ...ActionFragment
      }
    }
    Action(
      limit: 10
      order_by: { subgraphId: desc }
      where: {
        _and: [
          { campaign: { _eq: $campaignIdClone } }
          { category: { _eq: "Claim" } }
        ]
      }
    ) {
      ...ActionFragment
    }
  }
  ${F.CampaignFragment_Envio}
  ${F.ActionFragment_Envio}
  ${F.ActivityFragment_Envio}
  ${F.AssetFragment_Envio}
  ${F.FactoryFragment_Envio}
`;
