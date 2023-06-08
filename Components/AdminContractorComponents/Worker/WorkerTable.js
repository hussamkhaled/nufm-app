import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { connect } from "react-redux";
import * as GetWorkersActionCreator from "../../../Store/ActionCreator/Worker/GetWorkersActionCreator";

function WorkerTable({ searchVal, Workers, getWorkers, error }) {
  const [WorkersArr, setWorkersArr] = useState([]);
  useEffect(() => {
    getWorkers();
    sortedArray();
  }, [searchVal]);
  const sortedArray = () => {
    setWorkersArr(
      Workers.filter((cntr) =>
        cntr.fullName.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  };
  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.email}
          ListHeaderComponent={() => {
            return (
              <View style={styles.listhead}>
                <View style={styles.headTitle}>
                  <Text style={styles.header1}>Worker Name</Text>
                </View>
                <View style={styles.headTitle}>
                  <Text style={styles.header2}>Specilization</Text>
                </View>
                <View style={styles.headTitle}>
                  <Text style={styles.header3}>Phone Number</Text>
                </View>
              </View>
            );
          }}
          data={WorkersArr && WorkersArr.length > 0 ? WorkersArr : Workers}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <View style={styles.FacilityContainer}>
                <View style={styles.details}>
                  <Text style={styles.txt}> {item.fullName}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.spec}>{item.specializations}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.phone}>{item.phone}</Text>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    Workers: state.GetWorkersR.Workers,
    error: state.GetWorkersR.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWorkers: () => dispatch(GetWorkersActionCreator.getWorkers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerTable);

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
    paddingHorizontal: "6%",
  },
  headTitle: {
    width: "33%",
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
    paddingLeft: "10%",
  },
  header3: {
    fontWeight: "bold",
    fontSize: RFPercentage(1.5),
    color: "#535353",
    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  FacilityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAEA",
    paddingVertical: "6%",
    paddingHorizontal: "5.5%",
  },
  txt: {
    color: "#9A9999",
    fontSize: RFPercentage(1.4),
    textAlign: "left",

    width: "100%",
  },
  phone: {
    color: "#9A9999",
    fontSize: RFPercentage(1.4),

    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  spec: {
    color: "#9A9999",
    fontSize: RFPercentage(1.4),

    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  details: { width: "33%", alignItems: "center" },
});
