import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import * as LoginActionCreators from "../../Store/ActionCreator/Login/LoginActionCreator";

const { width, height } = Dimensions.get("window");

function CMenu({ link, modalVisible, setModal, error, token, getLoginInfo }) {
  const navigation = useNavigation();
  const navToHome = () => {
    navigation.navigate(link + "Home");
    setModal(false);
  };
  const navToComm = () => {
    navigation.navigate(link + "Communication");
    setModal(false);
  };
  const navToCommWorker = () => {
    navigation.navigate(link + "CommunicationWorker");
    setModal(false);
  };

  const navToCommOcc = () => {
    navigation.navigate(link + "CommunicationOccupant");
    setModal(false);
  };
  const navToIncident = () => {
    navigation.navigate(link + "Incident");
    setModal(false);
  };
  // const navToSupport = () => {
  //   navigation.navigate(link + "Support");
  //   setModal(false);
  // };
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
    // {
    //   name: "Support",
    //   icon: Support,
    //   link: navToSupport,
    // },
  ];

  const MenuItemsWorker = [
    { name: "Home", icon: Home, link: navToHome },
    { name: "Communication", icon: Communication, link: navToCommWorker },
    {
      name: "Risk",
      icon: Risk,
      link: navToRisk,
    },
    // {
    //   name: "Support",
    //   icon: Support,
    //   link: navToSupport,
    // },
  ];
  const MenuItemsOccupant = [
    { name: "Home", icon: Home, link: navToHome },
    { name: "Communication", icon: Communication, link: navToCommOcc },
    // {
    //   name: "Support",
    //   icon: Support,
    //   link: navToSupport,
    // },
  ];
  const [adminName, setAdminName] = useState("");
  const fN = async () => {
    try {
      const adname = await AsyncStorage.getItem("fullName");
      if (adname !== null) {
        setAdminName(adname);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    fN();
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      // alert('Storage successfully cleared!');
    } catch (e) {
      // alert("Failed to clear the async storage.");
    }
  };

  const handleClick = () => {
    clearStorage();
    setModal(false);
    setTimeout(() => navigation.navigate("Login"), 1000);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={() => setModal(false)}>
        <View style={styles.container}>
          <View style={styles.subCont}>
            <View style={styles.txtImg}>
              <Image source={NUFM} style={styles.img} />
              <Text style={styles.txt}>Welcome, {adminName}</Text>
            </View>
            <View style={styles.flexView}>
              <View>
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
              </View>
              <View style={styles.menuFooter}>
                <TouchableOpacity style={styles.logout} onPress={handleClick}>
                  <View style={styles.flexlog}>
                    <MaterialCommunityIcons
                      name="logout"
                      size={26}
                      color="#023D26"
                    />
                    <Text style={styles.txtlog}>Log out</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                  navigation.navigate(link + "Forget");
                 setModal(false);
               }}
                  style={styles.reset}
                >
                  <View style={styles.flexlog}>
                    <MaterialCommunityIcons
                      name="lock-reset"
                      size={26}
                      color="#023D26"
                    />
                    <Text style={styles.txtlog}>Reset Pass</Text>
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
const mapStateToProps = (state) => {
  return {
    email: state.LoginR.email,
    roles: state.LoginR.roles,
    password: state.LoginR.password,
    fullName: state.LoginR.fullName,
    token: state.LoginR.token,
    profileImage: state.LoginR.profileImage,
    phone: state.LoginR.phone,
    loading: state.LoginR.loading,
    creationDate: state.LoginR.creationDate,
    message: state.LoginR.message,
    error: state.LoginR.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginInfo: (name, value) =>
      dispatch(LoginActionCreators.getLoginInfo(name, value)),
    submitLogin: (email, password) =>
      dispatch(LoginActionCreators.submitLogin(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(100,100,100,0.5)",
    width: wp("100%"),
    height: hp("100%"),
  },
  subCont: {
    width: width > 650 ? "45%" : "80%",
    height: "100%",
    backgroundColor: "#023D26",
    paddingTop: width > 650 ? "2%" : "6%",
  },
  img: {
    width: width > 650 ? 160 : 190,
    height: width > 650 ? 110 : 140,
  },
  txtImg: {
    alignItems: "center",
    marginBottom: "8%",
  },
  txt: {
    color: "#fff",
    fontSize: width > 650 ? RFPercentage(2.2) : RFPercentage(2.4),
    paddingTop: "3%",
    fontWeight: "bold",
  },
  flexView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B4D9CB",
    borderRadius: 7,
    width: "42%",
    paddingLeft: "1%",
    marginLeft: "5%",
    paddingVertical: "1.5%",
  },
  reset: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B4D9CB",
    borderRadius: 7,
    width: "42%",
    paddingLeft: "1%",
    marginRight: "5%",
    paddingVertical: "1.5%",
  },
  menuFooter: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: width > 650 ? "5%" : "10%",
  },
});
