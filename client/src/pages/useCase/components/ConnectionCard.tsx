import React from 'react'

import { prependApiUrl } from '../../../utils/Url'

export interface Props {
  icon: string
  entity: string
}

export const ConnectionCard: React.FC<Props> = ({ icon, entity }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-animo-darkgrey p-4 mb-4 h-auto rounded-lg shadow">
      <div className="flex-1-1 title">
        <h1 className="font-semibold dark:text-white">You're interacting with</h1>
        <hr className="text-animo-lightgrey" />
      </div>
      <div className="flex-1 flex flex-row items-center justify-between pt-4">
        <div className="bg-animo-lightgrey dark:bg-animo-black rounded-lg p-2 w-12">
          <img className="h-8 m-auto" src={prependApiUrl(icon)} alt="icon" />
        </div>
        <div className="flex-1 px-4 justify-self-start dark:text-white">
          <p>{entity}</p>
        </div>
      </div>
    </div>
  )
}
