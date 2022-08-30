import type { ProofRequestData } from '../slices/types'
import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const createProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequestOptions = {
    requestedAttributes: Object.assign({}, data.attributes),
    requestedPredicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  return apiCall.post(`/proofs/request-proof`, {
    connectionId: data.connectionId,
    proofRequestOptions: proofRequestOptions,
    comment: data.requestOptions?.comment,
  })
}

export const createOOBProofRequest = (data: ProofRequestData): Promise<AxiosResponse> => {
  const proofRequestOptions = {
    requestedAttributes: Object.assign({}, data.attributes),
    requestedPredicates: Object.assign({}, data.predicates),
    version: '1.0.0',
    name: data.requestOptions?.name,
  }

  return apiCall.post(`/proofs/request-outofband-proof`, {
    proofRequestOptions: proofRequestOptions,
    comment: data.requestOptions?.comment,
  })
}

export const getProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/proofs/${proofId}`)
}

export const deleteProofById = (proofId: string): Promise<AxiosResponse> => {
  return apiCall.delete(`/proofs/${proofId}`)
}
