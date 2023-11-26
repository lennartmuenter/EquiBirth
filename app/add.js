import {Stack, useRouter} from "expo-router";
import {ActivityIndicator, SafeAreaView, Text, View, TextInput, Button} from "react-native";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Add = () => {
    const router = useRouter();


    const [name, setName] = useState('')
    const [notice, setNotice] = useState('')

    const handlePress = async () => {
        if(name.length < 4){
            setNotice('Name must contain at least four letters')
            return;
        }
        let id = data ? (data.length) : (0);
        let horse = {'id':id,'name':name,'occupancy':null};
        let horses = [];
        if(data) {
            horses = data
        }
        horses.push(horse)
        try {
            await AsyncStorage.setItem('horses', JSON.stringify(horses))
        } catch (e) {
            console.log(e)
        } finally {
            window.location.reload()
        }
    }
    //<RNDateTimePicker onChange={handleDate} value={occupancy} />
    const handleDate = (event, selectedDate) => {
        setOccupancy(selectedDate)
    }

    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerTitle: 'Pferd anlegen',
            }}/>
            <View className="bg-zinc-200 h-full">
                {notice ? (
                    <View>
                        <Text>{notice}</Text>
                    </View>
                ): null}
                {isLoading ? (
                    <View className="p-4">
                        <ActivityIndicator size="small" />
                    </View>
                ) : error ? (
                    <View className="p-4">
                        <Text>Something went wrong</Text>
                    </View>
                ) : (
                    <View>
                        <TextInput placeholder={'Name'} onChangeText={(text) => setName(text)} style={{borderWidth:1}} />
                        <Button title='submit' onPress={handlePress}></Button>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Add