import React from 'react'

import { prependApiUrl } from '../../../utils/Url'

export interface Item {
  icon: string
  name: string
}

export interface Props {
  title: string
  items: Item[]
}

export const ActionCard: React.FC<Props> = ({ items, title }) => {
  return items.length > 0 ? (
    <div className="flex flex-col bg-white dark:bg-animo-black m-4 px-4 py-2 w-72 md:w-96 rounded-lg shadow border border-1 border-animo-lightgrey dark:border-animo-darkgrey">
      <div className="flex-1-1 title my-2 ">
        <h1 className="font-semibold dark:text-white">{title}</h1>
        <hr className="text-animo-lightgrey" />
      </div>
      {items.map((item) => {
        return (
          <div className="flex-1 flex flex-row items-center justify-between my-2" key={item.name}>
            <div className="bg-animo-lightgrey dark:bg-animo-darkgrey rounded-lg p-2 w-12">
              <img className="h-8 m-auto" src={prependApiUrl(item.icon)} alt="icon" />
            </div>
            <div className="flex-1 px-4 justify-self-start dark:text-white">
              <p>{item.name}</p>
            </div>
          </div>
        )
      })}
    </div>
  ) : null
}
