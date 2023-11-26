import {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import { StorageManager } from "../manageHorses";

const ViewSelector = () => {
    const [show, setShow] = useState('occupied');
    const mgr = StorageManager.getInstance()

    function handleReset() {
        mgr.reset()
    }

    function showReset(){
        let enabled = false
        if(enabled) {
            return (
                <TouchableOpacity className="py-2 rounded-xl basis-1/3" onPress={handleReset}>
                    <Text className="text-lg font-medium text-zinc-800 text-center justify-center">reset</Text>
                </TouchableOpacity>
            )
        } else return(null)
    }

    const buttonOccupied = (
        <View className="fixed top-0 w-full">
            <View className="flex flex-row mx-auto my-2" role="group">
                <TouchableOpacity className="py-2 rounded-xl basis-1/3" onPress={() => {setShow('all'); setButtons(buttonAll)}}>
                    <Text className="text-lg font-medium text-zinc-800 text-center justify-center">Alle</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-2 bg-zinc-800 rounded-full basis-1/3">
                    <Text className="text-lg font-medium text-zinc-200 text-center justify-center">Tragend</Text>
                </TouchableOpacity>
                {showReset()}
            </View>
        </View>
    )
    const buttonAll = (
        <View className="fixed top-0 w-full">
            <View className="flex flex-row mx-auto my-2" role="group">
                <TouchableOpacity className="py-2 bg-zinc-800 rounded-full basis-1/3">
                    <Text className="text-lg font-medium text-zinc-200 text-center justify-center">Alle</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-2 rounded-xl basis-1/3" onPress={() => {setShow('occupied'); setButtons(buttonOccupied)}}>
                    <Text className="text-lg font-medium text-zinc-800 text-center justify-center">Tragend</Text>
                </TouchableOpacity>
                {showReset()}
            </View>
        </View>
    )
    const [buttons, setButtons] = useState(buttonOccupied);

    return {show, buttons}
}

export default ViewSelector