import React, {PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import Header from '../../components/Header'
import DeputiesList from '../../components/DeputiesList'
import {actions} from '../../store'

class DeputiesView extends PureComponent {
  static navigationOptions = () => {
    return {
      headerTitle: <Header line1="Diputados" />,
      headerLeft: null,
    }
  }

  componentDidMount() {
    // hydrate the store with deputies
    actions.getDeputies()
  }

  navigateToDeputyVotes = (id, name) => {
    console.log('go!')
    const {navigation} = this.props
    const {navigate} = navigation
    navigate('DeputyVotes', {id: id, name: name})
  }

  render() {
    return (
      <View style={styles.container}>
        <DeputiesList navigateToDeputyVotes={this.navigateToDeputyVotes} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f2f0',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
})

export default DeputiesView
