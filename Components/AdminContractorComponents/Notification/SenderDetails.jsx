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
import * as GetNotifDetailsActionCreator from "../../../Store/ActionCreator/Notification/GetNotifDetailsActionCreator";

function SenderDetails({
  sender,
  status,
  receiver,
  date,
  note,
  error,
  getNotificationDetails,
}) {
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();
  useEffect(() => {
    getNotificationDetails(id);
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
            <Text style={styles.txtInside}>{sender}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Status</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{status}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Receiver</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{receiver}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Date</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{date}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Note</Text>
          <View style={styles.txtarea}>
            <Text style={styles.txtInside}>{note}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    sender: state.GetNotificationDetailsR.sender,
    status: state.GetNotificationDetailsR.status,
    receiver: state.GetNotificationDetailsR.receiver,
    date: state.GetNotificationDetailsR.date,
    eid: state.GetNotificationDetailsR.eid,
    error: state.GetNotificationDetailsR.error,
    note: state.GetNotificationDetailsR.note,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationDetails: (eid) =>
      dispatch(GetNotifDetailsActionCreator.getNotificationDetails(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SenderDetails);

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
    aspectRatio: 0.9 / 1,
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
    aspectRatio: 2.5 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    marginLeft: "2%",
    paddingLeft: "2%",
  },
});
