import React, {useState} from 'react'
import {
  Image,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import FeatherIcon from '@expo/vector-icons/Feather'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {HomeStackParamList} from '@app/navigation/types'
import {tailwindColors} from '@app/styles/colors'
import {useImagePicker} from '@app/hooks/use-image-picker'
import {useAddTransaction} from '@app/hooks/mutations'

type HomeNavProp = StackNavigationProp<HomeStackParamList, 'AddTransaction'>

type Props = {
  navigation: HomeNavProp
}

const TransactionInfoRowContainer: React.FC<{
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  className?: string
}> = ({children, style = {}}) => {
  return (
    <View
      style={style}
      className={`mb-6 flex w-full flex-row items-center justify-between px-4 `}>
      {children}
    </View>
  )
}

export const AddTransaction: React.FC<Props> = ({navigation}) => {
  const [amount, setAmount] = useState<string>()
  const [name, setName] = useState<string>()

  const {run: onPress, data, isSuccess, createdAt, reset} = useImagePicker()
  const {bottom} = useSafeAreaInsets()

  const {mutate} = useAddTransaction()

  const addTransaction = () => {
    if (amount && name && isSuccess && !data?.cancelled) {
      mutate({
        name,
        amount: parseFloat(amount),
        pictureUrl: data?.uri,
        id: '10',
        type: 'spending',
        category: 'food',
        date: `${createdAt?.year}-${createdAt?.month}-${createdAt?.day} ${createdAt?.hour}:${createdAt?.minutes}:${createdAt?.seconds}`,
      })
      reset()
    }
  }
  return (
    <View className={'flex-column flex h-full items-center bg-slate-900'}>
      <View className={'flex h-32 w-full items-center bg-sky-400 p-4'}>
        <View className={'flex w-full flex-row justify-center'}>
          <Text className={'text-lg font-bold text-slate-200'}>
            Add a Transaction
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.goBack()}
            className={'absolute left-0'}>
            <FeatherIcon
              name="x"
              size={24}
              color="white"
              className={'absolute'}
            />
          </Pressable>
        </View>
        <View
          className={'mt-6 flex w-full flex-row items-center justify-between'}>
          <View className={'flex flex-row'}>
            <Text className={'text-sm font-bold text-slate-200'}>Category</Text>
            <EvilIcons
              name="chevron-down"
              size={24}
              color={tailwindColors.slate['200']}
            />
          </View>
          <View className={'flex flex-row rounded-3xl bg-sky-500 p-2'}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType={'numeric'}
              className={'mr-2 text-slate-200'}
              placeholderTextColor={tailwindColors.slate['300']}
              placeholder={'200'}
              accessibilityLabel="Amount input field"
            />
            <Text className={'text-sm text-slate-200'}>USD</Text>
          </View>
        </View>
      </View>

      {isSuccess && !data?.cancelled ? (
        <>
          <Image
            accessibilityIgnoresInvertColors={true}
            className={'mt-4 h-32 w-4/5 rounded-xl object-cover'}
            source={{uri: data?.uri}}
          />
          <Text className={'mt-4 text-xl text-slate-200'}></Text>
        </>
      ) : (
        <Pressable
          accessibilityRole="imagebutton"
          onPress={onPress}
          className={
            'mt-4  flex h-32 w-4/5 items-center items-center justify-center rounded-xl border border-slate-600 bg-slate-800'
          }>
          <MaterialIcon
            name={'photo-library'}
            size={20}
            color={tailwindColors.slate['400']}
          />
          <Text className={'mt-2 uppercase text-slate-200'}>From library</Text>
        </Pressable>
      )}
      <TransactionInfoRowContainer className={'mt-4'}>
        <FeatherIcon
          name={'calendar'}
          size={30}
          color={tailwindColors.sky['400']}
        />
        <Text className={'text-slate-200'}>
          {createdAt?.year}-{createdAt?.month}-{createdAt?.day}
        </Text>
      </TransactionInfoRowContainer>
      <TransactionInfoRowContainer>
        <FeatherIcon
          name={'clock'}
          size={30}
          color={tailwindColors.sky['400']}
        />
        <Text className={'text-slate-200'}>
          {createdAt?.hour}:{createdAt?.minutes}:{createdAt?.seconds}
        </Text>
      </TransactionInfoRowContainer>
      <TransactionInfoRowContainer>
        <FeatherIcon
          name={'pen-tool'}
          size={30}
          color={tailwindColors.sky['400']}
        />
        <TextInput
          accessibilityLabel="Transaction name"
          value={name}
          placeholder={'Name'}
          onChangeText={setName}
          className={`rounded-xl bg-slate-800 px-4 py-2 text-slate-200`}
        />
      </TransactionInfoRowContainer>
      <Pressable
        className={`absolute mx-4 flex w-11/12 items-center rounded-3xl bg-sky-400 py-3`}
        style={{bottom: bottom + 20}}
        onPress={() => {
          addTransaction()
          navigation.goBack()
        }}
        accessibilityRole="button">
        <Text className={'text-lg font-bold text-slate-200'}>
          Add transaction
        </Text>
      </Pressable>
    </View>
  )
}
