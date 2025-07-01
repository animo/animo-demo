import type { ProofRequestData } from '../slices/types'
import { apiCall } from './BaseUrl'

export const createProofRequest = async (data: ProofRequestData) => {
  const proofRequestOptions = {
    requestedAttributes: Object.assign({}, data.attributes),
    requestedPredicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  const response = await apiCall(`/proofs/request-proof`, {
    method: 'POST',
    body: JSON.stringify({
      connectionId: data.connectionId,
      proofRequestOptions,
      comment: data.requestOptions?.comment,
    }),
  })
  return response.json()
}

export const createOOBProofRequest = async (data: ProofRequestData) => {
  const proofRequestOptions = {
    requestedAttributes: Object.assign({}, data.attributes),
    requestedPredicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  const response = await apiCall(`/proofs/request-outofband-proof`, {
    method: 'POST',
    body: JSON.stringify({
      proofRequestOptions,
      comment: data.requestOptions?.comment,
    }),
  })
  return response.json()
}

export const getProofById = async (proofId: string) => {
  const response = await apiCall(`/proofs/${proofId}`)
  return response.json()
}

export const deleteProofById = async (proofId: string) => {
  const response = await apiCall(`/proofs/${proofId}`, {
    method: 'DELETE',
  })
  return response.json()
}
