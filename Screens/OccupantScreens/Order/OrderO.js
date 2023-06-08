import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import OrderList from "../../../Components/WorkerAndOccupantComponents/Order/OrderList";
import { useNavigation } from "@react-navigation/native";

export default function OrderO({ link }) {
  const navigation = useNavigation();

  const handleChange = (searchVal) => {
    setSearchVal(searchVal);
  };
  const [searchVal, setSearchVal] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.box}>
      <View>
        <CMenu
          link={link}
          modalVisible={modalVisible}
          setModal={setModalVisible}
        />
      </View>
      <Header link={link} title="Order" setModal={setModalVisible} />
      <View style={styles.listBox}>
        <View style={styles.container}>
          <View style={styles.searchSection}>
            <View style={styles.searchIcon}>
              <EvilIcons name="search" size={24} color="#B7B6B6" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={handleChange}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(link + "AddOrder")}
          >
            <View>
              <MaterialIcons name="add-box" size={40} color="#309694" />
            </View>
          </TouchableOpacity>
        </View>

        <OrderList link={link} searchVal={searchVal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  listBox: {
    flex: 1,
    marginHorizontal: "7%",
    marginBottom: "8%",
    marginTop: "3%",
    paddingTop: "5%",
  },
  input: {
    width: "90%",
    aspectRatio: 7.9 / 1,
    backgroundColor: "#FFF",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingLeft: "2%",
    fontSize: RFPercentage(1.5),
  },
  container: {
    marginRight: "10%",
    marginBottom: "4%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 8.79 / 1,
  },
  searchIcon: {
    backgroundColor: "#FFF",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingLeft: "2%",
  },
});
