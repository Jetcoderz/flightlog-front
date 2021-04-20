import React from "react";
import { View, Text, StyleSheet, FlatList, PickerIOSComponent } from "react-native";

export default function UserInfo ({thisFlight}) {
   
    return (
        <View style = {styles.userInfo}>
            <View style = {styles.eachUserInfo}>
                <Text>Purpose:{ thisFlight.purpose }</Text>
            </View>
            <View style = {styles.eachUserInfo}>
                <Text>Entertainment:{ thisFlight.entertainment }</Text>
            </View>
            <View style = {styles.eachUserInfo}>
                <Text>Meal:{ thisFlight.meal }</Text>
            </View>
            <View style = {styles.eachUserInfo}>
                <Text>SeatNo:{ thisFlight.seatNo }</Text>
            </View>
            <View style = {styles.eachUserInfo}>
                <Text>Review:{ thisFlight.review }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    // userInfo: {
    //     alignItems: 'center'
    // },
    // eachUserInfo: {
    //     backgroundColor: "lightblue",
    //     height: 35,
    //     width: "90%",
    //     margin: 3,
    //     justifyContent: 'center',
    //     borderRadius: 10,
    //     paddingLeft:7,
    //     shadowOpacity: 0.25,
    //     elevation: 1,
        
    // }
})