import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Load } from "../ButtonText/styles";

import { Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <Container activeOpacity={0.8} disabled={isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
}
