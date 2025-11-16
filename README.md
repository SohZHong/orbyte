# Orbyte — A Blockchain-Based Framework for Transparent & Traceable Voluntary Carbon Markets (VCM)

Orbyte is the **official Proof-of-Concept (PoC)** implementation accompanying the conference paper  
**“A Distributed Blockchain Framework for Real-Time Traceability and Transparency in the Voluntary Carbon Market”**  
(accepted and pending publication).

This repository demonstrates a **decentralized carbon credit lifecycle** using blockchain, smart contracts, and real-time on-chain data indexing via **The Graph Protocol**. It showcases how the proposed research architecture can be operationalized in a working decentralized application (dApp).

---

## 🔍 Background & Research Motivation

The **Voluntary Carbon Market (VCM)** enables organizations to offset emissions by purchasing carbon credits.  
However, traditional VCM systems suffer from critical issues:

- Fragmented registries
- Lack of transparency
- High fraud risk
- Missing or inconsistent documentation
- Double counting of carbon credits
- Delayed or inaccessible public auditability

As analyzed in the accompanying paper [oai_citation:1‡AIPCP Article_Blockchain.docx](sediment://file_000000008a4472089578295f8e45a642), these limitations undermine trust and prevent large-scale adoption.

### Research Goal

The paper proposes a **conceptual blockchain-based framework** that:

- Uses smart contracts to enforce programmatic trust
- Tokenizes carbon credits as fully traceable NFTs
- Embeds standardized metadata for verifiable environmental attributes
- Enables real-time data retrieval through The Graph Protocol
- Integrates DeFi mechanisms for accessible credit trading
- Allows public, NGO, and governmental verification through immutable ledgers

**Orbyte implements this entire workflow as a functional prototype.**

---

## 🧪 About This Proof-of-Concept

Orbyte operationalizes the architecture presented in the paper, demonstrating:

### ✔ Role-based, permissioned lifecycle

Developers → Auditors → Marketplace → Public Verification

### ✔ Three smart-contract modules

- **Proposal Contract** — submits carbon credit project proposals
- **Token Contract** — mints audited, metadata-rich NFT carbon credits
- **Marketplace Contract** — enables peer-to-peer trading

### ✔ NFT-based carbon credit design

Each credit is a **unique token** embedding immutable metadata such as:

- Carbon standard (VCS, GS, Islamic-compliant, etc.)
- Project description
- Environmental co-benefits
- Country of origin
- Auditor approval & timestamps

### ✔ Real-time indexing

The Graph Protocol continuously streams contract state to the frontend for:

- Live proposal status updates
- Traceable token histories
- Auditing and retirement record verification

### ✔ Full-stack decentralized application

Built using modern tooling (Next.js + Bun + Turborepo), the PoC demonstrates how blockchain infrastructure, indexing, and UI layers integrate into a cohesive dApp.

---

## 🏛 **System Architecture (Research-Aligned)**

This PoC directly implements the architecture described in the paper:

1. **Frontend (Next.js dApp)**
   - Displays proposals, audits, token metadata, and marketplace listings
   - Retrieves real-time data via GraphQL queries to a subgraph

2. **Backend / Smart Contracts**
   - Proposal, Token (NFT), and Marketplace modules
   - Records all events, statuses, and transfers on-chain

3. **Indexing Layer (The Graph Protocol)**
   - Maps on-chain events to queryable data
   - Ensures transparency, auditability, and high-performance retrieval

4. **Users / Stakeholders**
   - **Developer**: submits and issues credits after audit approval
   - **Auditor**: validates proposals and authorizes token minting
   - **Buyer**: purchases or trades verifiable carbon credits
   - **Public/NGOs/Government**: independently inspect project metadata using blockchain explorers or the dApp interface

---

## 🛠 Tech Stack

### Core Framework

- **Next.js (App Router)**
- **TypeScript**
- **Bun** runtime
- **Turborepo** (monorepo management)

### Blockchain

- **Solidity** smart contracts
- **NFT-based carbon credit tokens**
- **Event-driven architecture for lifecycle transitions**

### Indexing

- **The Graph Protocol**
- Subgraph for proposals, tokens, and marketplace events

### UI

- **TailwindCSS**
- **shadcn/ui**
- **React Server Components**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SohZHong/orbyte.git
cd orbyte
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start development mode

```bash
bun dev
```

### 4. Environment variables

Create a .env file at the following folders and input the values:

#### Frontend

```.env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_PRIVY_APP_ID=
PRIVY_APP_SECRET=
```

#### Contract

```.env
export PRIVATE_KEY=
export ETHERSCAN_API_KEY=
```

#### Server

```.env
CORS_ORIGIN=
PINATA_GATEWAY=
PINATA_JWT=
OWNER_PRIVATE_KEY=
```

## 📚 Relation to the Research Paper

This repository serves as the practical validation of the conceptual framework proposed in the paper
"A Distributed Blockchain Framework for Real-Time Traceability and Transparency in the Voluntary Carbon Market."
￼
Orbyte implements the following key contributions from the paper:

- Decentralized lifecycle management (proposal → audit → issuance → retirement)
- Metadata-rich NFTs for tamper-proof carbon credit representation
- Programmatic trust via modular smart contracts
- Real-time indexing using The Graph
- Public auditability and transparent project provenance
- Integration possibilities for DeFi-enabled carbon markets

The PoC demonstrates technical feasibility, operational workflows, and practical implications for future VCM platforms.

> [!NOTE]
> A link to the final publication will be added once available.

## 🤝 Contributing

Contributions, discussions, and academic collaborations are welcome.

You may open an issue or reach out via the emails listed in the publication.
