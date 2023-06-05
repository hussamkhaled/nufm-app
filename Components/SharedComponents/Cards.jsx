import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
export default function Cards({ name, icon, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.subCont}>
          <Image source={icon} style={styles.img} />
          <View>
            <Text adjustsFontSizeToFit style={styles.text}>
              {name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const fontSizeScreens = {};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    // flexDirection: "column",
    width: width > 650 ? "42%" : "70%",
    // aspectRatio: 2.3 / 1,
    height: width > 700 ? 170 : 150,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginHorizontal: "4%",
    marginVertical: "3%",
  },
  subCont: {
    width: "100%",
    height: "100%",
    // aspectRatio: 2.5/ 1,
    borderRadius: 15,
    alignItems: "center",
    paddingTop: "8%",
  },
  text: {
    color: "#595959",
    fontWeight: "bold",
    fontSize: width > 700 ? RFPercentage(2.2) : RFPercentage(1.9),
    textAlign: "center",
    paddingTop: "5%",
  },
  img: {
    width: 60,
    height: 60,
  },
});
