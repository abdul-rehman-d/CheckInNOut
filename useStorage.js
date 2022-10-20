import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToStorage = async (type, time, date) => {
  let newData = {}
  const existingData = await getFromStorage()
  if (existingData) {
    if (existingData.hasOwnProperty(date)) {
      if (existingData[date][type]) return false
      else newData = {...existingData, [date]: {...existingData[date], [type]: time}}
    }
    else {
      newData = {...existingData, [date]: {[type]: time}}
    }
  } else {
    newData[date] = {[type]: time}
  }
  try {
    await AsyncStorage.setItem('@checkinnout', JSON.stringify(newData))
    return true
  } catch (e) {
    return false
  }
}

export const getFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem('@checkinnout')
    return data ? JSON.parse(data) : null
  } catch (e) {
    return null
  }
}