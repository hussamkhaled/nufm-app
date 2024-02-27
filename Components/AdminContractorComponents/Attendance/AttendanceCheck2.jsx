import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View, Dimensions,ScrollView,FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import * as AttendanceCheckActionCreator from "../../../Store/ActionCreator/Attendance/AttendanceCheckActionCreator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
function AttendanceCheck2({
  getAttend,
  checkIn,
  checkOut,
  user,
  facility,
  task,
  error,
  loading,
  setFacilityName,
  getAttendanceInfo,
}) {

  const [attend, setattend] = useState("");

  console.log(user +"ahah");
  const route = useRoute();
  
  const id = route.params.id;
  const email = route.params.email;
  const redirectToGoogleMaps = (latitude, longitude) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');}
    const redirectToGoogleMaps1 = (latitude, longitude) => {
      const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(googleMapsUrl, '_blank');}
  
  React.useEffect(() => {
    setattend(id,email);
    getAttend(id,email);
    console.log(attend + "dwdw");
  }, [id,email]);
  
  React.useEffect(() => {
    getAttendanceInfo("id", id,email);
    console.log(id + "dwdw");
  }, [id,email]);

console.log(id+"eeee"+email+"eeeee");



return (
  <>
    {facility.length > 0 ? (

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.listhead}>

          <View style={styles.headTitle}>
            <Text  style={styles.header1}>Facility Name</Text>
            </View>
            <View style={styles.headTitle2}>
            <Text  style={styles.header2}>FACILITY TYPE</Text>
            </View>

            <View style={styles.headTitle3}>
            <Text  style={styles.header3}>DATE</Text>
            </View>

            <View style={styles.headTitle4}>
            <Text  style={styles.header4}>TIME IN</Text>
            </View>
            
            <View style={styles.headTitle5}>
            <Text  style={styles.header5}>TIME OUT</Text>
            </View>
          
{/*
            <View style={styles.headTitle}>
            <Text  style={styles.header1}>TIME IN</Text>
            </View>

            <View style={styles.headTitle}>
            <Text  style={styles.header1}>TIME OUT</Text>
            </View>

            <View style={styles.headTitle}>
            <Text  style={styles.header1}>CHECK IN</Text>
            </View>

            <View style={styles.headTitle}>
            <Text  style={styles.header1}>CHECK OUT</Text>
            </View>

            <View style={styles.headTitle}>
            <Text  style={styles.header1}>STATUS</Text>
            </View>

    */}
          </View>
    
          {/* FlatList */}
          <FlatList
            data={facility}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.AttendanceContainer}>

                      <View style={styles.details}>
                    <Text style={styles.txt}> {item.facility.name}</Text>
                  </View>
                  <View style={styles.details2}>
                    <Text style={styles.Facility}>{item.facility.type}</Text>
                  </View>
                  <View style={styles.details3}>
                    <Text style={styles.Email}>{item.checkIn != null && item.checkIn.date && item.checkIn.date.substr(0, 10)}</Text>
                  </View>

                  <View style={styles.details4}>
                    <Text style={styles.Email4}>{item.checkIn != null && item.checkIn.date && item.checkIn.date.substr(11, 5)}</Text>
                  </View>

                  <View style={styles.details5}>
                    <Text style={styles.Email5}>{item.checkOut != null && item.checkOut.date && item.checkOut.date.substr(11, 5)}</Text>
                  </View>
              
                {/* Additional cells */}
                {/* Uncomment the following lines if needed */}
                {/* 
                <Text style={styles.cell4}>{item.checkOut != null && item.checkOut.date && item.checkOut.date.substr(0, 10)}</Text>
                <Text style={styles.cell5}>{item.checkIn != null && item.checkIn.date && item.checkIn.date.substr(11, 5)}</Text>
                <Text style={styles.cell6}>{item.checkOut != null && item.checkOut.date && item.checkOut.date.substr(11, 5)}</Text>
                <Text style={styles.cell7}>{item.checkOut != null && item.checkOut.date && item.checkOut.date.substr(11, 5)}</Text>
                <Text style={styles.cell8}>{item.status}</Text>
                */}
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
   
   
    ) : null}
  </>
);
}
   
  
const mapStateToProps = (state) => {
  return {
   checkIn: state.GetCheckByIdR.checkIn,
    checkOut: state.GetCheckByIdR.checkOut,
    user: state.GetCheckByIdR.user,
    task: state.GetCheckByIdR.task,
    facility: state.GetCheckByIdR.facility,
    status: state.GetCheckByIdR.status,
    id: state.GetCheckByIdR.id,
    email: state.GetCheckByIdR.email,
    error: state.GetCheckByIdR.error,
    loading: state.GetCheckByIdR.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttend: (id,email) =>
      dispatch(AttendanceCheckActionCreator.getAttend(id,email)),

      getAttendanceInfo: (name, value) =>
      dispatch(AttendanceCheckActionCreator.getAttend(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceCheck2);

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  whiteBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: "5%",
    borderRadius: 25,
    marginBottom: "8%",
    marginTop: "3%",
  },
  listhead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAEA",
    paddingHorizontal: "5%",
   
  },
  headTitle: {
    width: "28%",
    alignItems: "center",
  
  },
  headTitle2: {
    width: "27%",
    alignItems: "center",
  
  },
  headTitle3: {
    width: "17%",
    alignItems: "center",
  },
  headTitle4: {
    width: "15%",
    alignItems: "center",
  },

  headTitle5: {
    width: "55%",
    alignItems: "center",
  },
  header1: {
    fontWeight: "bold",
   // fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    fontSize:8,
 
  },
  header2: {
    fontWeight: "bold",
   // fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    // paddingLeft: "8%",
    fontSize:8
  },
  header3: {
    fontWeight: "bold",
  //  fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    fontSize:8
  },
  header4: {
    fontWeight: "bold",
  //  fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    fontSize:8
  },

  header5: {
    fontWeight: "bold",
  //  fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    fontSize:8
  },
  AttendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAEA",
    paddingVertical: "6%",
    paddingHorizontal: "4%",
  },
  txt: {
    color: "#9A9999",
  //  fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    textAlign: "left",
    width: "100%",
    fontSize:8
  },
  Email: {
    color: "#9A9999",
    //fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    fontSize:8,
   
  },
  Email4: {
    color: "#9A9999",
    //fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    fontSize:8,
   
  },

  Email5: {
    color: "#9A9999",
    //fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    fontSize:8,
   
  },
  
  Facility: {
    color: "#9A9999",
   // fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    // paddingLeft: "10%",
    fontSize:8
  },
  details: { width: "38%", alignItems: "center" ,paddingLeft:25},
  details2: { width: "27%", alignItems: "center" },
  details3: { width: "25%", alignItems: "center" },
  details4: { width: "18%", alignItems: "center" },
  details5: { width: "15%", alignItems: "center" },
});








