import { TextInputProps } from "react-native";

export type Props = TextInputProps & {
  size?: "small" | "medium" | "large";
} & { placeholderTextColor?: string };
