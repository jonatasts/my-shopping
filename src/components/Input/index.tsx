import React, { forwardRef, Ref } from "react";
import { TextInput as TextInputType, TextInputProps } from "react-native";

import { TextInput } from "./styles";
import { Props } from "./types";

const Input = forwardRef<TextInputProps, Props>(
  ({ size = "large", ...rest }: Props, ref: any) => {
    return <TextInput ref={ref} size={size} {...rest} />;
  }
);

export default Input;
