import {useRouter} from "expo-router";
import {Text, TouchableOpacity, View} from "react-native";

const PassiveHorseCard = (horse) => {
    horse = horse.horse

    const router = useRouter();


    return (
        <TouchableOpacity onPress={() => (router.push(`/${horse.id}`))}>
            <View className="bg-zinc-100 mb-2 p-4 rounded-2xl border border-zinc-300">
                <View className="flex flex-row justify-between">
                    <Text className="text-xl font-medium text-zinc-800">{horse.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PassiveHorseCard;