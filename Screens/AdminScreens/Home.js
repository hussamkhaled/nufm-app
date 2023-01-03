import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import CMenu from "../../Components/SharedComponents/CMenu";
import Header from "../../Components/SharedComponents/Header";
import Cards from "../../Components/SharedComponents/Cards";
import Facility from "../../assets/Facility.png";
import Worker from "../../assets/Worker.png";
import Attendance from "../../assets/Attendance.png";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const navToFac = () => {
    navigation.navigate("Facilities");
  };
  const CardItems = [
    { name: "Facility Management", icon: Facility, link: navToFac },
    { name: "Worker Management", icon: Worker, link: navToFac },
    { name: "Attendance Management", icon: Attendance, link: navToFac },
  ];

  return (
    <View style={styles.box}>
      <View>
        <CMenu modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header title="Home" setModal={setModalVisible} />
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