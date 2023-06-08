import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import * as GetOrderDetailsActionCreator from "../../../Store/ActionCreator/Order/GetOrderDetailsActionCreator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
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
          {/* <TouchableOpacity>
            <AntDesign
              name="close"
              size={24}
              color="#898989"
              style={styles.close}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.txtInput}>
          <Text style={styles.txt}>From</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.txtInside}>{sender.fullName}</Text>
          </View>
        </View>
        {/* <View style={styles.txtInput}>
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
           
          </View>
        </View> */}
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
    width: wp("100%"),
  },
  subCont: {
    // flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    width: width > 700 ? width / 1.5 : width - 50,
    borderRadius: 25,
    marginBottom: "3%",
    // marginTop: "2%",
    paddingHorizontal: "5%",
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
    height: 45,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    marginLeft: "2%",
    paddingLeft: "2%",
  },
  txt: {
    color: "#023D26",
    fontSize: width > 650 ? RFPercentage(1.8) : RFPercentage(1.6),

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
    fontSize: width > 650 ? RFPercentage(1.6) : RFPercentage(1.4),

    paddingLeft: "3%",
  },
  txtarea: {
    height: 110,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    marginLeft: "2%",
    paddingLeft: "2%",
  },
});
