import {Button, Text, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StatsStackParamList} from '../navigation/types'

type StatsNavProp = StackNavigationProp<StatsStackParamList, 'Stats'>

type Props = {
  navigation: StatsNavProp
}

export const StatsScreen: React.FC<Props> = () => {
  return (
    <View className={'flex items-center justify-center'}>
      <Text>Stats screen</Text>
      <Button title="Go to Details" />
    </View>
  )
}
