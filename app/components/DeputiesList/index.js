import React, {useState, useEffect} from 'react'
import {FlatList, Text, View} from 'react-native'
import {connect} from '../../store'

const DeputiesList = ({deputies}) => {
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState([])

  const addPosts = () => {
    // If there is posts to add
    if (posts.length < deputies.length) {
      let newPosts = []
      // Take the following 20 posts
      for (let i = page * 20; i < page * 20 + 20; i++) {
        // If there is deputies to add, please add it
        deputies[i] && newPosts.push(deputies[i])
      }
      // Update posts with new ones
      setPosts([...posts, ...newPosts])
      // Finally add one more page
      setPage(page + 1)
    }
  }

  useEffect(() => {
    // At the beginning add the first 20 posts
    deputies.length > 0 && page === 0 && addPosts()
  })

  return (
    <View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({item}) => <Text>{item.name}</Text>}
          keyExtractor={item => item.id}
          onEndReached={() => addPosts()}
          onEndThreshold={0.001}
        />
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  )
}

export default connect(({deputies}) => ({deputies}))(DeputiesList)
