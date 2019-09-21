import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {DOMParser} from 'xmldom'
import deburr from 'lodash/deburr'
// import find from 'lodash/find'
import orderBy from 'lodash/orderBy'
import moment from 'moment'

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
  getLawProjects: async () => {
    // TODO: Get projects from storage
    // TODO: If there is deputies on Storage just get project from last day
    // if last day is less than 30 days if not get all last 30 days projects

    // If not, get deputies from server
    const last30Days = moment()
      .subtract(7, 'days') // TODO: change for 30
      .format('DD/MM/YYYY')
    const serverResponse = await axios.get(
      `https://www.senado.cl/wspublico/tramitacion.php?fecha=${last30Days}`,
    )

    // Translate XML to JSON
    const doc = new DOMParser().parseFromString(serverResponse.data, 'text/xml')
    const obj = []
    const projects = doc.getElementsByTagName('proyecto')

    // Pick the data
    for (let i = 0; i < projects.length; i++) {
      const authorsArray = projects[i].getElementsByTagName('autor')
      const authors = []
      for (let j = 0; j < authorsArray.length; j++) {
        authors.push({
          autor: authorsArray[j].firstChild.firstChild.data,
        })
      }
      // Added to final list
      obj.push({
        bulletin: projects[i].getElementsByTagName('boletin')[0].firstChild
          .data,
        title: projects[i].getElementsByTagName('titulo')[0].firstChild.data,
        admissionDate: projects[i].getElementsByTagName('fecha_ingreso')[0]
          .firstChild.data,
        initiative: projects[i].getElementsByTagName('iniciativa')[0].firstChild
          .data,
        originChamber: projects[i].getElementsByTagName('camara_origen')[0]
          .firstChild.data,
        currentUrgency: projects[i].getElementsByTagName('urgencia_actual')[0]
          .firstChild.data,
        level: projects[i].getElementsByTagName('etapa')[0].firstChild.data,
        subLevel: projects[i].getElementsByTagName('subetapa')[0].firstChild
          .data,
        status: projects[i].getElementsByTagName('estado')[0].firstChild.data,
        motionLink: projects[i].getElementsByTagName('link_mensaje_mocion')[0]
          .firstChild.data,
        authors: authors,
      })
    }

    return {
      lawProjects: obj,
    }
  },
}
