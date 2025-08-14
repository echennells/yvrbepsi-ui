export interface Chain {
  id: string;
  token: string;
  label: string;
  rpcUrl: string;
  logoURI: string;
}

const chains: { [key: string]: Chain } = {
  "0x2105": {
    id: "0x2105",
    token: "ETH",
    label: "Base",
    rpcUrl: "https://base.llamarpc.com",
    logoURI:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTExIiBoZWlnaHQ9IjExMSIgdmlld0JveD0iMCAwIDExMSAxMTEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xXzIpIj4KPHBhdGggZD0iTTU0Ljk0NDkgMTEwLjEzNUMxNy44MzkgMTEwLjEzNSAtMC4wNDI5Njg4IDg1LjU0MTggLTAuMDQyOTY4OCA1NS41QzAuMDQyOTY4OCA1NS41IC0wLjA0Mjk2ODggMjUuNDU4MiAyNC42MDA5IDAuNjk5MjE5SDgzLjg1NDNDOTguMjc1NCAwLjY5OTIxOSAxMTAuMDI5IDEyLjUyODcgMTEwLjAyOSAyNi45OTg1QzExMC4wMjkgNDEuNDY4MyA5OC4yNzU0IDUzLjI5NzcgODMuODU0MyA1My4yOTc3SDU0LjUxODRDNTQuNTE4NCA1My4yOTc3IDU0LjUxODQgNTYuNTUxNyA1NC41MTg0IDU3LjcwMTJDNTQuNTE4NCA1OC44NTA4IDU0LjUxODQgNjIuMTA0OCA1NC41MTg0IDYyLjEwNDhIODMuODU0M0M5Mi40ODEgNjIuMTA0OCAxMDAuODgzIDY1LjE5MDUgMTA3LjQyOCA3MC4zNjM5QzEwOC4xOTEgNzAuOTY0NCAxMDguOTI3IDcxLjU5OTEgMTA5LjYzNCA3Mi4yNjY1QzEwOS44MjcgNzIuNDQ0MiAxMTAuMDE3IDcyLjYyNTQgMTEwLjIwNCA3Mi44MUMxMTAuNjA5IDczLjIyNDcgMTEwLjk5NyA3My42NTU2IDExMS4zNjcgNzQuMTAyMlYxMDkuNDM2SDU0Ljk0NDlWMTEwLjEzNVoiIGZpbGw9IiMwMDUyRkYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xXzIiPgo8cmVjdCB3aWR0aD0iMTExIiBoZWlnaHQ9IjExMSIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4=",
  },
  "0xa": {
    id: "0xa",
    token: "ETH",
    label: "Optimism",
    rpcUrl: "https://optimism.llamarpc.com",
    logoURI:
      "https://optimistic.etherscan.io/assets/optimism/images/svg/logos/token-secondary-light.svg",
  },
  "0x89": {
    id: "0x89",
    token: "POLY",
    label: "Polygon",
    rpcUrl: "https://polygon.llamarpc.com",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
  },
  "0xa4b1": {
    id: "0xa4b1",
    token: "ETH",
    label: "Arbitrum One",
    rpcUrl: "https://arbitrum.llamarpc.com",
    logoURI:
      "https://arbiscan.io/assets/arbitrum/images/svg/logos/token-secondary-light.svg?v=24.9.2.0",
  },
  "0x65": {
    id: "0x65",
    token: "SOL",
    label: "Solana",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    logoURI: "/bepsi/solanaLogoMark.svg",
  },
};

export default chains;
