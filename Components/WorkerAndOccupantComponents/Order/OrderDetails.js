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
import * as GetOrderDetailsActionCreator from "../../../Store/ActionCreator/Order/GetOrderDetailsActionCreator";

function OrderDetails({
  sender,
  receiver,
  email,
  status,
  phoneNumber,
  facility,
  date,
  orderContent,
  comment,
  eid,
  error,
  loading,
  getOrderDetails,
}) {
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();
  useEffect(() => {
    getOrderDetails(id);
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
          <Text style={styles.txt}>From</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{sender.fullName}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Email</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{email}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txtMulti}>Phone Number</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txtMulti}>Facility Parent</Text>
          <View style={styles.disabledInput}>
            {/* <Text style={styles.txtInside}>{facility.parent.name}</Text> */}
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Date</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{date}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Order</Text>
          <View style={styles.txtarea}>
            <Text style={styles.txtInside}>{orderContent}</Text>
          </View>
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>Comment</Text>
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
    sender: state.GetOrderDetailsR.sender,
    receiver: state.GetOrderDetailsR.receiver,
    facility: state.GetOrderDetailsR.facility,
    email: state.GetOrderDetailsR.email,
    eid: state.GetOrderDetailsR.eid,
    error: state.GetOrderDetailsR.error,
    orderContent: state.GetOrderDetailsR.orderContent,
    date: state.GetOrderDetailsR.date,
    phone: state.GetOrderDetailsR.phone,
    comment: state.GetOrderDetailsR.comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderDetails: (eid) =>
      dispatch(GetOrderDetailsActionCreator.getOrderDetails(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

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
    aspectRatio: 0.64 / 1,
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
    width: "78%",
    justifyContent: "center",
    marginLeft: "2%",
    paddingLeft: "2%",
  },
  txt: {
    color: "#023D26",
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
  },
  txtMulti: {
    color: "#023D26",
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
    width: "18%",
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
    width: "78%",
    justifyContent: "center",
    marginLeft: "2%",
    paddingLeft: "2%",
  },
});
