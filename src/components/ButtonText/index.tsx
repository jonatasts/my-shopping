import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Load, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function ButtonText({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </TouchableOpacity>
  );
}
