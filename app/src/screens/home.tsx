import {Text, View} from 'react-native'
import React from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import {HomeStackParamList} from '../navigation/types'

type HomeNavProp = StackNavigationProp<HomeStackParamList, 'Home'>

type Props = {
  navigation: HomeNavProp
}

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View className={''} style={{flex: 1, alignItems: 'center'}}>
      <Text className={'text-red-500'}>Home </Text>
    </View>
  )
}
