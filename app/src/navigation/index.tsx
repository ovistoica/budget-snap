import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  HomeStackParamList,
  SettingsStackParamList,
  StatsStackParamList,
} from './types'
import {Icon} from '../types'
import {HomeScreen} from '../screens/home'
import {SettingsScreen} from '../screens/settings'
import {StatsScreen} from '../screens/stats'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  )
}

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}

const StatsStack = createNativeStackNavigator<StatsStackParamList>()

function StatsStackScreen() {
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen name="Stats" component={StatsScreen} />
    </StatsStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

export function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName: Icon['name'] = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline'

            switch (route.name) {
              case 'Settings':
                iconName = focused ? 'ios-list' : 'ios-list-outline'
                break
              case 'Stats':
                iconName = focused ? 'stats-chart' : 'stats-chart-outline'
                break
              default:
                break
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Stats" component={StatsStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
