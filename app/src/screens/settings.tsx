import {Text, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {SettingsStackParamList} from '../navigation/types'

type SettingsNavProp = StackNavigationProp<SettingsStackParamList, 'Settings'>

type Props = {
  navigation: SettingsNavProp
}

export const SettingsScreen: React.FC<Props> = () => {
  return (
    <View className={'flex items-center justify-center'}>
      <Text>Settings screen</Text>
    </View>
  )
}
