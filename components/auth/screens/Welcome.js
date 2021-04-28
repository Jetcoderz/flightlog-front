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
    height: 37,
  },
  signInButton: {
    width: 100,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2a6bcc",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
  },
  signInText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  signUpButton: {
    width: 100,
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "gray",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
  },
  signUpText: {
    fontSize: 13,
    color: "white",
  },
});

const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <BackgroundImage>
      <View style={styles.content}>
        <Image style={styles.title} source={LOGO} />
        <TouchableHighlight
          onPress={() => navigation.navigate("SignIn")}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation.navigate("SignUp")}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    </BackgroundImage>
  </View>
);

export default Welcome;
