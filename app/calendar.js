import {ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Stack, useRouter} from "expo-router";
import {useState, useEffect} from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import Occupied from "../src/Occupied";
import All from "../src/All"
import ViewSelector from "../src/ViewSelector";
import { StorageManager } from '../manageHorses';

const calendar = () => {
    const router = useRouter();

    const storageMgr = StorageManager.getInstance();
    let [isLoading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let [data, setData] = useState([])

    const {show, buttons} = ViewSelector();

    useEffect(() => {
        storageMgr.init().then((returnVal) => {
            setData(storageMgr.data)
            setLoading(returnVal.loadingState)
            setError(returnVal.errorState)
        })
    })

    function handleNewHorsePress(name) {
        let horse = {'id':0,'name':name,'occupancy':null};
        storageMgr.addHorse(horse)
        setData(storageMgr.data)
    }

    return (
        <SafeAreaView className="bg-zinc-100 h-full">
            <ExpoStatusBar style="dark"/>
            <Stack.Screen options={{
                headerShown:false,
                headerTitle : '',
                headerStyle: {backgroundColor: 'rgb(244,244,245)'},
            }}/>
            <View className="bg-zinc-100 border-b border-zinc-300">{buttons}</View>
            
            <View className="bg-zinc-200 h-full">
                {isLoading ? (
                    <View className="p-4">
                        <ActivityIndicator size="small" />
                    </View>
                ) : error ? (
                    <View className="p-4">
                        <Text>Something went wrong</Text>
                    </View>
                ) : show === 'occupied' ? (
                    <Occupied horses={data}/>
                ) : show === 'all' ? (
                    <All horses={data} onPress={handleNewHorsePress}/>
                ) : null}
            </View>
        </SafeAreaView>
    )
}

export default calendar;