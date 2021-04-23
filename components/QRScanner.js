import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Auth from "@aws-amplify/auth";
import { useSelector } from "react-redux";



export default function QRScanner() {
  const state = useSelector((state) => state);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);
      
      const postQR = async () => {
        
        try {
          console.log({
            username: Auth.user.attributes.email,
            flightID: state.selectedFlight,
            url: data,
          })
          const res = await fetch (
            "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/qr-codes"
            ,{
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: Auth.user.attributes.email,
                flightID: state.selectedFlight,
                url: data,
              })
            }
            )
            console.log(res);
          }
          catch (e) {
            console.log(e);
          }
        }
        

        // if(Array.includes(data)){
        //   postQR();

        // } else {
        //   alert(`QRcode with type ${type} and data ${data} has been scanned`);
        // }
    };
    

    
    
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    
    return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => 
              setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    barCodeView: {
      width: '100%', 
      height: '50%', 
      marginBottom: 40
    },
});
