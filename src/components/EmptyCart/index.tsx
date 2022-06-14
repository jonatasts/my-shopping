import React from "react";

import { Container, Description, Image } from "./styles";
import { EmptyCartProps } from "./types";

const EmptyCart = ({ source }: EmptyCartProps) => {
  return (
    <Container>
      <Image source={source} />
      <Description>Sua lista está vazia!</Description>
    </Container>
  );
};

export default EmptyCart;
