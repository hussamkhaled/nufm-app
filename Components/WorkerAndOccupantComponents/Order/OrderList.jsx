import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as GetOrdersActionCreator from "../../../Store/ActionCreator/Order/GetOrdersActionCreator";
import * as DeleteOrderActionCreator from "../../../Store/ActionCreator/Order/DeleteOrderActionCreator";

const { width, height } = Dimensions.get("window");

function OrderList({
  searchVal,
  link,
  Orders,
  error,
  getOrders,
  deleteOrderInfo,
  deleteOrder,
  deleteOrd,
  eid,
}) {
  const navigation = useNavigation();

  const [OrderArr, setOrderArr] = useState([]);
  useEffect(() => {
    getOrders();
    sortedArray();
  }, [searchVal]);

  const onLoadFunc = () => {
    getOrders();
  };

  useEffect(() => {
    if (Orders.length > 0) {
      setOrderArr(Orders);
    }
  }, [Orders]);

  useFocusEffect(
    React.useCallback(() => {
      onLoadFunc();
    }, [])
  );

  const sortedArray = () => {
    setOrderArr(
      Orders.filter((cntr) =>
        cntr.sender.fullName.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (deleteOrd) {
      deleteOrderInfo("deleteOrd", false);
      getOrders();
    }
  }, [deleteOrd]);

  const handleDeleteOrder = (e) => {
    deleteOrder(e);
    getOrders();
  };

  return (
    <View style={styles.box}>
      <ScrollView>
        <FlatList
          keyExtractor={(item) => item.eid}
          data={Orders.filter((cntr) =>
            cntr.sender.fullName.toLowerCase().includes(searchVal.toLowerCase())
          )}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(link + "OrderDetails", { id: item.eid })
                }
              >
                <View style={styles.senderContainer}>
                  <View style={styles.senderRec}>
                    <Text style={styles.txt}> {item.sender.fullName}</Text>
                    <Text style={styles.receiver}>
                      {" "}
                      {item.receiver.fullName}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => handleDeleteOrder(item.eid)}
                    >
                      <AntDesign
                        name="close"
                        size={20}
                        color="#898989"
                        style={styles.close}
                      />
                    </TouchableOpacity>
                    <Text style={styles.date}>{item.date}</Text>
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
    Orders: state.GetOrdersR.Orders,
    error: state.GetOrdersR.error,
    deleteOrd: state.DeleteOrderR.deleteOrd,
    eid: state.DeleteOrderR.eid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(GetOrdersActionCreator.getOrders()),
    deleteOrderInfo: (name, value) =>
      dispatch(DeleteOrderActionCreator.deleteOrderInfo(name, value)),
    deleteOrder: (eid) => dispatch(DeleteOrderActionCreator.deleteOrder(eid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingVertical: "2%",
  },
  senderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "1%",
    paddingHorizontal: "4%",
    paddingVertical: width > 650 ? "2%" : "4%",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  senderRec: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  receiver: {
    color: "#92BFAE",
    fontSize: width > 650 ? RFPercentage(1.8) : RFPercentage(1.5),
    fontWeight: "bold",
    paddingTop: "1.5%",
  },
  txt: {
    color: "#535353",
    fontSize: width > 650 ? RFPercentage(1.9) : RFPercentage(1.5),
    fontWeight: "bold",
  },
  date: {
    color: "#BCBCBC",
    paddingTop: "2%",
    fontSize: width > 650 ? RFPercentage(1.6) : RFPercentage(1.4),
  },
  close: {
    textAlign: "right",
  },
});
