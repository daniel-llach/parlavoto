import React from 'react'
import {Provider} from './app/store'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import routes from './app/routes'

const navigationHeader = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      height: 100,
      backgroundColor: '#f5f2f0',
      borderBottomWidth: 0,
      elevation: 0,
    },
  },
}

const MainNavigator = createStackNavigator(routes, navigationHeader)
const Navigation = createAppContainer(MainNavigator)

const App = () => (
  <Provider>
    <Navigation />
  </Provider>
)

export default App
