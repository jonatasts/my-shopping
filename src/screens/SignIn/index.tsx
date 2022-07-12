import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import Input from "../../components/Input";

import { Container, Account, Title, Subtitle } from "./styles";
import { Alert } from "react-native";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginIn, setIsLoginIn] = useState(false);

  const handleSigInAnonymously = async () => {
    const { user } = await auth().signInAnonymously();

    console.log(user);
  };

  const validateFields = (isLoading = false): string => {
    if (!email.trim()) {
      return "Informe o e-mail!";
    }

    if (!password.trim()) {
      return "Informe a senha!";
    }

    setIsLoginIn(isLoading);
    return "success";
  };

  const validateAccount = (code: string, recoverEmail = false): string => {
    setIsLoginIn(false);

    if (code === "auth/user-not-found" || code === "auth/wrong-password") {
      return recoverEmail
        ? "E-mail não cadastrado!"
        : "E-mail ou senha inválidos!";
    }

    if (code === "auth/email-already-in-use") {
      return "E-mail não disponível!";
    }

    if (code === "auth/invalid-email") {
      return "E-mail inválido!";
    }

    if (code === "auth/weak-password") {
      return "A senha deve ter no minímo 6 dígitos!";
    }

    return "";
  };

  const handleCreateUserAccount = () => {
    const status = validateFields(true);

    if (status == "success") {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => Alert.alert("Usuário criado com sucesso!"))
        .catch((error) => {
          const statusError = validateAccount(error.code);

          console.log(error);
          return Alert.alert("Cadastro", statusError);
        });
    } else {
      return Alert.alert("Cadastro", status);
    }
  };

  const handleSigInWithEmailAndPassword = () => {
    const status = validateFields(true);

    if (status == "success") {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          const statusError = validateAccount(error.code);

          console.log(error);
          return Alert.alert("Login", statusError);
        });
    } else {
      return Alert.alert("Cadastro", status);
    }
  };

  const handleForgotPassword = async () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Enviamos um link no seu e-mail para você redefinir sua senha! Verifique sua caixa de spam!"
        );
      })
      .catch((error) => {
        const statusError = validateAccount(error.code, true);

        console.log(error);
        return Alert.alert("Recuperar senha", statusError);
      });
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

      <Button
        title="Entrar"
        onPress={handleSigInWithEmailAndPassword}
        isLoading={isLoginIn}
      />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
};
