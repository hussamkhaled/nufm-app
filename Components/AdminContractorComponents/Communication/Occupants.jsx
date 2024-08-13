import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import Avatar from "../../../assets/avatar.png";
import { connect } from "react-redux";
import * as GetOccupantsActionCreator from "../../../Store/ActionCreator/Occupants/GetOccupantsActionCreator";

const { width, height } = Dimensions.get("window");

function Occupants({ searchVal, Occupants, getOccupants }) {
  const [OccupantsArr, setOccupantsArr] = useState([]);
  useEffect(() => {
    getOccupants();
    sortedArray();
  }, [searchVal]);
  const sortedArray = () => {
    setOccupantsArr(
      Occupants.filter((cntr) =>
        cntr.fullName.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  };

  
  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.email}
          data={
            OccupantsArr && OccupantsArr.length > 0 ? OccupantsArr : Occupants
          }
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "http://api.whatsapp.com/send?phone=" + item.phone
                  );
                }}
              >

                <View style={styles.workerContainer}>
                  <View style={styles.workerImg}>
                    <Image source={Avatar} style={styles.img} />
                    <Text style={styles.txt}> {item.fullName}</Text>
                  </View>
                  <View>
                    <Text style={styles.time}>
                     {/* {item.createdAt.substring(11, 19)} */}

                      {new Date(item.createdAt).toLocaleTimeString("en-AU", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                    </Text>
                    <Text style={styles.date}>
                     {/*     {item.createdAt.substring(0, 10)}   */}
                     {item.createdAt.substring(8, 10)}/{item.createdAt.substring(5, 7)}/{item.createdAt.substring(0, 4)}
                    </Text>
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
    Occupants: state.GetOccupantsR.Occupants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOccupants: () => dispatch(GetOccupantsActionCreator.getOccupants()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Occupants);

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    flex: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: "2%",
  },
  img: {
    width: 50,
    height: 50,
  },
  workerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "4%",
    paddingHorizontal: "4%",
  },
  workerImg: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    color: "#535353",
    paddingLeft: "3%",
    fontSize: width > 700 ? RFPercentage(1.9) : RFPercentage(1.7),
    fontWeight: "bold",
  },
  date: {
    color: "#BCBCBC",
    paddingTop: "2%",
    fontSize: width > 700 ? RFPercentage(1.6) : RFPercentage(1.4),
  },
  time: {
    color: "#A2A2A2",
    fontSize: width > 700 ? RFPercentage(1.6) : RFPercentage(1.4),
    textAlign: "right",
  },
});
