import {useRouter} from "expo-router";
import {Text, TouchableOpacity, View} from "react-native";
import Moment from "moment/moment";
import {useState} from "react";
import { StorageManager } from "../manageHorses";

const ActiveHorseCard = ( { horse } ) => {
    const router = useRouter();
    const storageMgr = StorageManager.getInstance();

    const [askDelete, setAskDelete] = useState(false)

    let bg = 'bg-zinc-100 mb-2 p-4 rounded-2xl border border-zinc-300'

    let foaling = false

    if(Moment(horse.occupancy).add(336, 'days').isBefore(new Date())){
        bg = 'bg-lime-600 mb-2 p-4 rounded-2xl'
        foaling = true
    } else if (Moment(horse.occupancy).add(320, 'days').isBefore(new Date())){
        bg = 'bg-amber-600 mb-2 p-4 rounded-2xl'
    }

    const occupancyLength = 336; //days
    const dateDiff = Moment(new Date()).diff(Moment(horse.occupancy),'days');
    let progressBarWidth = dateDiff / (occupancyLength / 100);
    if(dateDiff > occupancyLength){
        progressBarWidth = 100;
    }


    function deleteOccupancy() {
        horse.occupancy = null
        storageMgr.saveHorse(horse)
    }

    return (
        <TouchableOpacity onPress={() => (router.push(`/${horse.id}`))}>
            <View className={bg}>
                <View className="flex flex-row justify-between mb-2">
                    <Text className="text-xl font-medium text-zinc-800">{horse.name}</Text>
                    <Text className="text-xl font-medium text-zinc-800">{Moment(horse.occupancy).add(occupancyLength, 'd').format('DD. MMMM YYYY')}</Text>
                </View>
                {foaling ? (
                    askDelete? (
                        <TouchableOpacity className="py-2 bg-zinc-800 rounded-full" onPress={deleteOccupancy}>
                            <Text className="text-lg font-medium text-zinc-200 text-center justify-center">Trächtigkeit entfernen?</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity className="py-2 bg-zinc-800 rounded-full" onPress={() => setAskDelete(true)}>
                            <Text className="text-lg font-medium text-zinc-200 text-center justify-center">Ausgetragen?</Text>
                        </TouchableOpacity>
                        )
                ) : (
                    <View className="bg-zinc-200 rounded-full h-4">
                        <View className="bg-zinc-800 h-4 rounded-full" style={{width: progressBarWidth+'%'}}>
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}
/**/

/**/
export default ActiveHorseCard;