# 🏥 MedVault: Zero-Knowledge Medical Records & Health Credentials DApp

[![MedVault CI/CD Pipeline](https://github.com/bc2ananyaghosh-dot/MEDICAL/actions/workflows/ci.yml/badge.svg)](https://github.com/bc2ananyaghosh-dot/MEDICAL/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-brightgreen.svg?logo=vercel)](https://medical-pt2z.vercel.app)
[![YouTube Demo](https://img.shields.io/badge/YouTube-Watch%20Demo-red.svg?logo=youtube)](https://youtu.com/K-ftT5YBhDo)
[![Author: Ananya Ghosh](https://img.shields.io/badge/Author-Ananya%20Ghosh-purple.svg)](https://github.com/bc2ananyaghosh-dot)
[![Midnight Network](https://img.shields.io/badge/Network-Midnight%20ZK-blue.svg)](https://midnight.network/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🔗 Live Links & Demo

- 🌐 **Live Web Application (Vercel):** [https://medical-pt2z.vercel.app](https://medical-pt2z.vercel.app)
- 📺 **YouTube Project Demo Video:** [https://youtu.com/K-ftT5YBhDo](https://youtu.com/K-ftT5YBhDo)
- 🐙 **GitHub Repository:** [https://github.com/bc2ananyaghosh-dot/MEDICAL](https://github.com/bc2ananyaghosh-dot/MEDICAL)

---

## 🌟 Executive Overview

**MedVault** is a decentralized, Zero-Knowledge (ZK) privacy-preserving medical records and patient health credential verification platform built on the **Midnight Network**.

In traditional healthcare systems, patients and doctors must present full clinical histories, diagnostic reports, or identity documents to verify single health attributes (e.g. vaccination status, specialist certification, or insurance claim eligibility). This leads to **Personal Health Information (PHI) over-disclosure**, HIPAA/GDPR privacy risks, and vulnerability to data breaches.

**MedVault solves this by leveraging Midnight Compact smart contracts:**
- Patients and healthcare providers store confidential medical data locally inside a **client-side private witness enclave**.
- Mathematical **Zero-Knowledge Proofs** are generated locally or via a local proof server.
- Verifiers and public ledgers only see a deterministic **proof validation boolean** and public hash — ensuring **0% leakage of raw medical diagnosis text, treatment records, or patient secrets**.

---

## ✨ Key Features

- 🔒 **Zero-Knowledge PHI Protection:** Ensures 100% privacy of medical records, prescription details, and patient secrets.
- 🎯 **Selective Disclosure:** Patients can selectively prove treatment completion, vaccination status, or insurance eligibility without sharing their entire medical file.
- 📜 **Compact Smart Contracts (`contracts/medvault.compact`):** Midnight smart contracts for on-chain credential registration, proof verification, and revocation handling.
- 🩺 **Multi-Credential Verification Engine:**
  1. **Patient Medical Record Proof:** Verify health status while shielding diagnosis text.
  2. **Healthcare Provider Endorsement:** Verify hospital & facility accreditation.
  3. **Doctor Board Certification:** Verify physician license and consultation active status.
  4. **Insurance Claim Eligibility:** Verify insurance policy coverage privately.
- 👛 **Lace Wallet Integration:** Native Web3 authentication and wallet state management via `@midnight-ntwrk/wallet-sdk`.
- ⚡ **Continuous Integration Pipeline:** Monitored via GitHub Actions with automated Vitest suites and failure diagnostic artifact uploads.

---

## 🏗️ System Architecture & Workflow

```mermaid
graph TD
    A["Patient / User (Browser UI)"] -->|1. Inputs Confidential Health Record / Witness| B["Client Private Witness Enclave"]
    B -->|2. Local Compact Circuit Verification| C["ZK Proof Server (Docker / Port 6300)"]
    C -->|3. Generates Cryptographic ZK Proof Blob| D["Midnight Node & Public Ledger"]
    D -->|4. Verifies Proof & Updates State| E["MedVault Public Ledger (Credential Count, Status)"]

    subgraph Client Confidential Boundary (100% Shielded)
        B
    end

    subgraph Zero-Knowledge Prover
        C
    end

    subgraph Immutable Public Ledger
        D
        E
    end
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript 5, Vite 6, Tailwind CSS 3 |
| **Icons & UI** | Lucide React, Framer Motion |
| **Zero-Knowledge Blockchain** | Midnight Network, Compact Language (`contracts/medvault.compact`), `@midnight-ntwrk/compact-runtime`, `@midnight-ntwrk/wallet-sdk` |
| **Backend & Proof Server** | Express, Node.js 22, Docker Compose Devnet |
| **Testing & Quality Assurance** | Vitest, React Testing Library, TypeScript (`tsc --noEmit`) |
| **CI/CD & Deployment** | GitHub Actions (`.github/workflows/ci.yml`), Vercel Cloud |

---

## 📂 Project Structure

```text
d:\Medical Records\
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI/CD Pipeline
├── contracts/
│   ├── medvault.compact         # MedVault Midnight Zero-Knowledge Smart Contract
│   ├── proof_scholar.compact    # Legacy Compact contract definition
│   └── managed/
│       └── proof_scholar/       # Compiled TypeScript contract bindings
│           └── index.ts
├── src/
│   ├── backend/
│   │   └── server.ts            # Express ZK Proof Server & API Endpoint
│   ├── components/
│   │   ├── Navbar.tsx           # MedVault Header Navigation
│   │   ├── Footer.tsx           # MedVault Footer & Security Links
│   │   ├── ProofGeneratorModal.tsx  # Patient ZK Proof Generator
│   │   ├── ProofVerifierModal.tsx   # Health Credential Verifier Modal
│   │   └── LedgerViewer.tsx     # Public Ledger Audit Explorer
│   ├── pages/
│   │   ├── LandingPage.tsx      # Hero Section & Interactive Workflow Illustration
│   │   ├── Dashboard.tsx        # Patient & Healthcare Control Center
│   │   ├── VerifyPage.tsx       # ZK Record Verification Engine
│   │   ├── LedgerPage.tsx       # Public Health Ledger Explorer
│   │   └── LoginPage.tsx        # MedVault Health Portal Sign-In
│   ├── services/
│   │   ├── laceWallet.ts        # Lace Wallet SDK Integration
│   │   └── midnightService.ts   # ZK Proof Server HTTP Client Service
│   └── witness.ts               # Private Witness Enclave Data Types & ZK Proof Engine
├── tests/
│   ├── config.test.ts           # Network Configuration Unit Tests
│   ├── contract.test.ts         # MedVault Compact Contract Tests
│   ├── privacy.test.ts          # ZK PHI Zero-Leakage Privacy Tests
│   ├── ui.test.tsx              # React UI Component Tests
│   └── wallet.test.ts           # Lace Wallet Adapter Tests
├── docker-compose.yml           # Local Midnight Devnet (Node 9944, Indexer 8088, Proof-Server 6300)
├── PROPOSAL.md                  # Comprehensive Project Proposal & System Architecture
├── README.md                    # Project Documentation
├── package.json                 # Dependencies & Build Scripts
├── tsconfig.json                # TypeScript Configuration
└── vite.config.ts               # Vite Configuration
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: `v22.0.0` or higher
- **Docker & Docker Compose**: `v2.0.0` or higher (for running local Midnight devnet)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/bc2ananyaghosh-dot/MEDICAL.git
cd MEDICAL
npm install
```

### 2. Run Local Midnight Devnet
Start the local Midnight Node, GraphQL Indexer, and ZK Proof Server:
```bash
npm run proof-server:start
```
*Tear down containers at any time with `npm run proof-server:stop`.*

### 3. Run Automated Vitest Test Suite
Execute the full unit and integration test suite:
```bash
npm run test
```

### 4. Type Check TypeScript Codebase
```bash
npm run typecheck
```

### 5. Launch Live Development Server
Start the frontend application locally:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🌐 Network Environments

This DApp supports multi-network switching:

| Network | Description | How to Select |
| :--- | :--- | :--- |
| **`undeployed`** | Local devnet bundled in `docker-compose.yml`. Genesis seed pre-funded. | Default |
| **`preview`** | Midnight Public Preview Testnet. | `npm run setup -- --network preview` |
| **`preprod`** | Midnight Public Preprod Testnet. | `npm run setup -- --network preprod` |

---

## 📄 License & Author

- **Author:** **Ananya Ghosh** ([@bc2ananyaghosh-dot](https://github.com/bc2ananyaghosh-dot))
- **License:** [MIT License](LICENSE)