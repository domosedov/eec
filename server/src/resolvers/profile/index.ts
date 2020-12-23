import Mutations from './mutations'
import Queries from './queries'

export default [...Mutations, ...Queries] as const
