/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Search from 'react-native-search-box';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

import youtubeSearch from '../youtube-api';

const VideoList = (props) => {
  const [query, setQuery] = useState('creed bratton');
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const window = useWindowDimensions();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    youtubeSearch(query)
      .then((resData) => {
        setDataSource(resData);
        console.log('hi');
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showVideoDetail = (video) => {
    props.navigation.navigate('Detail', { video });
  };

  const renderLoadingView = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000ff" />
      </View>
    );
  };

  const renderVideoCell = (video) => {
    return (
      <TouchableHighlight
        onPress={() => {
          showVideoDetail(video);
        }}
        underlayColor="orange"
      >
        <View>
          <View style={styles.container}>
            <Image
              source={{ uri: video.snippet.thumbnails.high.url }}
              style={{ width: window.width, height: window.width / 1.8 }}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{video.snippet.title}</Text>
              <Text style={styles.subtitle}>{video.snippet.description}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  };

  return isLoading ? (
    renderLoadingView()
  ) : (
    <View>
      <Search
        backgroundColor="#C4302B"
        showsCancelButton={false}
        textFieldBackgroundColor="#C4302B"
        onChangeText={(newQuery) => {
          setQuery(newQuery);
          fetchData();
        }}
      />
      <FlatList
        data={dataSource}
        renderItem={({ item }) => {
          return renderVideoCell(item);
        }}
        keyExtractor={(item) => item.snippet.thumbnails.default.url}
        style={styles.listView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(240,240,240)',
  },
  thumbnail: {
    width: 300,
    height: 300,
    marginRight: 5,
    backgroundColor: 'black',
  },
  rightContainer: {
    flex: 1,
    padding: 5,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(200,200,200)',
  },
  listView: {
    backgroundColor: 'rgb(240,240,240)',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoList;
