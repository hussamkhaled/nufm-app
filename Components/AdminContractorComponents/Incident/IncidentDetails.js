import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import * as GetIncidentDetailsActionCreator from "../../../Store/ActionCreator/Incident/GetIncidentDetailsActionCreator";

function IncidentDetails({
  getIncidentDetails,
  sender,
  date,
  ihour,
  facility,
  task,
  incident,
  comment,
  eid,
  error,
}) {
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();
  useEffect(() => {
    getIncidentDetails(id);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subCont}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "4%",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} color="#309694" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="close"
              size={24}
              color="#898989"
              style={styles.close}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Sender</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{sender.fullName}</Text>
          </View>
        </View>
    
       
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Facility</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{facility.name}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Task</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{task.name}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Incident</Text>
          <View style={styles.txtarea}>
            <Text style={styles.txtInside}>{incident}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Note</Text>
          <View style={styles.txtarea}>
            <Text style={styles.txtInside}>{comment}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    sender: state.GetIncidentDetailsR.sender,
    date: state.GetIncidentDetailsR.date,
    ihour: state.GetIncidentDetailsR.ihour,
    facility: state.GetIncidentDetailsR.facility,
    task: state.GetIncidentDetailsR.task,
    eid: state.GetIncidentDetailsR.eid,
    error: state.GetIncidentDetailsR.error,
    incident: state.GetIncidentDetailsR.incident,
    note: state.GetIncidentDetailsR.note,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIncidentDetails: (eid) =>
      dispatch(GetIncidentDetailsActionCreator.getIncidentDetails(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetails);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "7%",
  },
  subCont: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 25,
    aspectRatio: 0.75 / 1,
    width: "100%",
    paddingHorizontal: "6%",
    paddingVertical: "5%",
  },
  txtInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginVertical: "2.5%",
  },
  disabledInput: {
    aspectRatio: 7.9 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    marginLeft: "2%",
    paddingLeft: "2%",
  },
  txt: {
    color: "#023D26",
    fontSize: RFPercentage(1.6),
    fontWeight: "bold",
  },
  txtInside: {
    color: "#535353",
    fontSize: RFPercentage(1.4),
    paddingLeft: "3%",
  },
  txtarea: {
    aspectRatio: 3 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    marginLeft: "2%",
    paddingLeft: "2%",
  },
});
