import {Button, Text, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {StatsStackParamList} from '../navigation/types'
import React from 'react'

type StatsNavProp = StackNavigationProp<StatsStackParamList, 'Stats'>

type Props = {
  navigation: StatsNavProp
}

export const StatsScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Stats screen</Text>
      <Button title="Go to Details" />
    </View>
  )
}
