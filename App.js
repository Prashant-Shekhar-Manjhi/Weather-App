import React from 'react';
import {StatusBar, Text} from 'react-native';
import Search from './screens/Search';
import Home from './screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme
} from '@react-navigation/native';



const App = () => {
  const Tab = createBottomTabNavigator();
  const scheme = useColorScheme();
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor="#66ccff" />
      <NavigationContainer
        theme={scheme==="dark"?DefaultTheme:DefaultTheme}
      >
        <Tab.Navigator
          screenOptions = {{
            "tabBarActiveTintColor": "#00aaff",
            "tabBarInactiveTintColor": "gray",
            "tabBarActiveBackgroundColor": "#fff",
            "tabBarInactiveBackgroundColor": "#fff",
            headerShown: false,
            "tabBarStyle": [
              {
                "display": "flex",
                "padding":0,
                "paddingBottom":8,
                "paddingTop":4,
              },
              null
            ] 
          }
        }
        >
          <Tab.Screen name="home-screen" component={Home} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="city" color={color} size={26} />
              ),
              labelStyle: {
                margin: 0,
                fontSize:14
              },
            }}
            initialParams={{ city: "patna" }}
          />
          <Tab.Screen name="search-screen" component={Search}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home-city-outline" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
