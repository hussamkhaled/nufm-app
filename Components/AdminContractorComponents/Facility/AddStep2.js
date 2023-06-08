import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { connect } from "react-redux";
import * as AddFacilityActionCreator from "../../../Store/ActionCreator/Fcaility/AddFacilityActionCreator";

function AddStep2({link, workSchedule, primaryEmail, getFacilityInfo }) {
  const navigation = useNavigation();
  useEffect(() => {
    getFacilityInfo("primaryEmail", "");
    getFacilityInfo("workSchedule", "");
  }, []);
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [work, setWork] = useState([
    {
      dayFrom: "",
      hourFrom: "",
      dayTo: "",
      hourTo: "",
    },
  ]);
  const addInputW = () => {
    setWork([
      ...work,
      {
        dayFrom: "",
        hourFrom: "",
        dayTo: "",
        hourTo: "",
      },
    ]);
  };

  const removeInputW = (index) => {
    const rows = [...work];
    rows.pop();
    setWork(rows);
  };
  const handleChangeItemDFrom = (index, value) => {
    // const { name, value } = e.target;
    const list = [...work];
    list[index].dayFrom = value;
    setWork(list);
  };
  const handleChangeItemHFrom = (index, value) => {
    // const { name, value } = e.target;
    const list = [...work];
    list[index].hourFrom = value;
    setWork(list);
  };
  const handleChangeItemHTo = (index, value) => {
    // const { name, value } = e.target;
    const list = [...work];
    list[index].hourTo = value;
    setWork(list);
  };
  const handleChangeItemDTo = (index, value) => {
    // const { name, value } = e.target;
    const list = [...work];
    list[index].dayTo = value;
    setWork(list);
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
    navigation.navigate(link+"AddFacility3");
  };

  return (
    <View style={styles.container}>
      <View style={styles.workCont}>
        <Text style={styles.workeSch}>Work Schedule</Text>
      </View>
      {work.map((item, i) => (
        <View key={i + 1} style={styles.multi}>
          <View style={styles.inputs}>
            <View style={styles.subContW}>
              <View>
                <Text style={styles.label}>From</Text>
              </View>
              <SelectDropdown
                renderDropdownIcon={() => (
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color="#595959"
                  />
                )}
                dropdownIconPosition="right"
                defaultButtonText="Select day.."
                rowTextStyle={{
                  color: "#595959",
                }}
                buttonStyle={styles.btnselectstyle}
                buttonTextStyle={styles.btnselectxtstyle}
                dropdownStyle={styles.dropdownHour}
                rowTextStyle={styles.rows}
                data={weekDays}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                onChangeText={(value) => handleChangeItemDFrom(i, value)}
                value={item.dayFrom}
              />
            </View>
            <View style={styles.subContW}>
              <TextInput
                style={styles.inputW}
                keyboardType="default"
                placeholder="8:00 am"
                onChangeText={(value) => handleChangeItemHFrom(i, value)}
                value={item.hourFrom}
              />
            </View>
          </View>
          <View style={styles.inputs}>
            <View style={styles.subContW}>
              <View>
                <Text style={styles.label}>To</Text>
              </View>
              <SelectDropdown
                renderDropdownIcon={() => (
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color="#595959"
                  />
                )}
                dropdownIconPosition="right"
                defaultButtonText="Select day.."
                buttonStyle={styles.btnselectstyle}
                buttonTextStyle={styles.btnselectxtstyle}
                dropdownStyle={styles.dropdownHour}
                rowTextStyle={styles.rows}
                data={weekDays}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                onChangeText={(value) => handleChangeItemDTo(i, value)}
                value={item.dayTo}
              />
            </View>
            <View style={styles.subContW}>
              <TextInput
                style={styles.inputW}
                keyboardType="default"
                placeholder="5:00 pm"
                onChangeText={(value) => handleChangeItemHTo(i, value)}
                value={item.hourTo}
              />
            </View>
          </View>
        </View>
      ))}
      <View style={styles.addRemove}>
        <TouchableOpacity onPress={removeInputW}>
          <View>
            <Entypo name="squared-minus" size={30} color="#309694" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addInputW}>
          <View>
            <MaterialIcons name="add-box" size={32} color="#309694" />
          </View>
        </TouchableOpacity>
      </View>
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
            <Entypo name="squared-minus" size={30} color="#309694" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addInput}>
          <View>
            <MaterialIcons name="add-box" size={32} color="#309694" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btns}>
        <View style={{ width: "50%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.btnBack}>
              <Text style={styles.addBack}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ width: "50%" }}>
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
  inputW: {
    aspectRatio: 3.85 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: RFPercentage(1.5),
    marginLeft: "5%",
  },
  subContW: {
    flexDirection: "column",
    width: "50%",
    marginTop: "4%",
  },
  label: {
    paddingLeft: "2.5%",
    fontWeight: "bold",
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  inputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  workCont: {
    paddingHorizontal: "5%",
  },
  workeSch: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#666",
    fontSize: RFPercentage(1.9),
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
  },
  multi: {
    marginHorizontal: "4%",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingBottom: "7%",
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
    aspectRatio: 8.6 / 1,
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
  label: {
    paddingLeft: "2.5%",
    fontWeight: "bold",
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  inputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  PrimaryCont: {
    paddingHorizontal: "5%",
  },
  Primary: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#666",
    fontSize: RFPercentage(1.9),
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
    marginHorizontal: "4%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingBottom: "7%",
  },
  btns: {
    flexDirection: "row",
    paddingHorizontal: "1%",
    marginTop: "7%",
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
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "4.2%",
    justifyContent: "center",
    marginBottom: "12%",
    marginHorizontal: "8%",
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
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "5%",
    justifyContent: "center",
    marginBottom: "12%",
    marginHorizontal: "8%",
  },
});
