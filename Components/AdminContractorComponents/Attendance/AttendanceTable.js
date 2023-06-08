import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as GetAttendancesActionCreator from "../../../Store/ActionCreator/Attendance/GetAttendancesActionCreator";

function AttendanceTable({
  searchVal,
  link,
  Attendances,
  getAttendances,
  error,
}) {
  const navigation = useNavigation();

  const [AttendancesArr, setAttendancesArr] = useState([]);
  useEffect(() => {
    getAttendances();
    sortedArray();
  }, [searchVal]);
  const sortedArray = () => {
    setAttendancesArr(
      Attendances.filter((cntr) =>
        cntr.user.fullName.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  };
  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.eid}
          ListHeaderComponent={() => {
            return (
              <View style={styles.listhead}>
                <View style={styles.headTitle}>
                  <Text style={styles.header1}>Name</Text>
                </View>
                <View style={styles.headTitle}>
                  <Text style={styles.header2}>Facility</Text>
                </View>
                <View style={styles.headTitle3}>
                  <Text style={styles.header3}>Email </Text>
                </View>
              </View>
            );
          }}
          data={
            AttendancesArr && AttendancesArr.length > 0
              ? AttendancesArr
              : Attendances
          }
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(link + "CheckAttendance", {
                    id: item.eid,
                  })
                }
              >
                <View style={styles.AttendanceContainer}>
                  <View style={styles.details}>
                    <Text style={styles.txt}> {item.user.fullName}</Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.Facility}>{item.facility.name}</Text>
                  </View>
                  <View style={styles.details3}>
                    <Text style={styles.Email}>{item.user.email}</Text>
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
    Attendances: state.GetAttendancesR.Attendances,
    error: state.GetAttendancesR.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttendances: () =>
      dispatch(GetAttendancesActionCreator.getAttendances()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);

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
  txt: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#023D26",
    padding: "5%",
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
    width: "30%",
    alignItems: "center",
  },
  headTitle3: {
    width: "40%",
    alignItems: "center",
  },
  header1: {
    fontWeight: "bold",
    fontSize: RFPercentage(1.5),
    color: "#535353",
    width: "100%",
    textAlign: "left",
  },
  header2: {
    fontWeight: "bold",
    fontSize: RFPercentage(1.5),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    paddingLeft: "8%",
  },
  header3: {
    fontWeight: "bold",
    fontSize: RFPercentage(1.5),
    color: "#535353",
    width: "100%",
    textAlign: "left",
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
    fontSize: RFPercentage(1.3),
    textAlign: "left",

    width: "100%",
  },
  Email: {
    color: "#9A9999",
    fontSize: RFPercentage(1.3),
    width: "100%",
    textAlign: "left",
  },
  Facility: {
    color: "#9A9999",
    fontSize: RFPercentage(1.3),
    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  details: { width: "30%", alignItems: "center" },
  details3: { width: "40%", alignItems: "center" },
});
