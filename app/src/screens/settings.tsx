import {Text, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {SettingsStackParamList} from '../navigation/types'
import React from 'react'

type SettingsNavProp = StackNavigationProp<SettingsStackParamList, 'Settings'>

type Props = {
  navigation: SettingsNavProp
}

export const SettingsScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings screen</Text>
    </View>
  )
}
