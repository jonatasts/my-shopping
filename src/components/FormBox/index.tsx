import React, { useRef, useState } from "react";
import { Alert, Keyboard, TextInput, TextInputProps } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import Input from "../Input";
import { createRef } from "react";
import { FocusProps } from "./types";

export function FormBox() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const descriptionInputRef = createRef<TextInputProps & FocusProps>();
  const quantityInputRef = createRef<TextInputProps & FocusProps>();

  const saveProduct = async () => {
    if (quantity > 0 && description !== "") {
      const _description = description;
      const _quantity = quantity;

      Keyboard.dismiss();
      setDescription("");
      setQuantity(0);

      firestore()
        .collection("products")
        .add({
          description: _description,
          quantity: _quantity,
          done: false,
        })
        .catch((error: any) => console.log(error));
    } else {
      if (description === "" && descriptionInputRef.current) {
        console.log("description");
        descriptionInputRef.current.focus();
      } else if (quantity === 0 && quantityInputRef.current) {
        quantityInputRef.current.focus();
      }
    }
  };

  return (
    <Container>
      <Input
        ref={descriptionInputRef}
        placeholder="Nome do produto"
        size="medium"
        value={description}
        onChangeText={setDescription}
      />

      <Input
        ref={quantityInputRef}
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
