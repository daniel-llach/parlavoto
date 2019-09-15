import React, {PureComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Header from '../../components/Header'
import ButtonWidthBorder from '../../components/ButtonWidthBorder'

class HomeView extends PureComponent {
  static navigationOptions = () => {
    return {
      headerTitle: <Header line1="PARLAVOTO" line2="v0.0.1" />,
    }
  }

  goToDeputiesView = () => {
    const {navigation} = this.props
    const {navigate} = navigation
    navigate('Deputies')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.advice1}>
          Acceso rápido y simple a las votaciones del parlamento Chileno.
        </Text>
        <Text style={styles.advice1}>
          * Esta app se hidrata con los datos abiertos del Congreso de Chile.
        </Text>
        <Text style={styles.advice1}>2019</Text>
        <ButtonWidthBorder title={'DIPUTADOS'} action={this.goToDeputiesView} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  advice: {
    width: 230,
    textAlign: 'center',
    fontSize: 28,
    marginTop: 80,
  },
  advice2: {
    textAlign: 'center',
    fontSize: 24,
  },
  container: {
    backgroundColor: '#f5f2f0',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
})

export default HomeView
