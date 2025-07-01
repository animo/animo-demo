// Updated types using Paradym SDK types
import type {
  DidcommConnection,
  DidcommInvitation,
  DidcommIssuance,
  DidcommVerification,
} from '@/lib/paradym'

export interface Connection {
  id: string
  state: string
  invitationUrl: string
}

// Updated to remove Aries Framework dependency
export interface ProofRequestData {
  connectionId: string
  attributes?: ProofAttribute[]
  predicates?: ProofPredicateInfo[]
  requestOptions?: RequestOptions
}

// Basic types for proof attributes and predicates (simplified)
export interface ProofAttribute {
  name: string
  names?: string[]
  restrictions?: any[]
}

export interface ProofPredicateInfo {
  name: string
  p_type: '>=' | '>' | '<=' | '<'
  p_value: number
  restrictions?: any[]
}

export interface Character {
  id: string
  image: string
  name: string
  type: string
  backstory: string
  starterCredentials: CredentialData[]
}

export interface UseCase {
  slug: string
  card: UseCaseCard
  stepper: StepperItem[]
  sections: Section[]
}

export interface UseCaseCard {
  title: string
  image: string
  description: string
}

export interface Section {
  id: string
  entity: Entity
  colors: Colors
  requestedCredentials?: RequestedCredential[]
  issueCredentials?: CredentialData[]
  steps: Step[]
}

export interface RequestedCredential {
  id: string
  name: string
  icon: string
  properties?: string[]
  predicates?: { name: string; value: string | number; type: string }
  credentialDefinitionId?: string
}

export interface CredentialData {
  id: string
  icon: string
  name: string
  credentialDefinitionId: string
  properties?: { name: string }[]
  attributes?: Attribute[]
}

export interface Attribute {
  name: string
  value: string
}

export interface StepperItem {
  id: string
  name: string
  description: string
  steps: number
  section: number
}

export interface Step {
  id: string
  type: StepType
  title: string
  description?: string
  image?: string
  buttonText?: string
  requestOptions?: RequestOptions
  useProof?: boolean
  endStepper?: EndStepperItem[]
}

export interface EndStepperItem {
  id: string
  title: string
  description: string
  image: string
}

export interface Entity {
  name: string
  icon: string
  imageUrl?: string
}

export interface CreateInvitationProps {
  entity?: Entity
  useLegacyInvitations?: boolean
}

export interface Colors {
  primary: string
  secondary: string
}

export enum StepType {
  START,
  INFO,
  CONNECTION,
  PROOF,
  PROOF_OOB,
  CREDENTIAL,
  END,
}

export interface RequestOptions {
  name?: string
  comment?: string
}

export interface CharWithUseCases {
  characterId: string
  useCases: UseCase[]
}

export interface Wallet {
  id: number
  name: string
  organization: string
  recommended: boolean
  icon: string
  url: string
  apple: string
  android: string
  ledgerImage?: string
}

// Re-export Paradym types for use in the app
export type {
  DidcommConnection,
  DidcommInvitation,
  DidcommIssuance,
  DidcommVerification,
}
