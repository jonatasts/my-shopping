import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    color: theme.COLORS.GRAY900,
  },
  activityIndicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
