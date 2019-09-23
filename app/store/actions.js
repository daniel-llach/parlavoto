import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {DOMParser} from 'xmldom'
import deburr from 'lodash/deburr'
// import find from 'lodash/find'
import orderBy from 'lodash/orderBy'
import pickBy from 'lodash/orderBy'
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
      .subtract(12, 'days') // TODO: change for 30
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
      // pick authors
      const authorsArray = projects[i].getElementsByTagName('autor')
      const authors = []
      for (let j = 0; j < authorsArray.length; j++) {
        authors.push({
          autor: authorsArray[j].firstChild.firstChild.data,
        })
      }
      // pick voting
      const votingArray = projects[i].getElementsByTagName('votacion')
      const voting = []
      if (votingArray.length > 0) {
        for (let k = 0; k < votingArray.length; k++) {
          const votingDetail = []
          const votingArrayChildNodes = votingArray[k].childNodes
          for (let m = 0; m < votingArrayChildNodes.length; m++) {
            if (votingArrayChildNodes[m].nodeName === 'DETALLE_VOTACION') {
              const votesChildNodes = votingArrayChildNodes[m].childNodes
              const votes = []
              if (votesChildNodes.length > 0) {
                for (let l = 0; l < votesChildNodes.length; l++) {
                  votes.push({
                    name: votesChildNodes[l].childNodes[0].firstChild.data,
                    vote: votesChildNodes[l].childNodes[1].firstChild.data,
                  })
                }
              }
              votingDetail.push({
                detail: votes,
              })
            } else {
              let keyName = ''
              switch (votingArrayChildNodes[m].nodeName) {
                case 'SESION':
                  keyName = 'session'
                  break
                case 'FECHA':
                  keyName = 'date'
                  break
                case 'TEMA':
                  keyName = 'subject'
                  break
                case 'SI':
                  keyName = 'yes'
                  break
                case 'NO':
                  keyName = 'no'
                  break
                case 'ABSTENCION':
                  keyName = 'abstention'
                  break
                case 'PAREO':
                  keyName = 'pareo'
                  break
                case 'QUORUM':
                  keyName = 'quorum'
                  break
                case 'TIPOVOTACION':
                  keyName = 'type'
                  break
                case 'ETAPA':
                  keyName = 'level'
                  break
              }
              votingDetail.push({
                [keyName]: votingArrayChildNodes[m].firstChild.data,
              })
            }
          }
          voting.push({...votingDetail})
        }
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
        voting: voting,
      })
    }

    return {
      lawProjects: obj,
    }
  },
  getVotingForDeputy: async ({deputies, lawProjects}, actions, deputyId) => {
    console.log('lawProjects: ', lawProjects)
    const lawProjectsWithVoting = pickBy(
      lawProjects,
      voting => voting.length > 0,
    )
    console.log('lawProjectsWithVoting: ', lawProjectsWithVoting)
    // const lawProjectsWithDeputyVotes =
    return {
      deputiesVotes: [],
    }
  },
}
