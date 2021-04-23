import { StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function Stamp() {
  const state = useSelector((state) => state);
  const styles = StyleSheet.create({
    tinyLogo: {
      width: 30,
      height: 30,
    },
  });

  return <Image style={styles.tinyLogo} source={state.logo[ANA]}></Image>;
}
