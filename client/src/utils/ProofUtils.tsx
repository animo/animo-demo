import type { Attribute } from '../slices/types'

import { decode } from 'js-base64'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAttributesFromProof = (proof: any) => {
  const decoded = decode(proof.presentationMessage['presentations~attach'][0].data.base64)
  const json = JSON.parse(decoded).requested_proof.revealed_attr_groups

  const attributes: Attribute[] = []
  for (const prop in json) {
    for (const prop2 in json[prop].values) {
      attributes.push({ name: prop2, value: json[prop].values[prop2].raw })
    }
  }

  return attributes
}
