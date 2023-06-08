import { StyleSheet, View, Text,TextInput } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
    aspectRatio: 7 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "2.5%",
    fontSize: RFPercentage(1.7),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6%",
  },
  subCont: {
    flexDirection: "column",
    width: "87%",
  },
  label: {
    paddingLeft: "2%",
    fontWeight: "semi-bold",
    color: "#595959",
    fontSize: RFPercentage(1.8),
  },
});
