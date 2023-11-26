import { Stack, useRouter, useSearchParams } from "expo-router";
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { DeleteIcon } from "../src/icons";
import Moment from "moment";
import { StorageManager } from "../manageHorses";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Horse = () => {
    const router = useRouter();
    const params = useSearchParams();

    const storageMgr = StorageManager.getInstance();

    const [askDelete, setAskDelete] = useState(false);
    const [data, setData] = useState(storageMgr.data)

    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())

    let horse = data.find(horse => horse.id == params.id)

    const deleteHorse = () => {
        storageMgr.deleteHorse(horse)
        router.replace('/calendar')
    }

    function setOccupancy() {
        horse.occupancy = parseInt((date.getTime()).toFixed(0))
        storageMgr.saveHorse(horse)
    }

    function deleteOccupancy() {
        horse.occupancy = null
        storageMgr.saveHorse(horse)
    }

    const onChange = (_, selectedDate) => {
        setDate(selectedDate);
    };

    function changeDate(_, selectedDate) {
        setDate(selectedDate);
        horse.occupancy = parseInt((date.getTime()).toFixed(0))
    }

    let until = Moment(horse.occupancy).add(337, 'd').diff(Moment(new Date()), 'days')

    return (
        <View className="bg-zinc-200 h-full">
            <SafeAreaView>
                <Stack.Screen options={{
                    headerShown: true,
                    headerTitle: (horse.name),
                    headerStyle: { backgroundColor: 'rgb(244,244,245)' },
                    headerLargeTitle: true,
                }} />
            </SafeAreaView>
            <View className="">
                {askDelete ? (
                    <View>
                        <Text className="text-xl font-medium text-zinc-800 text-center my-4">Pferd entfernen?</Text>
                        <TouchableOpacity className="bg-amber-600 mx-2 p-4 rounded-2xl" onPress={deleteHorse}>
                            <Text className="text-xl font-medium text-zinc-800 text-center ">Ja, permanent entfernen.</Text>
                        </TouchableOpacity>
                    </View>
                ) : horse.occupancy === null ? (
                    <View>
                        <View className="bg-zinc-100 m-2 p-4 rounded-2xl border border-zinc-300">
                            <Text className="text-xl font-medium text-zinc-800 text-center mb-4">Neue Trächtigkeit</Text>
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl font-medium text-zinc-800">Belegt am: </Text>
                                <RNDateTimePicker value={date} onChange={onChange} />
                            </View>
                        </View>
                        <TouchableOpacity className="bg-lime-600 mx-2 mb-2 p-4 rounded-2xl" onPress={setOccupancy}>
                            <Text className="text-xl font-medium text-zinc-800 text-center">Trächtigkeit hinzufügen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-amber-600 mx-2 p-4 rounded-2xl" onPress={() => (setAskDelete(true))}>
                            <Text className="text-xl font-medium text-zinc-800 text-center">Pferd löschen</Text>
                        </TouchableOpacity>
                    </View>
                ) : horse ? (
                    <View>
                        <View className="bg-zinc-100 m-2 p-4 rounded-2xl border border-zinc-300">
                            <View className="flex flex-row justify-between mb-2">
                                <Text className="text-xl font-medium text-zinc-800">Ausgezählt am: </Text>
                                <Text className="text-xl font-medium text-zinc-800">{Moment(horse.occupancy).add(336, 'd').format("D.M.YYYY")}</Text>
                            </View>
                            <View className="flex flex-row justify-between mb-2">
                                <Text className="text-xl font-medium text-zinc-800">Geburt in: </Text>
                                <Text className="text-xl font-medium text-zinc-800">ca. { until > 0 ? until : 0} Tagen</Text>
                            </View>
                            <View className="flex flex-row justify-between mb-2">
                                <Text className="text-xl font-medium text-zinc-800">Belegt am: </Text>
                                <Text className="text-xl font-medium text-zinc-800">{Moment(horse.occupancy).format("D.M.YYYY")}</Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl font-medium text-zinc-800">Trächtig seit: </Text>
                                <Text className="text-xl font-medium text-zinc-800">{Moment(new Date()).diff(Moment(horse.occupancy), 'days')} Tagen</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="bg-lime-600 mx-2 mb-2 p-4 rounded-2xl" onPress={deleteOccupancy}>
                            <Text className="text-xl font-medium text-zinc-800 text-center">Trächtigkeit entfernen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-amber-600 mx-2 p-4 rounded-2xl" onPress={() => (setAskDelete(true))}>
                            <Text className="text-xl font-medium text-zinc-800 text-center">Pferd löschen</Text>
                        </TouchableOpacity>
                    </View>
                ) : <Text>Couldn't find horse.</Text>

                }
            </View>
        </View>
    )
}

export default Horse