import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { connect } from "react-redux";
import * as AddFacilityActionCreator from "../../../Store/ActionCreator/Fcaility/AddFacilityActionCreator";

const { width, height } = Dimensions.get("window");

function AddStep2({ link, workSchedule, primaryEmail, getFacilityInfo }) {
  const navigation = useNavigation();
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  useEffect(() => {
    getFacilityInfo("primaryEmail", "");
    getFacilityInfo("workSchedule", "");
  }, []);
  const [work, setWork] = useState([
    {
      item: "",
      weeks: "",
      total: "",
      hoursPerDay: "",
    },
  ]);
  const addInputW = () => {
    setWork([
      ...work,
      {
        item: "",
        weeks: "",
        total: "",
        hoursPerDay: "",
      },
    ]);
  };

  const removeInputW = (index) => {
    const rows = [...work];
    rows.pop();
    setWork(rows);

    let toHours = 0,
      toWeeks = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].total > 0) {
        toHours += parseFloat(rows[i].total);
      }
      if (rows[i].weeks > 0) {
        toWeeks += parseFloat(rows[i].weeks);
      }
    }
    setTotalWeeks(toWeeks);
    setTotalHours(toHours);
  };
  const handleChangeItemDFrom = (index, value) => {
    const list = [...work];
    list[index].item = value;
    setWork(list);
  };
  const handleChangeItemHFrom = (index, value) => {
    const list = [...work];
    list[index].weeks = value;
    setWork(list);

    let toHours = 0,
      toWeeks = 0;

    for (let i = 0; i < list.length; i++) {
      if (list[i].total > 0) {
        toHours += parseFloat(list[i].total);
      }
      if (list[i].weeks > 0) {
        toWeeks += parseFloat(list[i].weeks);
      }
    }
    setTotalWeeks(toWeeks);
    setTotalHours(toHours);
  };
  const handleChangeItemHTo = (index, value) => {
    const list = [...work];
    list[index].hoursPerDay = value;
    setWork(list);
  };
  const handleChangeItemDTo = (index, value) => {
    const list = [...work];
    list[index].total = value;
    setWork(list);
    let toHours = 0,
      toWeeks = 0;

    for (let i = 0; i < list.length; i++) {
      if (list[i].total > 0) {
        toHours += parseFloat(list[i].total);
      }
      if (list[i].weeks > 0) {
        toWeeks += parseFloat(list[i].weeks);
      }
    }
    setTotalWeeks(toWeeks);
    setTotalHours(toHours);
  };

  const [primary, setprimary] = useState([
    {
      name: "",
      phone: "",
      email: "",
      jobTitle: "",
      cell: "",
    },
  ]);
  const addInput = () => {
    setprimary([
      ...primary,
      {
        name: "",
        phone: "",
        email: "",
        jobTitle: "",
        cell: "",
      },
    ]);
  };

  const removeInput = (index) => {
    const rows = [...primary];
    rows.pop();
    setprimary(rows);
  };
  const handleChangeItemName = (index, value) => {
    const list = [...primary];
    list[index].name = value;
    setprimary(list);
  };
  const handleChangeItemEmail = (index, value) => {
    const list = [...primary];
    list[index].email = value;
    setprimary(list);
  };
  const handleChangeItemPhone = (index, value) => {
    const list = [...primary];
    list[index].phone = value;
    setprimary(list);
  };
  const handleChangeItemJob = (index, value) => {
    const list = [...primary];
    list[index].jobTitle = value;
    setprimary(list);
  };

  const handleChangeItemCell = (index, value) => {
    const list = [...primary];
    list[index].cell = value;
    setprimary(list);
  };

  const handleNav3 = () => {
    getFacilityInfo("primaryEmail", primary);
    getFacilityInfo("workSchedule", work);
    navigation.navigate(link + "AddFacility3");
  };

  return (
    <View style={styles.container}>
      <View style={styles.workCont}>
        <Text style={styles.workeSch}>Work Schedule</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.horizontalCont}>
          <View style={styles.workHead}>
            <View
              style={{
                width: wp("50%"),
              }}
            >
              <Text style={styles.workSchedTxt}>Item</Text>
            </View>
            <View
              style={{
                width: wp("47%"),
                marginRight: "1%",
              }}
            >
              <Text style={styles.workSchedTxt}>Weeks</Text>
            </View>
            <View
              style={{
                width: wp("47%"),
                marginRight: "1%",
              }}
            >
              <Text style={styles.workSchedTxt}>Total</Text>
            </View>
            <View style={{ width: wp("50%") }}>
              <Text style={styles.workSchedTxt}>Hours per day</Text>
            </View>
          </View>
          <View style={{ maxHeight: 220, paddingVertical: "0.5%" }}>
            <ScrollView nestedScrollEnabled={true}>
              {work.map((item, i) => (
                <View key={i + 1} style={styles.multiW}>
                  <View style={styles.inputs}>
                    <View style={styles.subContItem}>
                      <TextInput
                        style={styles.inputW}
                        keyboardType="default"
                        placeholder="Cleaning"
                        onChangeText={(value) =>
                          handleChangeItemDFrom(i, value)
                        }
                        value={item.item}
                      />
                    </View>
                    <View style={styles.subContWeeks}>
                      <TextInput
                        style={styles.inputW}
                        keyboardType="numeric"
                        placeholder="40.00"
                        onChangeText={(value) =>
                          handleChangeItemHFrom(i, value)
                        }
                        value={item.weeks}
                      />
                    </View>

                    <View style={styles.subContTotal}>
                      <TextInput
                        style={styles.inputW}
                        keyboardType="numeric"
                        placeholder="170.00"
                        onChangeText={(value) => handleChangeItemDTo(i, value)}
                        value={item.total}
                      />
                    </View>
                    <View style={styles.subContHours}>
                      <TextInput
                        style={styles.inputW}
                        keyboardType="numeric"
                        placeholder="8.00"
                        onChangeText={(value) => handleChangeItemHTo(i, value)}
                        value={item.hoursPerDay}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.totalFoot}>
            <View
              style={{
                width: wp("50%"),
                marginRight: "1%",
              }}
            >
              <Text style={styles.workSchedTxt}>Total</Text>
            </View>
            <View
              style={{
                width: wp("46%"),
                marginRight: "3%",
              }}
            >
              <Text style={styles.workSchedTxt}>{totalWeeks}</Text>
            </View>
            <View
              style={{
                width: wp("44%"),
                marginRight: "1%",
              }}
            >
              <Text style={styles.workSchedTxt}>{totalHours}</Text>
            </View>
            <View style={{ width: wp("48%"), flexDirection: "row" }}>
              <TouchableOpacity onPress={removeInputW}>
                <View style={styles.minusIcon}>
                  <Entypo name="minus" size={31} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={addInputW}>
                <View style={styles.addIcon}>
                  <MaterialIcons name="add" size={31} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.PrimaryCont}>
        <Text style={styles.Primary}>Primary Contact(s)</Text>
      </View>
      {primary.map((item, i) => (
        <View key={i + 1} style={styles.multi}>
          <View style={styles.subCont}>
            <View>
              <Text style={styles.label}>Name</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(value) => handleChangeItemName(i, value)}
              value={item.name}
            />
          </View>
          <View style={styles.subCont}>
            <View>
              <Text style={styles.label}>Phone Number</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => handleChangeItemPhone(i, value)}
              value={item.phone}
            />
          </View>
          <View style={styles.subCont}>
            <View>
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(value) => handleChangeItemEmail(i, value)}
              value={item.email}
            />
          </View>
          <View style={styles.subCont}>
            <View>
              <Text style={styles.label}>Job Title</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(value) => handleChangeItemJob(i, value)}
              value={item.jobTitle}
            />
          </View>
          <View style={styles.subCont}>
            <View>
              <Text style={styles.label}>Cell</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => handleChangeItemCell(i, value)}
              value={item.cell}
            />
          </View>
        </View>
      ))}
      <View style={styles.addRemove}>
        <TouchableOpacity onPress={removeInput}>
          <View>
            <Entypo name="squared-minus" size={32} color="#309694" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addInput}>
          <View>
            <MaterialIcons name="add-box" size={34} color="#309694" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btns}>
        <View style={{ width: "40%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.btnBack}>
              <Text style={styles.addBack}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ width: "40%" }}>
          <TouchableOpacity onPress={handleNav3}>
            <View style={styles.nextBtn}>
              <Text style={styles.addSite}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    primaryEmail: state.AddFacilityR.primaryEmail,
    workSchedul: state.AddFacilityR.workSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilityInfo: (name, value) =>
      dispatch(AddFacilityActionCreator.getFacilityInfo(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStep2);

const styles = StyleSheet.create({
  horizontalCont: {
    width: wp("208%"),
    borderColor: "black",
    paddingHorizontal: wp("4%"),
  },
  addIcon: {
    marginLeft: wp("2%"),
    width: wp("24%"),
    backgroundColor: "#309694",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  minusIcon: {
    width: wp("24%"),
    height: 45,
    backgroundColor: "#309694",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("1%"),
  },
  inputW: {
    height: 45,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "2.5%",
    width: "100%",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
  },
  subContItem: {
    width: wp("50%"),
    marginRight: "1%",
  },
  subContWeeks: {
    width: wp("47%"),
    marginRight: "1%",
  },
  subContTotal: {
    width: wp("47%"),
    marginRight: "1%",
  },
  subContHours: {
    width: wp("50%"),
  },
  totalFoot: {
    width: wp("148%"),
    height: 45,
    paddingHorizontal: wp("2%"),
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#cccaca",
    alignItems: "center",
  },
  label: {
    paddingLeft: "1.5%",
    fontWeight: "bold",
    color: "#595959",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
  },
  workSchedTxt: {
    color: "#3b3a3a",
    fontWeight: "bold",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
  },
  inputs: {
    flexDirection: "row",
    width: wp("200%"),
  },
  workCont: {
    paddingHorizontal: "5%",
  },
  workHead: {
    width: wp("200%"),
    paddingHorizontal: wp("2%"),
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#cccaca",
    // paddingVertical: hp("1%"),
    height: 45,
    alignItems: "center",
  },
  workeSch: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#666",
    fontSize: width > 700 ?RFPercentage(2): RFPercentage(1.9),
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingBottom: "3%",
    marginBottom: "4%",
  },
  addRemove: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: "3%",
  },
  multiW: {
    width: wp("200%"),
  },
  dropdownHour: {
    borderRadius: 8,
    marginTop: "-7%",
  },
  rows: {
    fontSize: RFPercentage(1.8),
  },
  btnselectstyle: {
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "2%",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnselectxtstyle: {
    fontSize: RFPercentage(1.8),
    color: "#595959",
    textAlign: "left",
  },
  input: {
    width: "100%",
    // aspectRatio: 8.6 / 1,
    height: 45,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: RFPercentage(1.5),
  },
  container: {
    flexDirection: "column",
    marginBottom: "5%",
  },
  subCont: {
    flexDirection: "column",
    width: "100%",
    marginTop: "4%",
  },

  PrimaryCont: {
    paddingHorizontal: "5%",
    marginTop: "8%",
  },
  Primary: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#666",
    fontSize: width > 700 ?RFPercentage(2): RFPercentage(1.9),
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingBottom: "3%",
  },
  addRemove: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: "3%",
    marginBottom: "5%",
  },
  multi: {
    marginHorizontal: "5%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingBottom: "7%",
  },
  btns: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    marginVertical: "5%",
    height: 50,
    width: "100%",
    justifyContent: "space-between",
  },
  addSite: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: "2%",
  },
  btnBack: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    // paddingHorizontal: "0%",
    alignItems: "center",
    // paddingVertical: "4%",
    height: "100%",
    justifyContent: "center",
    marginRight: "3%",
    borderWidth: 1.5,
    borderColor: "#309694",
  },
  addBack: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#309694",
    paddingLeft: "2%",
  },
  nextBtn: {
    backgroundColor: "#309694",
    borderRadius: 12,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    marginLeft: "3%",
  },
});
