import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import Input from "../../components/Input";

import { Container, Account, Title, Subtitle } from "./styles";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSigInAnonymously = async () => {
    const { user } = await auth().signInAnonymously();

    console.log(user);
  };

  const handleCreateUserAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso!"))
      .catch((error) => {
        console.log(error);

        if (error.code === "auth/email-already-in-use") {
          Alert.alert("E-mail não disponível!");
        }

        if (error.code === "auth/invalid-email") {
          Alert.alert("E-mail inválido!");
        }

        if (error.code === "auth/weak-password") {
          Alert.alert("A senha deve ter no minímo 6 dígitos!");
        }
      });
  };

  const handleSigInWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          Alert.alert("E-mail ou senha inválidos!");
        }
      });
  };

  const handleForgotPassword = async () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Enviamos um link no seu e-mail para você redefinir sua senha!"
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSigInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}
