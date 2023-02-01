import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
} from "react-native";
import BasicInput from "../../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import DatePickerAndroid from "../../SharedComponents/DatePickerAndroid";
import DatePickerIOS from "../../SharedComponents/DatePickerIOS";
import { useNavigation } from "@react-navigation/native";
import CMenu from "../../../Components/SharedComponents/CMenu";
import Header from "../../../Components/SharedComponents/Header";
import { connect } from "react-redux";
import * as GetFacParentActionCreator from "../../../Store/ActionCreator/Fcaility/GetFacParentActionCreator";
import * as AddFacilityActionCreator from "../../../Store/ActionCreator/Fcaility/AddFacilityActionCreator";

function AddForm({
  link,
  parentId,
  name,
  type,
  location,
  sqm,
  const_year,
  date_opened,
  street,
  post_code,
  description,
  primaryEmail,
  workSchedule,
  eid,
  error,
  loading,
  getFacilityInfo,
  addFacility,
  parent,
  getAllParent,
  getFacilityOccupantInfo,
  addFacilityOccupant,
  email,
  fullName,
  phone,
  notes,
  profileImage,
}) {
  const [facName, setFacName] = useState("");
  const [facType, setFacType] = useState("");
  const [locMsg, setLocMsg] = useState("");
  const [streetMsg, setStreetMsg] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  const [yearMsg, setYearMsg] = useState("");
  const [dateMsg, setDateMsg] = useState("");
  const [descMsg, setDescMsg] = useState("");

  const types = ["Education", "Retail"];

  const navigation = useNavigation();
  useEffect(() => {
    getAllParent();
    getFacilityInfo("name", "");
    getFacilityInfo("parentId", "");
    getFacilityInfo("type", "");
    getFacilityInfo("location", "");
    getFacilityInfo("sqm", "");
    getFacilityInfo("const_year", "");
    getFacilityInfo("date_opened", "");
    getFacilityInfo("street", "");
    getFacilityInfo("post_code", "");
    getFacilityInfo("description", "");
    getFacilityInfo("error", "");
  }, []);
  
  const parentName = parent.map((pr) => pr.name);

  const handleChangeName = (n, e) => {
    if (!name || name.length > 24) {
      setFacName("Please Enter a valid name (1-24)");
    } else {
      setFacName("");
    }
    getFacilityInfo(n, e);
  };

  const handleChangeLocation = (n, e) => {
    if (!location) {
      setLocMsg("Please Enter a valid location");
    } else {
      setLocMsg("");
    }
    getFacilityInfo(n, e);
  };

  const handleChangeStreet = (n, e) => {
    if (!street) {
      setStreetMsg("Please Enter a valid Street");
    } else {
      setStreetMsg("");
    }
    getFacilityInfo(n, e);
  };

  const handleChangePostCode = (n, e) => {
    if (
      !+post_code < 0 ||
      post_code.length === 1 ||
      post_code.length === 2 ||
      post_code.length === 3 ||
      post_code.length === 6 ||
      post_code.length === 7 ||
      post_code.length > 9
    ) {
      setCodeMsg("Please Enter a valid code");
    } else {
      setCodeMsg("");
    }
    getFacilityInfo(n, e);
  };

  const handleChangeDate = (n, e) => {
   
    if (e.length <1) {
      setDateMsg("Please Enter a valid Date");
    } else {
      setDateMsg("");
    }
    getFacilityInfo("date_opened", e);
  };

  const handleChangeDesc = (n, e) => {
    if (!description) {
      setDescMsg("Please Enter a Description");
    } else {
      setDescMsg("");
    }
    getFacilityInfo(n, e);
  };
  const handleChangeYear = (n, e) => {
    if (+const_year < 0 || const_year.length !== 3) {
      setYearMsg("Please Enter a valid year");
    } else {
      setYearMsg("");
    }
    getFacilityInfo(n, e);
  };

  const handleChangeParent = (index) => {
    getFacilityInfo("parentId", parent[index].iid);
  };

  const handleChangeType = (index) => {
    if (types[index].length <1 ) {
      setFacType("Please Select a Type");
    } else {
      setFacType("");
    }
    console.log(types[index]);
    getFacilityInfo("type", types[index]);
  };

  const handleOnChange = (v, n) => {
    getFacilityInfo(n, v);
  };

  const handleNavigation = () => {
    var submit = true;
    if (!name || name.length > 24) {
      setFacName("Please Enter a Name");
      submit = false;
    }
    if (type.length === 0) {
      setFacType("Please Select a Type");
      submit = false;
    }
    if (!location) {
      setLocMsg("Please Enter a Location");
      submit = false;
    }
    if (+const_year < 0 || const_year.length !== 4) {
      setYearMsg("Please Enter a Year");
      submit = false;
    }
    if (!date_opened) {
      setDateMsg("Please Select a Date");
      submit = false;
    }
    if (!street) {
      setStreetMsg("Please enter a Street");
      submit = false;
    }
    if (!post_code) {
      setCodeMsg("Please Enter a code");
      submit = false;
    }
    if (!description) {
      setDescMsg("Please Enter a Description");
      submit = false;
    }
    if (submit) {
      console.log(name,parentId,type,location, const_year, date_opened, street, post_code, description)
      navigation.navigate(link + "AddFacility2");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Facility Name *</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="default"
          value={name}
          onChangeText={(e) => handleChangeName("name", e)}
        />
        {facName && <Text style={styles.validation}>{facName}</Text>}
      </View>

      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Facility Parent</Text>
        </View>
        <SelectDropdown
          renderDropdownIcon={() => (
            <Ionicons name="chevron-down-outline" size={20} color="#595959" />
          )}
          dropdownIconPosition="right"
          defaultButtonText="Select a parent.."
          rowTextStyle={{
            color: "#595959",
          }}
          buttonStyle={styles.btnselectstyle}
          buttonTextStyle={styles.btnselectxtstyle}
          dropdownStyle={styles.dropdownHour}
          rowTextStyle={styles.rows}
          data={parentName}
          onSelect={(selectedItem, index) => {
            handleChangeParent(index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Facility Type *</Text>
        </View>
        <SelectDropdown
          renderDropdownIcon={() => (
            <Ionicons name="chevron-down-outline" size={20} color="#595959" />
          )}
          dropdownIconPosition="right"
          defaultButtonText="Select a Type.."
          rowTextStyle={{
            color: "#595959",
          }}
          buttonStyle={styles.btnselectstyle}
          buttonTextStyle={styles.btnselectxtstyle}
          dropdownStyle={styles.dropdownHour}
          rowTextStyle={styles.rows}
          data={types}
          onSelect={(selectedItem, index) => {
            handleChangeType(index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        {facType && <Text style={styles.validation}>{facType}</Text>}
      </View>

      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Location *</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="default"
          value={location}
          onChangeText={(val) => handleChangeLocation("location", val)}
        />
        {locMsg && <Text style={styles.validation}>{locMsg}</Text>}
      </View>

      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Street *</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={(val) => handleChangeStreet("street", val)}
          value={street}
        />
        {streetMsg && <Text style={styles.validation}>{streetMsg}</Text>}
      </View>
      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Post code *</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(val) => handleChangePostCode("post_code", val)}
          value={post_code}
        />
        {codeMsg && <Text style={styles.validation}>{codeMsg}</Text>}
      </View>
      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>SQM</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(val) => handleOnChange(val,"sqm")}
          value={sqm}
        />
      </View>

      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Construction Year *</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(val) => handleChangeYear("const_year", val)}
          value={const_year}
        />
        {yearMsg && <Text style={styles.validation}>{yearMsg}</Text>}
      </View>

      <View style={styles.subCont}>
        {Platform.OS === "android" ? (
          <DatePickerAndroid
            label="Date Opened *"
            handleOnChange={handleChangeDate}
            name="date_opened"
          />
        ) : (
          <DatePickerIOS
            label="Date Opened *"
            handleOnChange={handleChangeDate}
            name="date_opened"
          />
        )}
        {dateMsg && <Text style={styles.validation}>{dateMsg}</Text>}
      </View>

      <View style={styles.subCont}>
        <View>
          <Text style={styles.label}>Description *</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={(val) => handleChangeDesc("description", val)}
          value={description}
        />
        {descMsg && <Text style={styles.validation}>{descMsg}</Text>}
      </View>

      <View style={{ width: "90%" }}>
        <TouchableOpacity onPress={handleNavigation}>
          <View style={styles.nextBtn}>
            <Text style={styles.addSite}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    parent: state.GetAllParentR.parent,
    parentId: state.AddFacilityR.parentId,
    name: state.AddFacilityR.name,
    type: state.AddFacilityR.type,
    location: state.AddFacilityR.location,
    sqm: state.AddFacilityR.sqm,
    const_year: state.AddFacilityR.const_year,
    date_opened: state.AddFacilityR.date_opened,
    workSchedule: state.AddFacilityR.workSchedule,
    primaryEmail: state.AddFacilityR.primaryEmail,
    street: state.AddFacilityR.street,
    post_code: state.AddFacilityR.post_code,
    description: state.AddFacilityR.description,
    eid: state.AddFacilityR.eid,
    error: state.AddFacilityR.error,
    loading: state.AddFacilityR.loading,
    parent: state.GetAllParentR.parent,
    email: state.AddFacilityOccupantR.email,
    fullName: state.AddFacilityOccupantR.fullName,
    phone: state.AddFacilityOccupantR.phone,
    notes: state.AddFacilityOccupantR.notes,
    profileImage: state.AddFacilityOccupantR.profileImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllParent: () => dispatch(GetFacParentActionCreator.getAllParent()),
    getFacilityInfo: (name, value) =>
      dispatch(AddFacilityActionCreator.getFacilityInfo(name, value)),

    addFacility: (
      parentId,
      name,
      type,
      location,
      sqm,
      const_year,
      date_opened,
      street,
      post_code,
      description,
      primaryEmail,
      workSchedul
    ) =>
      dispatch(
        AddFacilityActionCreator.addFacility(
          parentId,
          name,
          type,
          location,
          sqm,
          const_year,
          date_opened,
          street,
          post_code,
          description,
          primaryEmail,
          workSchedule
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "8%",
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
  btnHourStyle: {
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "2%",
    height: 40,
    width: "30%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnselectxtstyle: {
    fontSize: RFPercentage(1.8),
    color: "#595959",
    textAlign: "left",
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
  validation: {
    color: "red",
    paddingLeft: "1.5%",
    paddingTop: "1%",
    fontSize: RFPercentage(1.4),
  },
  nextBtn: {
    backgroundColor: "#309694",
    borderRadius: 12,
    paddingHorizontal: "2%",
    alignItems: "center",
    paddingVertical: "3%",
    justifyContent: "center",
    marginTop: "9%",
  },
  addSite: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: "2%",
  },
});
