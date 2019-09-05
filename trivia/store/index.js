import createStore from 'react-waterfall'
import initialState from './initialState'
import actionsCreators from './actions'

const config = {
  initialState: initialState,
  actionsCreators: actionsCreators,
}

export const {Provider, connect, actions} = createStore(config)
