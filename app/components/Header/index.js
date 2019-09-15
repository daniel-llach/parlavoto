import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from '../../store'
import filter from 'lodash/filter'

const Header = ({
  line1,
  line2,
  currentQuestionTitle,
  getTitleFromcurrentQuestion,
  showScored,
  score,
}) => {
  const success = filter(score, function(i) {
    return i === true && i
  }).length

  return (
    <View>
      <Text style={styles.title}>
        {getTitleFromcurrentQuestion ? currentQuestionTitle : line1}
      </Text>
      <Text style={styles.title}>{showScored ? `${success} / 10` : line2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    maxWidth: 320,
    textAlign: 'center',
  },
})

Header.defaultProps = {
  getTitleFromcurrentQuestion: false,
  showScored: false,
}

export default connect(({currentQuestionTitle, score}) => ({
  currentQuestionTitle,
  score,
}))(Header)
