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
import * as GetRiskDetailsActionCreator from "../../../Store/ActionCreator/Risk/GetRiskDetailsActionCreator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
function RiskDetails({
  getRiskDetails,
  sender,
  site,
  facility,
  risk,
  comment,
  id,
  error,
}) {
  const route = useRoute();
  const eid = route.params.id;
  const navigation = useNavigation();
  useEffect(() => {
    getRiskDetails(eid);
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
          <Text style={styles.txt}>Risk</Text>
          <View style={styles.txtarea}>
            <Text style={styles.txtInside}>{risk}</Text>
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
    sender: state.GetRiskDetailsR.sender,
    facility: state.GetRiskDetailsR.facility,
    id: state.GetRiskDetailsR.id,
    error: state.GetRiskDetailsR.error,
    risk: state.GetRiskDetailsR.risk,
    comment: state.GetRiskDetailsR.comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRiskDetails: (id) =>
      dispatch(GetRiskDetailsActionCreator.getRiskDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskDetails);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: wp("100%"),
  },
  subCont: {
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
