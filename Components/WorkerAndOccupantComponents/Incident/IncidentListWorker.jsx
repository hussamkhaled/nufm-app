import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import * as GetIncidentsActionCreator from "../../../Store/ActionCreator/Incident/GetAllIncidentByUser.js";
import * as DeleteIncidentActionCreator from "../../../Store/ActionCreator/Incident/DeleteIncidentActionCreator";

const { width, height } = Dimensions.get("window");

function Incidents({
  searchVal,
  link,
  getIncidentsByUser,
  Incidents,
  error,
  deleteIncidentInfo,
  deleteIncident,
  deleteInc,
  eid,
}) {
  const [workerId, setworkerId] = useState("");
  const workerInfo = async () => {
    try {
      const id = await AsyncStorage.getItem("email");
      if (id !== null) {
        getIncidentsByUser(id);
      }
    } catch (e) {
      alert("Failed to fetch the input from storage");
    }
  };

  useEffect(() => {
    workerInfo();

  }, []);
  const navigation = useNavigation();
  const [IncidentArr, setIncidentArr] = useState([]);
  useEffect(() => {
    getIncidents();
    sortedArray();
  }, [searchVal]);

  useEffect(() => {
    if (Incidents.length > 0) {
      setIncidentArr(Incidents);
    }
  }, [Incidents]);

  const onLoadFunc = () => {
    getIncidents();
  };

  useFocusEffect(
    React.useCallback(() => {
      onLoadFunc();
    }, [])
  );

  const sortedArray = () => {
    setIncidentArr(
      Incidents.filter((cntr) =>
        cntr.sender.fullName.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  };
  useEffect(() => {
    if (deleteInc) {
      deleteIncidentInfo("deleteInc", false);
      getIncidents();
    }
  }, [deleteInc]);

  const handleDeleteIncident = (eid) => {
    deleteIncident(eid);
  };

  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.eid}
          data={Incidents.filter((cntr) =>
            cntr.sender.fullName.toLowerCase().includes(searchVal.toLowerCase())
          )}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(link + "IncidentDet", { id: item.eid })
                }
              >
                <View style={styles.senderContainer}>
                  <View style={styles.senderRec}>
                    <Text style={styles.txt}> {item.sender.fullName}</Text>
                    <Text style={styles.receiver}> {item.facility.name}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => handleDeleteIncident(item.eid)}
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
    Incidents: state.GetIncidentsR.Incidents,
    error: state.GetIncidentsR.error,
    deleteInc: state.DeleteIncidentR.deleteInc,
    eid: state.DeleteIncidentR.eid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIncidentsByUser: (email) => dispatch(GetIncidentsActionCreator.getIncidentsByUser(email)),
    deleteIncidentInfo: (name, value) =>
      dispatch(DeleteIncidentActionCreator.deleteIncidentInfo(name, value)),
    deleteIncident: (eid) =>
      dispatch(DeleteIncidentActionCreator.deleteIncident(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Incidents);

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingVertical: "2%",
  },
  senderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "1%",
    paddingHorizontal: "4%",
    paddingVertical: width > 650 ? "2%" : "4%",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  senderRec: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  receiver: {
    color: "#92BFAE",
    fontSize: width > 650 ? RFPercentage(1.8) : RFPercentage(1.5),
    fontWeight: "bold",
    paddingTop: "1.5%",
  },
  txt: {
    color: "#535353",
    fontSize: width > 650 ? RFPercentage(1.9) : RFPercentage(1.5),
    fontWeight: "bold",
  },
  date: {
    color: "#BCBCBC",
    paddingTop: "2%",
    fontSize: width > 650 ? RFPercentage(1.6) : RFPercentage(1.4),
  },
  close: {
    textAlign: "right",
  },
});
