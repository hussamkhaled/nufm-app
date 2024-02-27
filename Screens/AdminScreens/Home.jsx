import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  BackHandler,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import CMenu from "../../Components/SharedComponents/CMenu";
import Header from "../../Components/SharedComponents/Header";
import Cards from "../../Components/SharedComponents/Cards";
import Facility from "../../assets/Facility-Management.png";
import Worker from "../../assets/Worker-Management.png";
import Order from "../../assets/Order.png";
import Attendance from "../../assets/Attandence-Management.png";
import Inspection from "../../assets/Inspection-1.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default function Home({ link }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const navToFac = () => {
    navigation.navigate("Facilities");
  };
  const navToWorker = () => {
    navigation.navigate("Workers");
  };
  const navToInspection = () => {
    // navigation.navigate(link + "Orders");
  };
  const navToAtt = () => {
    navigation.navigate("Attendances");
  };
  const CardItems = [
    { name: "Facility Management", icon: Facility, link: navToFac },
    { name: "Worker Management", icon: Worker, link: navToWorker },
    { name: "Attendance Management", icon: Attendance, link: navToAtt },
    // { name: "Inspections ", icon: Inspection, link: navToInspection },
  ];

  useEffect(() => {
    function handleBackButton() {
      navigation.navigate("Home");
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.box}>
      <View>
        <CMenu
          link={link}
          modalVisible={modalVisible}
          setModal={setModalVisible}
        />
      </View>
      <Header link={link} title="Home" setModal={setModalVisible} />
      <View style={styles.container}>
        <ScrollView>
          <FlatList
          sty
            keyExtractor={(item) => item.name}
            data={CardItems}
            // numColumns={1}
            numColumns={width > 650 ? 2 : 1}
            renderItem={({ item }) => {
              return (
                <Cards name={item.name} icon={item.icon} onPress={item.link} />
              );
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  container: {
    paddingBottom: hp("3%"),
    paddingHorizontal: width > 650 ? wp("7%") : "0%",
    width: wp("100%"),
    flex: 1,
  },
});
