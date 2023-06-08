import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import SearchInput from "../../../Components/SharedComponents/SearchInput";
import WorkerTable from "../../../Components/AdminContractorComponents/Worker/WorkerTable";


const { width, height } = Dimensions.get("window");
export default function Workers({link}) {
  const navigation = useNavigation();

  const [searchVal, setSearchVal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.box}>
      <View>
        <CMenu link={link} modalVisible={modalVisible} setModal={setModalVisible} />
      </View>
      <Header link={link} title="Worker" setModal={setModalVisible} />
      <View style={styles.whiteBox}>
        <Text style={styles.txt}> Workers</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3%",
            width: "100%",
            height: "10%",
          }}
        >
          <SearchInput
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            bgColor="#F1F1F1"
          />
          {width > 600 ? (
           <TouchableOpacity
           onPress={() => {
             navigation.navigate(link+"AddWorker");
           }}
         >
           <View style={styles.btnSiteLg}>
             <Ionicons name="add-outline" size={22} color="#fff" />
             {/* <Text style={styles.addSite}>ADD Worker</Text> */}
           </View>
         </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
        <WorkerTable searchVal={searchVal} />
      </View>
      {width < 600 ? (
       <TouchableOpacity
       onPress={() => {
         navigation.navigate(link+"AddWorker");
       }}
     >
       <View style={styles.btnSite}>
         <Ionicons name="add-outline" size={22} color="#fff" />
         <Text style={styles.addSite}>ADD Worker</Text>
       </View>
     </TouchableOpacity>
      ) : (
        <View></View>
      )}
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
  whiteBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: wp("5%"),
    borderRadius: 25,
    marginBottom: hp("5%"),
    marginTop: hp("2%"),
  },
  txt: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: "#023D26",
    paddingHorizontal: "4.5%",
    paddingBottom: "4%",
    paddingTop: "6%",
  },
  btnSite: {
    flexDirection: "row",
    backgroundColor: "#309694",
    borderRadius: 12,
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "2.3%",
    justifyContent: "center",
    marginHorizontal: wp("5%"),
    marginBottom: hp("4%"),
  },
  btnSiteLg: {
    flexDirection: "row",
    backgroundColor: "#309694",
    borderRadius: 100,
    width: 50,
    height: 50,
    // paddingHorizontal: "2%",
    alignItems: "center",
    // paddingVertical:"2.9%",
    // height: "100%",
    justifyContent: "center",
    marginRight: "3%",
  },
  addSite: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: "2%",
  },
});
