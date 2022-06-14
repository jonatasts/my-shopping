import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import theme from "../../theme";
import { styles } from "./styles";
import { LoadingProps } from "./types";

const Loading = ({ label, color = theme.COLORS.PURPLE }: LoadingProps) => (
  <View style={styles.container}>
    <ActivityIndicator
      size={"large"}
      color={color}
      style={styles.activityIndicator}
    />
    {label && <Text style={styles.text}>{label}</Text>}
  </View>
);

export default Loading;
