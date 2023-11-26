import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Picker, PickerIOS} from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { StorageManager } from "../manageHorses";

const AddButton = ({place, onPress}) => {
    const [buttonView, setButtonView] = useState(place)
    const [name, setName] = useState('')

    const storageMgr = StorageManager.getInstance()

    switch (buttonView) {
        case 1 :
            return (
                <TouchableOpacity onPress={() => setButtonView(2)}>
                    <View className="bg-zinc-100 m-2 p-4 rounded-2xl border border-zinc-300">
                        <View className="flex flex-row justify-between">
                            <Text className="text-xl font-medium text-zinc-800">Pferd hinzufügen</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        case 2 :
            return(
                <View className="bg-zinc-100 m-2 p-4 rounded-2xl border border-zinc-300">
                    <View className="flex flex-row justify-between">
                        <TextInput placeholder={'Name'} onChangeText={(text) => setName(text)} className="w-4/5"/>
                        <TouchableOpacity onPress={() => onPress(name)}>
                            <Text className="text-xl font-medium text-zinc-800">add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }
}

export default AddButton;