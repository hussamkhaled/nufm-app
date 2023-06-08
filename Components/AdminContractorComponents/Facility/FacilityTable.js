import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { connect } from "react-redux";
import * as GetFacilitiesActionCreator from "../../../Store/ActionCreator/Fcaility/GetFacilitiesActionCreator";

function FacilityTable({ searchVal, Facilities, getFacilities, error }) {
  const [FacilitiesArr, setFacilitiesArr] = useState([]);
  useEffect(() => {
    getFacilities();
    sortedArray();
  }, [searchVal]);
  const sortedArray = () => {
    setFacilitiesArr(
      Facilities.filter((cntr) =>
        cntr.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  };
  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.name}
          ListHeaderComponent={() => {
            return (
              <View style={styles.listhead}>
                <View style={styles.headTitle}>
                  <Text style={styles.header1}>Facility Name</Text>
                </View>
                <View style={styles.headTitle}>
                  <Text style={styles.header2}>Location</Text>
                </View>
                <View style={styles.headTitle}>
                  <Text style={styles.header3}>Facility Type</Text>
                </View>
              </View>
            );
          }}
          data={
            FacilitiesArr && FacilitiesArr.length > 0
              ? FacilitiesArr
              : Facilities
          }
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <View style={styles.FacilityContainer}>
                <View style={styles.details}>
                  <Text style={styles.txt}> {item.name}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.type}>{item.type}</Text>
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
    Facilities: state.GetFacilitiesR.Facilities,
    error: state.GetFacilitiesR.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: () => dispatch(GetFacilitiesActionCreator.getFacilities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilityTable);

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
  type: {
    color: "#9A9999",
    fontSize: RFPercentage(1.4),

    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  location: {
    color: "#9A9999",
    fontSize: RFPercentage(1.4),

    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  details: { width: "33%", alignItems: "center" },
});
