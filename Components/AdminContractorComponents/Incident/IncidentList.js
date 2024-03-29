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
import * as GetIncidentsActionCreator from "../../../Store/ActionCreator/Incident/GetIncidentsActionCreator";
import * as DeleteIncidentActionCreator from "../../../Store/ActionCreator/Incident/DeleteIncidentActionCreator";

function Incidents({
  searchVal,
  link,
  getIncidents,
  Incidents,
  error,
  deleteIncidentInfo,
  deleteIncident,
  deleteInc,
  eid,
}) {
  const navigation = useNavigation();
  const [IncidentArr, setIncidentArr] = useState([]);
  useEffect(() => {
    getIncidents();
    sortedArray();
  }, [searchVal]);

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
          data={IncidentArr && IncidentArr.length > 0 ? IncidentArr : Incidents}
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
    getIncidents: () => dispatch(GetIncidentsActionCreator.getIncidents()),
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
