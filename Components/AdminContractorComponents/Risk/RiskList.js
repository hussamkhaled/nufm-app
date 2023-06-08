import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as GetRisksActionCreator from "../../../Store/ActionCreator/Risk/GetRisksActionCreator";
import * as DeleteRiskActionCreator from "../../../Store/ActionCreator/Risk/DeleteRiskActionCreator";

function Risks({
  link,
  searchVal,
  Risks,
  getRisks,
  error,
  deleteRiskInfo,
  deleteRisk,
  deleteRsk,
  eid,
}) {
  const navigation = useNavigation();
  const [RiskArr, setRiskArr] = useState([]);

  useEffect(() => {
    getRisks();
    sortedArray();
  }, [searchVal]);

  const sortedArray = () => {
    setRiskArr(
      Risks.filter((cntr) =>
        cntr.sender.fullName.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (deleteRsk) {
      deleteRiskInfo("deleteRsk", false);
      getRisks();
    }
  }, [deleteRsk]);

  const handleDeleteRisk = (eid) => {
    deleteRisk(eid);
  };

  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) =>item.id}
          data={RiskArr && RiskArr.length > 0 ? RiskArr : Risks}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(link + "RiskDet", { id: item.id })
                }
              >
                <View style={styles.senderContainer}>
                  <View style={styles.senderRec}>
                  <Text style={styles.txt}> {item.sender.fullName}</Text>
                    <Text style={styles.receiver}> {item.facility.name}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => handleDeleteRisk(item.id)}
                    >
                      <AntDesign
                        name="close"
                        size={20}
                        color="#898989"
                        style={styles.close}
                      />
                    </TouchableOpacity>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    Risks: state.GetRisksR.Risks,
    error: state.GetRisksR.error,
    deleteRsk: state.DeleteRiskR.deleteRsk,
    eid: state.DeleteRiskR.eid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRisks: () => dispatch(GetRisksActionCreator.getRisks()),
    deleteRiskInfo: (name, value) =>
      dispatch(DeleteRiskActionCreator.deleteRiskInfo(name, value)),
    deleteRisk: (eid) => dispatch(DeleteRiskActionCreator.deleteRisk(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Risks);

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingVertical: "2%",
  },
  senderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "2%",
    paddingHorizontal: "4%",
    paddingVertical: "4%",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  senderRec: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  receiver: {
    color: "#92BFAE",
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
    paddingTop: "1.5%",
  },
  txt: {
    color: "#535353",
    fontSize: RFPercentage(1.8),
    fontWeight: "bold",
  },
  date: {
    color: "#BCBCBC",
    paddingTop: "2%",
    fontSize: RFPercentage(1.4),
  },
  close: {
    textAlign: "right",
  },
});
