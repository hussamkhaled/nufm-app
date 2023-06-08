import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import CMenu from "../../Components/SharedComponents/CMenu";
import Header from "../../Components/SharedComponents/Header";
import Cards from "../../Components/SharedComponents/Cards";
import Attendance from "../../assets/Attandence-Management.png";
import Order from "../../assets/Order.png";
import Incident from "../../assets/IncidentImg.png";

export default function WorkerHome({link}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const navToInc = () => {
    navigation.navigate(link+"IncidentsW");
  };
  const navToOrders = () => {
    navigation.navigate(link+"Orders");
  };
  const navToAtt = () => {
    navigation.navigate(link+"AddAttendance");
  };
  const CardItems = [
    { name: "Worker Attendance ", icon: Attendance, link: navToAtt},
    { name: "View Order ", icon: Order, link: navToOrders },
    { name: "Incident ", icon: Incident, link: navToInc },
  ];

  return (
    <View style={styles.box}>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Home" setModal={setModalVisible} />
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            keyExtractor={(item) => item.name}
            data={CardItems}
            numColumns={1}
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
    paddingBottom: "35%",
  },
});
