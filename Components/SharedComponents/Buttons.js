import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Buttons({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "87%",
    aspectRatio: 6.8 / 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6%",
    backgroundColor: "#023D26",
    borderRadius: 12,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: RFPercentage(2),
    textAlign: "center",
  },
});
