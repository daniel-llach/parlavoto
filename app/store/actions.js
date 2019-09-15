import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {DOMParser} from 'xmldom'
import orderBy from 'lodash/orderBy'
import deburr from 'lodash/deburr'

export const actionsCreators = {
  getDeputies: async () => {
    // Get deputies from storage
    const deputiesStorage = await AsyncStorage.getItem('@deputies')
    let response = []
    if (deputiesStorage) {
      // If there is deputies on Storage just use it :)
      response = JSON.parse(deputiesStorage)
    } else {
      // If not, get deputies from server
      const serverResponse = await axios.get(
        'http://opendata.congreso.cl/wscamaradiputados.asmx/getDiputados_Vigentes',
      )
      // Translate XML to JSON
      const doc = new DOMParser().parseFromString(
        serverResponse.data,
        'text/xml',
      )
      const obj = []
      const deputies = doc.getElementsByTagName('Diputado')

      // Pick the data
      for (let i = 0; i < deputies.length; i++) {
        const fullname = `${
          deputies[i].getElementsByTagName('Apellido_Paterno')[0].firstChild
            .data
        } ${
          deputies[i].getElementsByTagName('Apellido_Materno')[0].firstChild
            .data
        }, ${deputies[i].getElementsByTagName('Nombre')[0].firstChild.data}`
        // Added to final list
        obj.push({
          id: deputies[i].getElementsByTagName('DIPID')[0].firstChild.data,
          name: fullname,
        })
      }

      // Sort alphabetic ascendent by first last name
      const sortDeputies = orderBy(obj, item => {
        // Deburr to handle utf characters like Álvarez
        return deburr(item.name)
      })

      // Save sorted deputies list into the Storage
      await AsyncStorage.setItem('@deputies', JSON.stringify(sortDeputies))

      // Then define response
      response = sortDeputies
    }

    return {
      deputies: response,
    }
  },
}
