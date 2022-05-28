import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import { User } from "./types";

export function Routes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
