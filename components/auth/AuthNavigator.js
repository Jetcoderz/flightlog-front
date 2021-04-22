import React, { useState } from "react";
import Auth from "@aws-amplify/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Container from "../Container";

import WelcomeScreen from "./screens/Welcome";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import ForgetPasswordScreen from "./screens/ForgetPassword";
import Confirmation from "./screens/Confirmation";

const AuthStack = createStackNavigator();
const AuthModalStack = createStackNavigator();

function AuthNavigation() {
  const [userToken, SetUserToken] = useState("");
  const [user, SetUser] = useState("");

  const signOut = async () => {
    await Auth.signOut().catch((err) => {
      console.log("ERROR: ", err);
    });
    SetUserToken(null);
  };

  const signIn = async (user) => {
    SetUserToken(user.signInUserSession.accessToken.jwtToken);
    const userLogged = Auth.user.attributes.email;
    SetUser(userLogged);
  };

  function AuthNavigator({ signIn }) {
    return (
      <AuthModalStack.Navigator mode="modal" headerMode="none">
        <AuthModalStack.Screen name="AuthPages">
          {() => (
            <AuthStack.Navigator>
              <AuthStack.Screen
                options={{ headerShown: false }}
                name="Welcome"
                component={WelcomeScreen}
              />
              <AuthStack.Screen name="SignUp" component={SignUpScreen} />
              <AuthStack.Screen name="SignIn">
                {({ navigation }) => (
                  <SignInScreen signIn={signIn} navigation={navigation} />
                )}
              </AuthStack.Screen>
              <AuthStack.Screen
                name="ForgetPassword"
                component={ForgetPasswordScreen}
              />
            </AuthStack.Navigator>
          )}
        </AuthModalStack.Screen>
        <AuthModalStack.Screen
          options={{ headerShown: false }}
          name="Confirmation"
          component={Confirmation}
        />
      </AuthModalStack.Navigator>
    );
  }

  let view = "";
  if (!userToken) {
    view = <AuthNavigator signIn={signIn} />;
  } else {
    view = <Container signOut={signOut} user={user} />;
  }
  return <NavigationContainer>{view}</NavigationContainer>;
}

export default AuthNavigation;
