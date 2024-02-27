import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";


const { width, height } = Dimensions.get("window");

function Open({ searchVal, data }) {
  const [WorkersArr, setWorkersArr] = useState([]);
  useEffect(()=>{
    setWorkersArr(data);
  },[])

  useEffect(() => {
    sortedArray();
  }, [searchVal]);

  const sortedArray = () => {
    // 
      const filteredData = data.filter((cntr) =>
        cntr.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    // );
    setWorkersArr(filteredData); 
  };

  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.eid}
          data={WorkersArr}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <View
                // onPress={() => {
                //   Linking.openURL(
                //     "http://api.whatsapp.com/send?phone=" + item.phone
                //   );
                // }}
              >
                <View style={styles.workerContainer}>
                  <View style={styles.workerImg}>
                    {/* <Image source={Avatar} style={styles.img} /> */}
                    <Text style={styles.txt}> {item.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.time}>
                      {item.creationDate.substring(11, 19)}
                    </Text>
                    <Text style={styles.date}>
                      {item.creationDate.substring(0, 10)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

export default Open;

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
