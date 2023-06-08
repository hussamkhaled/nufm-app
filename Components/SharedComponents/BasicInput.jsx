import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");
export default function BasicInput({
  label,
  placeholder,
  KeyboardType,
  value,
  onChangeText,
  bool,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>{label}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={KeyboardType}
          secureTextEntry={bool}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "100%",
    // aspectRatio: 7 / 1,
    height: 55,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: width > 650 ? "2%" : "2.5%",
    fontSize: width > 650 ? RFPercentage(1.9) : RFPercentage(1.7),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: width > 650 ? "2%" : "6%",
    width: "100%",
  },
  subCont: {
    flexDirection: "column",
    width: width > 650 ? "80%" : "87%",
  },
  label: {
    paddingLeft: width > 650 ? "1%" : "2%",
    fontWeight: "semi-bold",
    color: "#595959",
    fontSize: width > 650 ? RFPercentage(1.9) : RFPercentage(1.8),
  },
});
