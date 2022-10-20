import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatDate } from './helpers';
import { Feather } from '@expo/vector-icons';

function MyButton({ children, ...rest }) {
  return <TouchableOpacity {...rest}>
    <Text className='text-white bg-slate-700 border border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-32'>{children}</Text>
  </TouchableOpacity>
}

export default function App() {
  const [ currDate, setCurrDate ] = useState()
  const [ currTime, setCurrTime ] = useState()
  
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

  const buttonPress = (type) => {
    const time = currTime
    setShowSuccessMessage(true)
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
