import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import Button from "./Button";
import BackgroundImage from "./BackgroundImage";
import LOGO from "./floghtlog.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 400,
    width: 200,
    height: 38,
  },
  buttonStyle: {
    width: 100,
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "gray",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 13,
    color: "white",
  },
});

const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <BackgroundImage>
      <View style={styles.content}>
        <Image style={styles.title} source={LOGO} />
        <Button onPress={() => navigation.navigate("SignIn")}>Sign In</Button>
        <TouchableHighlight
          onPress={() => navigation.navigate("SignUp")}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    </BackgroundImage>
  </View>
);

export default Welcome;
