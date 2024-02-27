import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as GetAttendancesActionCreator from "../../../Store/ActionCreator/Attendance/GetAttendancesActionCreator";

const { width, height } = Dimensions.get("window");

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

  useEffect(() => {
    if (Attendances.length > 0) {
      setAttendancesArr(Attendances);
    }
  }, [Attendances]);

  const onLoadFunc = () => {
    getAttendances();
  };

  useFocusEffect(
    React.useCallback(() => {
      onLoadFunc();
    }, [])
  );

  const sortedArray = () => {
    setAttendancesArr(
      Attendances.filter((cntr) =>
        cntr.name.toLowerCase().includes(searchVal.toLowerCase())
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
                <View style={styles.headTitle2}>
                  <Text style={styles.header2}>Facility</Text>
                </View>
                <View style={styles.headTitle3}>
                  <Text style={styles.header3}>Task </Text>
                </View>
              </View>
            );
          }}
          data={Attendances.filter((cntr) =>
            cntr.name.toLowerCase().includes(searchVal.toLowerCase())
          )}
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
                    <Text style={styles.txt}> {item.name}</Text>
                  </View>
                  <View style={styles.details2}>
                    <Text style={styles.Facility}>{item.street}</Text>
                  </View>
                  <View style={styles.details3}>
                    <Text style={styles.Email}>{item.type}</Text>
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
    width: "35%",
    alignItems: "center",
  },
  headTitle2: {
    width: "35%",
    alignItems: "center",
  },
  headTitle3: {
    width: "30%",
    alignItems: "center",
  },
  header1: {
    fontWeight: "bold",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",
    textAlign: "left",
  },
  header2: {
    fontWeight: "bold",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    // paddingLeft: "8%",
  },
  header3: {
    fontWeight: "bold",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
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
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    textAlign: "left",
    width: "100%",
  },
  Email: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
  },
  Facility: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    // paddingLeft: "10%",
  },
  details: { width: "34%", alignItems: "center" },
  details2: { width: "34%", alignItems: "center" },
  details3: { width: "29%", alignItems: "center" },
});





