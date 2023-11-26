import {FlatList, Text, TouchableOpacity, View} from "react-native";
import AddButton from "./AddButton";
import PassiveHorseCard from "./passiveHorseCard";

const All = ({horses, onPress}) => {

    

    return (
        <>
            <AddButton place={1} onPress={onPress} />
            <FlatList
                className="h-full px-2"
                data={horses}
                renderItem={( horse ) => {
                    return(
                        <PassiveHorseCard horse={horse.item}/>
                    )
                }}
                keyExtractor={item => item?.id}
            />
        </>
    )
}

export default All;