import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { connect } from "react-redux";
import * as GetAllSafety from "../../../Store/ActionCreator/Safety/GetAllSafetyMaterialActionCreator.js";
const { width, height } = Dimensions.get("window");

function SafetyTable({ searchVal,safetyMaterials,getAllSafetyMaterials, error }) {
  const [FacilitiesArr, setFacilitiesArr] = useState([]);
  useEffect(() => {
    getAllSafetyMaterials();
    sortedArray();
  }, [searchVal]);

  useEffect(() => {
    if (safetyMaterials.length > 0) {
      setFacilitiesArr(safetyMaterials);
    }
  }, [safetyMaterials]);

  const onLoadFunc = () => {
    getAllSafetyMaterials();
  };

  useFocusEffect(
    React.useCallback(() => {
      onLoadFunc();
    }, [])
  );

  const sortedArray = () => {
    setFacilitiesArr(
      safetyMaterials.filter((cntr) =>
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
                  <Text style={styles.header1}>Material Name</Text>
                </View>
                <View style={styles.headTitle}>
                  <Text style={styles.header2}>Creation Date</Text>
                </View>
                <View style={styles.headTitle}>
                  <Text style={styles.header3}>Update Date</Text>
                </View>
              </View>
            );
          }}
          data={safetyMaterials.filter((cntr) =>
            cntr.name.toLowerCase().includes(searchVal.toLowerCase())
          )}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <View style={styles.FacilityContainer}>
                <View style={styles.details}>
                  <Text style={styles.txt}> {item.name}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.location}>{item.createdAt.substr(0, 10)}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.type}>{item.updatedAt.substr(0, 10)}</Text>
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
    safetyMaterials: state.GetAllSafetyMaterialR.safetyMaterials,
    error: state.GetAllSafetyMaterialR.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSafetyMaterials: () =>
    dispatch(GetAllSafety.getAllSafetyMaterials()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SafetyTable);

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
    paddingHorizontal: "6%",
  },
  headTitle: {
    width: "33%",
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
    paddingLeft: "10%",
  },
  header3: {
    fontWeight: "bold",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
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
    paddingVertical: "5%",
    paddingHorizontal: "5.5%",
  },
  txt: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    textAlign: "left",

    width: "100%",
  },
  type: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  location: {
    color: "#9A9999",
    fontSize: width > 700 ? RFPercentage(1.8) : RFPercentage(1.4),
    width: "100%",
    textAlign: "left",
    paddingLeft: "10%",
  },
  details: { width: "33%", alignItems: "center" },
});
