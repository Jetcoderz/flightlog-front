import React, { useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function UserInfo () {
    // const [purpose, SetPurpose] = useState("")

    // useEffect(() => {

    // },[purpose]);

    return (
        <View>
            <Text>Purpose:</Text>
            <DropDownPicker 
                items = {
                    {label: 'Business'},
                    {label: 'Travel'}
                }
            />
        </View>
    )
}