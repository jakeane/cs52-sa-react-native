import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VideoList from '../components/video_list';
import VideoDetail from '../components/video_detail';

const Stack = createStackNavigator();

const SearchTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={VideoList}
        options={{
          title: 'Youtube Search',
          headerStyle: {
            backgroundColor: '#F4511E',
          },
          headerTintColor: '#FFF',
        }}
      />
      <Stack.Screen name="Detail" component={VideoDetail} />
    </Stack.Navigator>
  );
};

export default SearchTab;
