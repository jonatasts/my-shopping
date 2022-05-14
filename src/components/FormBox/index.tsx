import React, { useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";

export function FormBox() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  const saveProduct = async () => {
    if (quantity > 0 && description !== "") {
      Keyboard.dismiss();

      firestore()
        .collection("products")
        .add({
          description,
          quantity,
          done: false,
        })
        .then(() => {
          Alert.alert("Produto adicionado com sucesso!", "", [
            {
              text: "OK",
              onPress: () => {
                setDescription("");
                setQuantity(0);
              },
            },
          ]);
        })
        .catch((error: any) => console.log(error));
    }
  };

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        value={description}
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        value={quantity > 0 ? `${quantity}` : ""}
        onChangeText={(value) => setQuantity(Number(value))}
      />

      <ButtonIcon size="large" icon="add-shopping-cart" onPress={saveProduct} />
    </Container>
  );
}
