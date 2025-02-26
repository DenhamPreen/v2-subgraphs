import { gql } from "graphql-request";

export const ActionFragment_Envio = gql/* GraphQL */ `
  fragment ActionFragment on Action {
    id
    chainId
    subgraphId
    campaignObject {
      id
    }
    category
    hash
    block
    timestamp
    from

    claimStreamId
    claimTokenId
    claimAmount
    claimIndex
    claimRecipient

    clawbackAmount
    clawbackFrom
    clawbackTo
  }
`;

export const FactoryFragment_Envio = gql/* GraphQL */ `
  fragment FactoryFragment on Factory {
    id
    alias
    address
    version
  }
`;

export const AssetFragment_Envio = gql/* GraphQL */ `
  fragment AssetFragment on Asset {
    id
    address
    chainId
    decimals
    name
    symbol
  }
`;

export const ActivityFragment_Envio = gql/* GraphQL */ `
  fragment ActivityFragment on Activity {
    id
    timestamp
    day
    amount
    claims
    campaignObject {
      id
    }
  }
`;

export const CampaignFragment_Envio = gql/* GraphQL */ `
  fragment CampaignFragment on Campaign {
    id
    subgraphId
    address
    chainId
    category
    hash
    timestamp
    admin
    lockup
    root
    expires
    expiration
    ipfsCID
    aggregateAmount
    totalRecipients
    clawbackTime
    streamCliff
    streamCliffDuration
    streamTotalDuration
    streamCancelable
    streamTransferable
    claimedAmount
    claimedCount
    version
    assetObject {
      ...AssetFragment
    }
    factoryObject {
      ...FactoryFragment
    }
  }
`;

export const ActionFragment_TheGraph = gql/* GraphQL */ `
  fragment ActionFragment on Action {
    id
    chainId
    subgraphId
    campaign {
      id
    }
    category
    hash
    block
    timestamp
    from

    claimStreamId
    claimTokenId
    claimAmount
    claimIndex
    claimRecipient

    clawbackAmount
    clawbackFrom
    clawbackTo
  }
`;

export const FactoryFragment_TheGraph = gql/* GraphQL */ `
  fragment FactoryFragment on Factory {
    id
    alias
    address
    version
  }
`;

export const AssetFragment_TheGraph = gql/* GraphQL */ `
  fragment AssetFragment on Asset {
    id
    address
    chainId
    decimals
    name
    symbol
  }
`;

export const ActivityFragment_TheGraph = /* GraphQL */ `
  fragment ActivityFragment on Activity {
    id
    timestamp
    day
    amount
    claims
    campaign {
      id
    }
  }
`;

export const CampaignFragment_TheGraph = /* GraphQL */ `
  fragment CampaignFragment on Campaign {
    id
    subgraphId
    address
    chainId
    category
    hash
    timestamp
    admin
    lockup
    root
    expires
    expiration
    ipfsCID
    aggregateAmount
    totalRecipients
    clawbackTime
    streamCliff
    streamCliffDuration
    streamTotalDuration
    streamCancelable
    streamTransferable
    claimedAmount
    claimedCount
    version
    asset {
      ...AssetFragment
    }
    factory {
      ...FactoryFragment
    }
  }
`;
