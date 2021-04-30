import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Auth from "@aws-amplify/auth";
import { useSelector, useDispatch } from "react-redux";

export default function QRScanner({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const texts =
    state.language === "en"
      ? {
          alert1: "You got the CA's Message!",
          alert2: "QR-code is invalid",
          alert3: "Tap to Scan Again",
        }
      : {
          alert1: "CAのメッセージをゲットしました！",
          alert2: "このQRコードは無効です",
          alert3: "もう一度スキャンしてください",
        };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    const postQR = async () => {
      try {
        await fetch(
          "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/qr-codes",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: Auth.user.attributes.email,
              flightID: state.selectedFlight,
              url: data,
            }),
          }
        );
      } catch (e) {
        console.log(e);
      }
    };

    const getCAQRCode = async () => {
      const res = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/qr-codes/CA"
      );
      const urlData = await res.json();
      const arrayOfUrl = urlData.map((qrcode) => qrcode.url);

      return arrayOfUrl.includes(data);
    };

    const check = await getCAQRCode();

    if (check) {
      postQR();
      alert(texts.alert1);

      const getQrcodes = async () => {
        const res = await fetch(
          "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/qr-codes/" +
            Auth.user.attributes.email
        );
        const data = await res.json();
        dispatch({ type: "SetQrCodes", payload: data });
      };
      const getFlights = async () => {
        const fullURL =
          "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
          Auth.user.attributes.email;
        const response = await fetch(fullURL);
        const jsonRes = await response.json();
        const theFlights = await jsonRes.map((flight) => flight);
        dispatch({ type: "SetFlightList", payload: theFlights });
      };

      getQrcodes();
      getFlights();
      navigation.navigate("List");
    } else {
      alert(texts.alert2);
    }
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
      {scanned && (
        <Button title={texts.alert3} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  barCodeView: {
    width: "100%",
    height: "50%",
    marginBottom: 40,
  },
});
