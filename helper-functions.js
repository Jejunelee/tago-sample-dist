import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(value))
    } catch (e) {
        // return null
        // saving error
    }
}

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('userData')
        if (value !== null) {
            console.log(JSON.parse(value))
            return JSON.parse(value)
        } else return false
    } catch (e) {
        console.log(e)
        // return null
        // error reading value
    }
}
export const removeData = async () => {
    try {
        const value = await AsyncStorage.removeItem('userData')
        return true
    } catch (e) {
        // return null
        // error reading value
    }
}