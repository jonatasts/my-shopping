import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import theme from "../../theme";
import { styles } from "./styles";
import { LoadingProps } from "./types";

const Loading = ({ label }: LoadingProps) => (
  <View style={styles.container}>
    <ActivityIndicator
      size={"large"}
      color={theme.COLORS.PURPLE}
      style={styles.activityIndicator}
    />
    <Text style={styles.text}>{label}</Text>
  </View>
);

export default Loading;
