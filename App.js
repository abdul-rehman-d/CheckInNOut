import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { formatDate } from './helpers';
import { Feather } from '@expo/vector-icons';
import { addToStorage, getFromStorage } from './useStorage';

function MyButton({ children, ...rest }) {
  return <TouchableOpacity {...rest}>
    <Text className='text-white bg-slate-700 border border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-32'>{children}</Text>
  </TouchableOpacity>
}

function MyTable({ data }) {
  if (!data) return <></>
  const keys = Object.keys(data)
  return <ScrollView className='w-full px-8 py-4'>
    <View className='flex-row w-full justify-between border border-white border-b-0'>
      <Text className='text-lg text-white font-semibold w-1/4'>Date</Text>
      <Text className='text-lg text-white font-semibold w-1/4'>Check In</Text>
      <Text className='text-lg text-white font-semibold w-1/4'>Check Out</Text>
    </View>
    {keys.map((key,index) => (
      <View
        className={`flex-row w-full justify-between border border-white
        ${index === keys.length-1 ? '' : 'border-b-0'}`}
        key={key}
      >
        <Text className='text-md text-white w-1/4'>{key}</Text>
        <Text className='text-md text-white w-1/4'>{data[key].in && data[key].in}</Text>
        <Text className='text-md text-white w-1/4'>{data[key].in && data[key].in}</Text>
      </View>
    ))}
  </ScrollView>
}

export default function App() {
  const [ currDate, setCurrDate ] = useState()
  const [ currTime, setCurrTime ] = useState()

  const [ data, setData ] = useState(null)
  
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString())
    }, 1000)
    setCurrDate(new Date())
  }, [])

  useEffect(() => {
    if (showSuccessMessage) setTimeout(() => {
      setShowSuccessMessage(false)
    }, 1000);
  }, [showSuccessMessage])

  const buttonPress = async (type) => {
    const time = currTime
    const date = currDate.toLocaleDateString()
    const success = await addToStorage(type, time, date)
    if (success) setShowSuccessMessage(true)
  }

  return (
    <View className='flex-1 items-center py-48 bg-slate-700'>
      <Text className='text-4xl text-white pb-1'>CheckInNOut</Text>
      <Text className='text-2xl text-white pb-8'>{currDate ? formatDate(currDate): ''}</Text>
      <Text className='text-xl text-white'>{currTime}</Text>
      <View className='my-8 space-y-8'>
        <MyButton onPress={() => buttonPress('in')} >Check In</MyButton>
        <MyButton onPress={() => buttonPress('out')}>Check Out</MyButton>
      </View>
      <MyButton onPress={async () => {
        const data = await getFromStorage()
        setData(currData => (currData ? null : data))
      }}>{data ? 'Hide Records' : 'Show Records'}</MyButton>
      <MyTable data={data} />
      {
        showSuccessMessage ?
        <View className='w-48 text-center py-2 rounded absolute bottom-8 bg-white flex-row justify-center'>
          <Feather name="check" size={24} color="#334155" />
          <Text className='text-slate-700 font-bold text-lg'>Recorded!</Text>
        </View>
        : null
      }
      <StatusBar style="auto" translucent />
    </View>
  );
}
