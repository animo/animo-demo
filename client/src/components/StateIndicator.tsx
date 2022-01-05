import { CheckMark } from './Checkmark'
import { Loader } from './Loader'

export interface Props {
  completed: boolean
}

export const StateIndicator: React.FC<Props> = ({ completed }) => {
  return <div className="m-auto">{completed ? <CheckMark /> : <Loader />}</div>
}
