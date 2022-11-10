import {Transaction} from '../types'

let dummyTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Starbucks',
    date: '2021-01-01',
    amount: 5.99,
    type: 'expense',
    category: 'food',
    pictureUrl:
      'https://images.unsplash.com/photo-1612994503408-1749e15638b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '2',
    name: 'Starbucks',
    date: '2021-01-01',
    amount: 5.99,
    type: 'expense',
    category: 'food',

    pictureUrl:
      'https://images.unsplash.com/photo-1612994503408-1749e15638b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '3',
    name: 'Freelance Client',
    date: '2021-01-01',
    amount: 125.99,
    type: 'income',
    category: 'work',
    pictureUrl:
      'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
]

export function fetchTransactions() {
  return new Promise<Transaction[]>((resolve) => {
    setTimeout(() => {
      resolve(dummyTransactions)
    }, 500)
  })
}

export function addTransaction(transaction: Transaction) {
  dummyTransactions = [...dummyTransactions, transaction]
  console.log('Added transaction', dummyTransactions)
  return new Promise<Transaction>((resolve) => {
    setTimeout(() => {
      resolve(transaction)
    }, 500)
  })
}
