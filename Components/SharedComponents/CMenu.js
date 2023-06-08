import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Home from "../../assets/Home.png";
import Communication from "../../assets/Communication.png";
import Incident from "../../assets/Incident.png";
import Risk from "../../assets/Risk.png";
import Support from "../../assets/Support.png";
import Login from "../../assets/Login.png";
import NUFM from "../../assets/NUFM.png";

export default function CMenu({ link, modalVisible, setModal }) {
  const navigation = useNavigation();
  // useEffect(()=>{
  //   console.log(link)
  // },[])
  const navToHome = () => {
    navigation.navigate(link + "Home");
    setModal(false);
  };
  const navToComm = () => {
    navigation.navigate(link + "Communication");
    setModal(false);
  };
  const navToIncident = () => {
    navigation.navigate(link + "Incident");
    setModal(false);
  };
  const navToSupport = () => {
    navigation.navigate(link + "Support");
    setModal(false);
  };
  const navToRisk = () => {
    navigation.navigate(link + "Risk");
    setModal(false);
  };
  const MenuItems = [
    { name: "Home", icon: Home, link: navToHome },
    { name: "Communication", icon: Communication, link: navToComm },
    {
      name: "Incident",
      icon: Incident,
      link: navToIncident,
    },
    {
      name: "Risk",
      icon: Risk,
      link: navToRisk,
    },
    {
      name: "Support",
      icon: Support,
      link: navToSupport,
    },
  ];

  const MenuItemsWorker = [
    { name: "Home", icon: Home, link: navToHome },
    { name: "Communication", icon: Communication, link: navToComm },
    {
      name: "Risk",
      icon: Risk,
      link: navToRisk,
    },
    {
      name: "Support",
      icon: Support,
      link: navToSupport,
    },
  ];
  const MenuItemsOccupant = [
    { name: "Home", icon: Home, link: navToHome },
    { name: "Communication", icon: Communication, link: navToComm },
    {
      name: "Support",
      icon: Support,
      link: navToSupport,
    },
  ];
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={() => setModal(false)}>
        <View style={styles.container}>
          <View style={styles.subCont}>
            <View style={styles.txtImg}>
              <Image source={NUFM} style={styles.img} />
              <Text style={styles.txt}>Welcome, John</Text>
            </View>
            <View style={styles.flexView}>
              <View>
                <ScrollView>
                  <FlatList
                    keyExtractor={(item) => item.name}
                    data={
                      link === "Worker/"
                        ? MenuItemsWorker
                        : link === "Occupant/"
                        ? MenuItemsOccupant
                        : MenuItems
                    }
                    numColumns={1}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={item.link}>
                          <View style={styles.menuItem}>
                            <Image source={item.icon} />
                            <Text style={styles.txtMenu}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </ScrollView>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity style={styles.logout}>
                  <View style={styles.flexlog}>
                    <MaterialCommunityIcons
                      name="logout"
                      size={28}
                      color="#023D26"
                    />
                    <Text style={styles.txtlog}>Log out</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(link + "Reset");
                    setModal(false);
                  }}
                  style={styles.reset}
                >
                  <View>
                    <Text style={styles.txtlog}>Reset Password</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(100,100,100,0.5)",
  },
  subCont: {
    width: "80%",
    height: "100%",
    backgroundColor: "#023D26",
    paddingTop: "6%",
  },
  img: {
    width: 190,
    height: 140,
  },
  txtImg: {
    alignItems: "center",
    marginBottom: "8%",
  },
  txt: {
    color: "#fff",
    fontSize: RFPercentage(2.4),
    paddingTop: "3%",
    fontWeight: "bold",
  },
  flexView: {
    flex: 1,
    justifyContent: "space-between",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "7%",
    marginVertical: "3%",
    alignItems: "center",
  },
  txtMenu: {
    color: "#fff",
    paddingHorizontal: "7%",
    fontSize: RFPercentage(2),
  },
  txtlog: {
    color: "#023D26",
    paddingHorizontal: "7%",
    fontWeight: "bold",
    fontSize: RFPercentage(1.7),
  },
  flexlog: {
    flexDirection: "row",
    alignItems: "center",
  },
  logout: {
    flexDirection: "row",
    paddingLeft: "2%",
    marginBottom: "10%",
    alignItems: "center",
    backgroundColor: "#B4D9CB",
    borderRadius: 7,
    width: "42%",
    marginLeft: "5%",
    paddingVertical: "1%",
  },
  reset: {
    flexDirection: "row",
    marginBottom: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B4D9CB",
    borderRadius: 7,
    width: "41%",
    marginHorizontal: "6%",
    paddingVertical: "2.5%",
  },
});
