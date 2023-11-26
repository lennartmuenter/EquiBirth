import {FlatList, Text, TouchableOpacity, View} from "react-native";
import ActiveHorseCard from "./activeHorseCard";

const Occupied = ({ horses }) => {
    horses = horses.filter((h) => h.occupancy != null)
    horses.sort((a,b) => a.occupancy - b.occupancy)
    return (
        <>
            {horses.length > 0 ? (
                <FlatList
                className="h-full p-2"
                data={horses}
                renderItem={( horse ) => {
                    return(
                        <ActiveHorseCard horse={horse.item}/>
                    )
                }}
                keyExtractor={item => item?.id}
            />
            ) : <View className="bg-zinc-100 m-2 rounded-2xl border border-zinc-300 p-2">
                    <Text className="text-xl font-medium text-zinc-800 text-center">Trächtigkeiten können bei "Alle" hinzugefügt werden.</Text>
                </View>
        }
        </>
    )
}

export default Occupied;