{/*
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import * as AttendanceCheckActionCreator from "../../../Store/ActionCreator/Attendance/AttendanceCheckActionCreator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
function AttendanceCheck({
  getCheckById,
  checkIn,
  checkOut,
  user,
  facility,
  task,
  eid,
  error,
  loading,
  setFacilityName,
}) {
  const route = useRoute();
  const id = route.params.id;
  useEffect(() => {
    getCheckById(id);
  }, []);

  useEffect(() => {
    if (facility != "") {
      setFacilityName(facility.name);
    }
  }, [facility]);

  return (
    <View style={styles.container}>
      <View style={styles.boxIcon}>
        <View style={styles.greyBox}>
          <Text style={styles.Check}>Check In {checkIn.date.substr(0,10)} at {checkIn.date.substr(11,5)}</Text>
          <Text style={styles.datetime}>
            {checkIn.lng} / {checkIn.lat}
          </Text>
        </View>
        <Ionicons name="location" size={30} color="#023D26" />
      </View>
      <View style={styles.boxIcon}>
        <View style={styles.greyBox}>
          <Text style={styles.Check}>Check Out {checkOut.date.substr(0,10)} at {checkOut.date.substr(11,5)}</Text>
          <Text style={styles.datetime}>
            {checkOut.lng} / {checkOut.lat}
          </Text>
        </View>
        <Ionicons name="location" size={30} color="#023D26" />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    checkIn: state.GetCheckByIdR.checkIn,
    checkOut: state.GetCheckByIdR.checkOut,
    user: state.GetCheckByIdR.user,
    task: state.GetCheckByIdR.task,
    facility: state.GetCheckByIdR.facility,
    eid: state.GetCheckByIdR.eid,
    error: state.GetCheckByIdR.error,
    loading: state.GetCheckByIdR.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCheckById: (eid) =>
      dispatch(AttendanceCheckActionCreator.getCheckById(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceCheck);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: "6%",
    paddingBottom: "3%",
  },
  boxIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greyBox: {
    height: width > 650 ? 80 : 85,
    backgroundColor: "#F0F0F0",
    width: "85%",
    borderRadius: 15,
    marginRight: "2%",
    marginVertical: "3%",
    flexDirection: "column",
    paddingHorizontal: "6%",
    justifyContent: "center",
  },
  datetime: {
    fontSize: width > 650 ? RFPercentage(1.5) : RFPercentage(1.35),
    paddingTop: "1.5f%",
    color: "#676767",
  },
  Check: {
    fontSize: width > 650 ? RFPercentage(2) : RFPercentage(1.8),

    color: "#023D26",
    fontWeight: "bold",
  },
});

*/}

{/*
















return (
    
    <>
    
    {user.length > 0 && user.map((row, index) => (
      <View key={index} style={styles.container}>
        <View style={styles.boxIcon}>
          <View style={styles.greyBox}>
            <Text style={styles.Check}>Check In {row.email} at {row.fullName}</Text>
            <Text style={styles.datetime}>
              {} / {}
            </Text>
          </View>
          <Ionicons name="location" size={30} color="#023D26" />
        </View>
        <View style={styles.boxIcon}>
          <View style={styles.greyBox}>
            <Text style={styles.Check}>Check Out {} at {}</Text>
            <Text style={styles.datetime}>
              {} / {}
            </Text>
          </View>
          <Ionicons name="location" size={30} color="#023D26" />
        </View>
      </View>
    ))}
  </>
);
};

*/}