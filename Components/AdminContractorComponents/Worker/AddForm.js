import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import BasicInput from "../../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MultiSelect } from "react-native-element-dropdown";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as AddWorkerActionCreator from "../../../Store/ActionCreator/Worker/AddWorkerActionCreator";
import * as GetSpecializationActionCreator from "../../../Store/ActionCreator/Worker/GetSpecializationActionCreator";

function AddForm({
  getSpecialization,
  spec,
  getWorkerInfo,
  addWorker,
  email,
  fullName,
  phone,
  specializations,
  street,
  address,
  facilityId,
  department,
  city,
  dob,
  jobTitle,
  startDate,
  workType,
  zipCode,
  linkBack,
  profileImage,
  certification,
  error,
  loading,
  eid,
}) {
  const [WName, setWName] = useState("");
  const [specMsg, setSpecMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");

  useEffect(() => {
    getSpecialization();
    getWorkerInfo("fullName", "");
    getWorkerInfo("email", "");
    getWorkerInfo("phone", "");
    getWorkerInfo("specializations", "");
    getWorkerInfo("error", "");
  }, []);

  const handleOnChangeName = (value) => {
    if (!value || value.length > 24) {
      setWName("Please Enter a valid name (1-24)");
    } else {
      setWName("");
    }
    getWorkerInfo("fullName", value);
  };

  const handleOnChangeEmail = (value) => {
    if (!value || !value.includes("@")) {
      setEmailMsg("Please Enter a valid email");
    } else {
      setEmailMsg("");
    }
    getWorkerInfo("email", value);
  };

  const handleOnChangeSpecs = (value) => {
    if (!value) {
      setSpecMsg("Please Select a Specialization");
    } else {
      setSpecMsg("");
      setSelected(value);
    }
    getWorkerInfo("specializations", value);
  };

  const handleOnChangePhone = (value) => {
    if (!value || +value < 0) {
      setPhoneMsg("Please Enter a valid number");
    } else {
      setPhoneMsg("");
    }
    getWorkerInfo("phone", value);
  };
  // const DATA = [
  //   { label: "Cleaner", value: "1" },
  //   { label: "Driver", value: "2" },
  //   { label: "Chef", value: "3" },
  //   { label: "Repair", value: "4" },
  // ];

  const handleClick = () => {
    var submit = true;
    var specs = [];
    for (let index = 0; index < specializations.length; index++) {
      specs.push(specializations[index].value);
    }
    if (!fullName || fullName.length > 24) {
      setWName("Please Enter a valid name (1-24)");
      submit = false;
    }
    if (!phone || +phone < 0) {
      setPhoneMsg("Please Enter a Number");
      submit = false;
    }
    if (!email || !email.includes("@")) {
      setEmailMsg("Please Enter an Email");
      submit = false;
    }
    if (specializations.length === 0) {
      setSpecMsg("Please Select a Specialization");
      submit = false;
    }
    if (submit) {
      addWorker(
        email,
        fullName,
        phone,
        specializations,
        street,
        address,
        facilityId,
        department,
        city,
        dob,
        jobTitle,
        startDate,
        workType,
        zipCode,
        linkBack,
        certification,
        profileImage
      );
    }
  };

  const [selected, setSelected] = useState(specializations);
  const renderDataItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.initialCont}>
      <View style={styles.container}>
        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Worker Name *</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(value) => handleOnChangeName(value)}
            value={fullName}
          />
          {WName && <Text style={styles.validation}>{WName}</Text>}
        </View>
        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Specialization(s) *</Text>
          </View>
          <MultiSelect
            style={styles.input}
            containerStyle={{
              backgroundColor: "#FFF",
              marginTop: Platform.OS === "android" ? "-9.5%" : 0,
              borderRadius: 12,
            }}
            activeColor="#F1F1F1"
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={spec}
            labelField="label"
            valueField="value"
            placeholder="Select one or more.."
            value={selected}
            onChange={(item) => handleOnChangeSpecs(item)}
            renderRightIcon={() => (
              <Ionicons name="chevron-down-outline" size={20} color="#595959" />
            )}
            renderItem={renderDataItem}
            renderSelectedItem={(item, unSelect) => (
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.selectedStyle}>
                    <Text style={styles.textSelectedStyle}>{item.name}</Text>
                    <AntDesign name="close" size={16} color="#595959" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
          {specMsg && <Text style={styles.validation}>{specMsg}</Text>}
        </View>

        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Email *</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(value) => handleOnChangeEmail(value)}
            value={email}
          />
          {emailMsg && <Text style={styles.validation}>{emailMsg}</Text>}
        </View>

        <View style={styles.subCont}>
          <View>
            <Text style={styles.label}>Phone Number *</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => handleOnChangePhone(value)}
            value={phone}
          />
          {phoneMsg && <Text style={styles.validation}>{phoneMsg}</Text>}
        </View>
      </View>
      {error && (
        <View style={styles.errorMsg}>
          <AntDesign name="checkcircle" size={24} color="#02A962" />
          <Text style={styles.errorTxt}>{error}</Text>
        </View>
      )}
      <View style={{ flexDirection: "row", marginBottom: "3%" }}>
        <View style={{ width: "30%" }}>
          <TouchableOpacity>
            <View style={styles.cancel}>
              <Text style={styles.canceltext}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%" }}>
          <TouchableOpacity onPress={handleClick}>
            <View style={styles.save}>
              <Text style={styles.addSite}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.AddWorkerR.email,
    phone: state.AddWorkerR.phone,
    fullName: state.AddWorkerR.fullName,
    specializations: state.AddWorkerR.specializations,
    profileImage: state.AddWorkerR.profileImage,
    dob: state.AddWorkerR.dob,
    address: state.AddWorkerR.address,
    jobTitle: state.AddWorkerR.jobTitle,
    facilityId: state.AddWorkerR.facilityId,
    department: state.AddWorkerR.department,
    city: state.AddWorkerR.city,
    street: state.AddWorkerR.street,
    zipCode: state.AddWorkerR.zipCode,
    linkBack: state.AddWorkerR.linkBack,
    certification: state.AddWorkerR.certification,
    workType: state.AddWorkerR.workType,
    startDate: state.AddWorkerR.startDate,
    loading: state.AddWorkerR.loading,
    eid: state.AddWorkerR.eid,
    error: state.AddWorkerR.error,
    spec: state.GetSpecializationR.spec,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecialization: () =>
      dispatch(GetSpecializationActionCreator.getSpecialization()),
    getWorkerInfo: (name, value) =>
      dispatch(AddWorkerActionCreator.getWorkerInfo(name, value)),
    addWorker: (
      email,
      fullName,
      phone,
      specializations,
      street,
      address,
      facilityId,
      department,
      city,
      dob,
      jobTitle,
      startDate,
      workType,
      zipCode,
      linkBack,
      certification,
      profileImage
    ) =>
      dispatch(
        AddWorkerActionCreator.addWorker(
          email,
          fullName,
          phone,
          specializations,
          street,
          address,
          facilityId,
          department,
          city,
          dob,
          jobTitle,
          startDate,
          workType,
          zipCode,
          linkBack,
          certification,
          profileImage
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

const styles = StyleSheet.create({
  initialCont: {
    justifyContent: "space-between",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    aspectRatio: 8.6 / 1,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: RFPercentage(1.5),
    paddingRight: "2%",
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "6%",
  },
  subCont: {
    flexDirection: "column",
    width: "90%",
    marginTop: "4%",
  },
  label: {
    paddingLeft: "1.5%",
    fontWeight: "bold",
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  item: {
    paddingVertical: "3%",
    paddingHorizontal: "4%",
  },
  placeholderStyle: {
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  selectedTextStyle: {
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  selectedStyle: {
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    marginTop: "10%",
    marginBottom: "1%",
    flexDirection: "row",
    marginHorizontal: "3%",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: "2%",
    paddingVertical: "5%",
  },
  textSelectedStyle: {
    color: "#595959",
    fontSize: RFPercentage(1.5),
  },
  addSite: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "white",
    paddingLeft: "2%",
  },
  canceltext: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#309694",
    paddingLeft: "2%",
  },
  save: {
    backgroundColor: "#309694",
    borderRadius: 12,
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "3%",
    justifyContent: "center",
    marginBottom: "7%",
    marginHorizontal: "7%",
  },
  cancel: {
    borderWidth: 1.5,
    borderColor: "#309694",
    borderRadius: 12,
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "5%",
    justifyContent: "center",
    marginBottom: "7%",
    marginLeft: "18%",
  },
  validation: {
    color: "red",
    paddingLeft: "1.5%",
    paddingTop: "1%",
    fontSize: RFPercentage(1.4),
  },
  errorMsg: {
    marginHorizontal: "5%",
    marginBottom: "7%",
    backgroundColor: "#CAF3D1",
    flexDirection: "row",
    padding: "3.5%",
    borderRadius: 12,
    alignItems: "center",
  },
  errorTxt: {
    fontWeight: "bold",
    paddingHorizontal: "4%",
    color: "#595959",
  },
});
