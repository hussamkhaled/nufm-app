import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");

export default function Buttons({ text, onPress, loading }) {
  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={onPress}>
        {!loading ? (
          <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>{text}...</Text>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
  },
  container: {
    width: width > 650 ?"80%":"87%",
    marginLeft: width > 650 ?"10%":"6.5%",
    // aspectRatio: 6.8 / 1,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    marginTop: "6%",
    backgroundColor: "#023D26",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: width > 650 ? RFPercentage(2.2) : RFPercentage(2),
    textAlign: "center",
  },
});
