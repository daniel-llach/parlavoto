import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

const DeputyItem = ({id, name, even, navigateToDeputyVotes}) => {
  return (
    <TouchableOpacity
      style={[styles.item, even ? styles.even : styles.odd]}
      onPress={() => navigateToDeputyVotes(id, name)}>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    width: '100%',
  },
  even: {
    backgroundColor: 'white',
  },
  odd: {
    backgroundColor: '#f8f9fa',
  },
})

export default DeputyItem
