import React from 'react'
import {Provider} from './store'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import routes from './routes'

const MainNavigator = createStackNavigator(routes)
const Navigation = createAppContainer(MainNavigator)

const App = () => (
  <Provider>
    <Navigation />
  </Provider>
)

export default App
