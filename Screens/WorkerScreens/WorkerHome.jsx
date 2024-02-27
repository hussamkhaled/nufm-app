import { StatusBar } from "expo-status-bar";
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
import Attendance from "../../assets/Attandence-Management.png";
import Order from "../../assets/Order.png";
import Incident from "../../assets/IncidentImg.png";
import Task from "../../assets/Task.png";
import Safety from "../../assets/Safety.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import StopWatch from "../../Components/WorkerAndContractorComp/StopWatch";

const { width, height } = Dimensions.get("window");
export default function WorkerHome({ link }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const navToInc = () => {
    navigation.navigate(link + "IncidentsW");
  };
  const navToOrders = () => {
    navigation.navigate(link + "Orders");
  };
  const navToAtt = () => {
    navigation.navigate(link + "AddAttendance");
  };

  const navToTasks = () => {
    navigation.navigate(link + "TasksList");
  };

  const navToSafety = () => {
    navigation.navigate(link + "Safety");
  };
  const CardItems = [
    { name: "Attendance Management ", icon: Attendance, link: navToAtt },
    { name: "View Order ", icon: Order, link: navToOrders },
    { name: "Incident ", icon: Incident, link: navToInc },
    { name: "Tasks ", icon: Task, link: navToTasks },
    { name: "Safety ", icon: Safety, link: navToSafety },
  ];

  useEffect(() => {
    function handleBackButton() {
      navigation.navigate("Worker/Home");
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
        <StopWatch />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  container: {
    // paddingBottom: hp("3%"),
    paddingHorizontal: width > 650 ? wp("7%") : "0%",
    width: wp("100%"),
    flex: 1,
  },
});
