import React, {useEffect} from 'react'
import {Text, View} from 'react-native'
import {actions, connect} from '../../store'

const DeputyVotingCard = ({deputiesVotes, lawProjects, name, id}) => {
  useEffect(() => {
    console.log('lawProjects: ', lawProjects)
    // lawProjects.length > 0 && !deputiesVotes[id] && actions.getVotingForDeputy()
  })
  return (
    <View>
      {!lawProjects.length > 0 && <Text>Cargando proyectos de ley</Text>}
      {lawProjects.length > 0 &&
        (deputiesVotes.length > 0 && !deputiesVotes[id].length > 0) && (
          <Text>
            Recopilando regostro de votaciones de {name} en los ultimos 30 días
          </Text>
        )}
      {lawProjects.length > 0 &&
        (deputiesVotes.length > 0 && deputiesVotes[id].length > 0) && (
          <Text>
            Se encontraron {deputiesVotes[id].length} votaciones de {name}
          </Text>
        )}
    </View>
  )
}

export default connect(({deputiesVotes, lawProjects}) => ({
  deputiesVotes,
  lawProjects,
}))(DeputyVotingCard)
