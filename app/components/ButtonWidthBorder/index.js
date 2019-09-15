import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

const ButtonWidthBorder = ({title, action, disabled}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={() => action()}
      disabled={disabled}>
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

ButtonWidthBorder.dafualtProps = {
  disabled: false,
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'black',
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
  },
  disabled: {
    borderColor: 'grey',
  },
  disabledText: {
    color: 'grey',
  },
})

export default ButtonWidthBorder
