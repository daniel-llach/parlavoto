import React, {PureComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Header from '../../components/Header'
import {actions} from '../../store'

class DeputyVotesView extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state
    return {
      headerTitle: <Header line1="Votaciones de" line2={params.name} />,
      headerLeft: null,
    }
  }

  componentDidMount() {
    // hydrate the store with projects
    actions.getLawProjects()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Lista de ultimas votaciones</Text>
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

export default DeputyVotesView
