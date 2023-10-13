import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NUFM from "../../assets/NUFM-Green.png";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SafeAreaView from "react-native-safe-area-view";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default function Header({ link, title, setModal }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.container}>
        <View style={styles.subCont}>
          <View>
            <TouchableOpacity onPress={() => setModal(true)}>
              <View>
                <Entypo
                  name="menu"
                  size={width > 700 ? 34 : 26}
                  color="#023D26"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.prof}>
            <TouchableOpacity
            // onPress={() => navigation.navigate(link+"Notification")}
            >
              <View>
                <Ionicons
                  name="notifications-outline"
                  size={width > 700 ? 34 : 26}
                  color="#023D26"
                />
              </View>
            </TouchableOpacity>
            {link === "Worker/" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate(link + "Profile")}
              >
                <View style={{ marginLeft: 8 }}>
                  <Ionicons
                    name="person-circle-outline"
                    size={width > 700 ? 34 : 26}
                    color="#023D26"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: width > 650 ? RFPercentage(2.7) : RFPercentage(2.4),
    fontWeight: "bold",
    color: "#023D26",
  },
  subCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp("3%"),
    paddingHorizontal: "6%",
    width: "100%",
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "5%",
  },
  img: {
    width: 120,
    height: 50,
  },
  prof: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
