import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import React from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import {useQuery} from '@tanstack/react-query'
import Icon from '@expo/vector-icons/EvilIcons'
import EntipoIcon from '@expo/vector-icons/Entypo'
import AntIcon from '@expo/vector-icons/AntDesign'
import {HomeStackParamList} from '../navigation/types'
import {tailwindColors} from '../styles/colors'
import {Transaction} from '../types'
import {fetchTransactions} from '@app/api/transactions'

type HomeNavProp = StackNavigationProp<HomeStackParamList, 'Home'>

type Props = {
  navigation: HomeNavProp
}

const TransactionItem = ({item}: {item: Transaction}) => {
  return (
    <View className={'my-2 flex-row items-center justify-between pb-2'}>
      <View className={`flex flex-row items-center`}>
        {item.pictureUrl ? (
          <Image
            accessibilityIgnoresInvertColors={true}
            source={{uri: item.pictureUrl}}
            className={'mr-4 h-10 w-10 rounded object-cover'}
          />
        ) : (
          <View className="mr-4 flex h-10 w-10 items-center justify-center rounded rounded bg-slate-700 object-cover">
            <Text className={'text-slate-200'}>
              {item.name[0].toUpperCase()}
            </Text>
          </View>
        )}
        <View>
          <Text className={'text-lg text-slate-200'}>{item.name}</Text>
          <Text className={'text-lg text-slate-500'}>{item.date}</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            color:
              item.type === 'income'
                ? tailwindColors.green['300']
                : tailwindColors.red['300'],
          }}>
          {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
        </Text>
      </View>
    </View>
  )
}

/**
 * Header component showing Today with a dropdown to select this week or this month
 * @constructor
 */
const Header: React.FC = () => {
  return (
    <View
      className={
        'flex w-full flex-row items-center justify-between border-b border-b-slate-600 pb-2'
      }>
      <Pressable accessibilityRole="button">
        <EntipoIcon
          name={'chevron-left'}
          size={30}
          color={tailwindColors.slate['200']}
        />
      </Pressable>

      <Pressable
        accessibilityRole="header"
        className={'flex flex-row items-center'}>
        <Text className={'text-xl text-slate-200'}>Today</Text>
        <Icon
          name="chevron-down"
          size={24}
          color={tailwindColors.slate['200']}
        />
      </Pressable>

      <Pressable accessibilityRole={'button'}>
        <EntipoIcon
          name={'chevron-right'}
          size={30}
          color={tailwindColors.slate['200']}
        />
      </Pressable>
    </View>
  )
}

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    isSuccess: isTransactionSuccess,
  } = useQuery<Transaction[], Error>(['transactions'], fetchTransactions)

  return (
    <View className={'h-full w-full bg-slate-900 p-2'}>
      <SafeAreaView className={'flex h-full items-center overflow-scroll'}>
        <Header />
        <Pressable
          accessibilityRole="button"
          className="absolute bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-sky-600"
          onPress={() => navigation.navigate('AddTransaction')}>
          <AntIcon name="plus" size={24} color="white" />
        </Pressable>
        <View className={'w-full pt-4 pl-4'}>
          <Text className={'text-xl text-slate-400'}>Total Expenses</Text>
          <Text className={'text-lg font-bold text-slate-200'}>10.264 RON</Text>
        </View>

        <View className={'w-full p-4'}>
          <View className={'flex w-full flex-row justify-between'}>
            <Text className={'text-xl text-slate-400'}>Transactions</Text>
            <Pressable accessibilityRole="button">
              <Text className={'ml-2 text-lg text-sky-500'}>See all</Text>
            </Pressable>
          </View>
          {isTransactionsLoading && <Text>Loading transactions...</Text>}
          {isTransactionSuccess ? (
            <FlatList
              data={transactions}
              renderItem={({item}) => <TransactionItem item={item} />}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  )
}
