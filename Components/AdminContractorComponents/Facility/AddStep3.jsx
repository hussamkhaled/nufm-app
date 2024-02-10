import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import BasicInput from "../../../Components/SharedComponents/BasicInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as AddFacilityOccupantActionCreator from "../../../Store/ActionCreator/Fcaility/AddFacilityOccupantActionCreator";
import * as AddFacilityActionCreator from "../../../Store/ActionCreator/Fcaility/AddFacilityActionCreator";
const { width, height } = Dimensions.get("window");

function AddStep3({
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
  docs,
  loading,
  getFacilityInfo,
  addFacility,
  email,
  fullName,
  phone,
  notes,
  landline,
  jobTitle,
  getFacilityOccupantInfo,
  addFacilityOccupant,
}) {
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");

  const navigation = useNavigation();

  const [Occupant, setOccupant] = useState([
    {
      fullName: "",
      phone: "",
      email: "",
      notes: "",
      landline: "",
      jobTitle: "",
    },
  ]);
  const addInput = () => {
    setOccupant([
      ...Occupant,
      {
        fullName: "",
        phone: "",
        email: "",
        notes: "",
        landline: "",
        jobTitle: "",
      },
    ]);
  };

  const removeInput = (index) => {
    const rows = [...Occupant];
    rows.pop();
    setOccupant(rows);
  };

  useEffect(() => {
    if (eid.length > 1) {
      for (let i = 0; i < Occupant.length; i++) {
        addFacilityOccupant(
          Occupant[i].email,
          Occupant[i].fullName,
          Occupant[i].phone,
          Occupant[i].notes,
          Occupant[i].landline,
          Occupant[i].jobTitle,
          eid
        );
      }
    }
  }, [eid]);
  useEffect(() => {
    getFacilityOccupantInfo("email", "");
    getFacilityOccupantInfo("fullName", "");
    getFacilityOccupantInfo("phone", "");
    getFacilityOccupantInfo("notes", "");
    getFacilityOccupantInfo("landline", "");
    getFacilityOccupantInfo("jobTitle", "");
    getFacilityOccupantInfo("profileImage", "");
  }, []);
  const handleChangeItemName = (index, value) => {
    if (!fullName || fullName.length > 24) {
      setNameMsg("Please Enter a valid name (1-24)");
    } else {
      setNameMsg("");
    }
    const list = [...Occupant];
    list[index].fullName = value;
    setOccupant(list);
    getFacilityOccupantInfo("fullName", value);
  };
  const handleChangeItemEmail = (index, value) => {
    if (!value || !value.includes("@")) {
      setEmailMsg("Please Enter a valid email");
    } else {
      setEmailMsg("");
    }
    const list = [...Occupant];
    list[index].email = value;
    setOccupant(list);
    getFacilityOccupantInfo("email", value);
  };
  const handleChangeItemPhone = (index, value) => {
    if (!value || +value < 0) {
      setPhoneMsg("Please Enter a valid number");
    } else {
      setPhoneMsg("");
    }
    const list = [...Occupant];
    list[index].phone = value;
    setOccupant(list);
    getFacilityOccupantInfo("phone", value);
  };
  const handleChangeItemNote = (index, value) => {
    const list = [...Occupant];
    list[index].notes = value;
    setOccupant(list);
    getFacilityOccupantInfo("notes", value);
  };
  const handleChangeItemLandline = (index, value) => {
    const list = [...Occupant];
    list[index].landline = value;
    setOccupant(list);
    getFacilityOccupantInfo("landline", value);
  };
  const handleChangeItemJob = (index, value) => {
    const list = [...Occupant];
    list[index].jobTitle = value;
    setOccupant(list);
    getFacilityOccupantInfo("jobTitle", value);
  };

  const handleSubmit = () => {
    var submit = true;
    for (let j = 0; j < Occupant.length; j++) {
      if (Occupant[j].fullName.length < 1) {
        setNameMsg("Please Enter a Name");
        submit = false;
      }
      if (Occupant[j].phone < 0) {
        setPhoneMsg("Please Enter a Phone Number");
        submit = false;
      }
      if (!Occupant[j].email.includes("@")) {
        setEmailMsg("Please Enter an Email");
        submit = false;
      }
    }

    if (submit) {
      addFacility(
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
      );
    }
  };
  return (
    <View>
      {/* // style={{ justifyContent: "center", alignItems: "center" }}> */}
      <View style={styles.container}>
        <View style={styles.OccupantCont}>
          <Text style={styles.Occupant}>Occupant(s)</Text>
        </View>
        {Occupant.map((item, i) => (
          <View key={i + 1} style={styles.multi}>
            <View style={styles.subCont}>
              <View>
                <Text style={styles.label}>Name *</Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(value) => handleChangeItemName(i, value)}
                value={item.fullName}
              />
              {nameMsg && <Text style={styles.validation}>{nameMsg}</Text>}
            </View>
            <View style={styles.subCont}>
              <View>
                <Text style={styles.label}>Phone Number *</Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(value) => handleChangeItemPhone(i, value)}
                value={item.phone}
              />
              {phoneMsg && <Text style={styles.validation}>{phoneMsg}</Text>}
            </View>
            <View style={styles.subCont}>
              <View>
                <Text style={styles.label}>Email *</Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(value) => handleChangeItemEmail(i, value)}
                value={item.email}
              />
              {emailMsg && <Text style={styles.validation}>{emailMsg}</Text>}
            </View>
            <View style={styles.subCont}>
              <View>
                <Text style={styles.label}>Landline</Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(value) => handleChangeItemLandline(i, value)}
                value={item.landline}
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
                <Text style={styles.label}>Note</Text>
              </View>
              <TextInput
                style={styles.note}
                keyboardType="default"
                onChangeText={(value) => handleChangeItemNote(i, value)}
                value={item.notes}
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
      </View>
      {error && (
        <View style={styles.errorMsg}>
          <AntDesign name="checkcircle" size={24} color="#02A962" />
          <Text style={styles.errorTxt}>{error}</Text>
        </View>
      )}
      <View style={styles.btns}>
        <View style={{ width: "40%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.btnBack}>
              <Text style={styles.addBack}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>

        {!loading ? (
          <View style={{ width: "40%" }}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.nextBtn}>
                <Text style={styles.addSite}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ width: "40%" }}>
            <TouchableOpacity>
              <View style={styles.nextBtn}>
                <Text style={styles.addSite}>Saving </Text>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
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
    ocs: state.AddFacilityR.docs,
    email: state.AddFacilityOccupantR.email,
    fullName: state.AddFacilityOccupantR.fullName,
    phone: state.AddFacilityOccupantR.phone,
    notes: state.AddFacilityOccupantR.notes,
    landline: state.AddFacilityOccupantR.landline,
    jobTitle: state.AddFacilityOccupantR.jobTitle,
    profileImage: state.AddFacilityOccupantR.profileImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilityOccupantInfo: (name, value) =>
      dispatch(
        AddFacilityOccupantActionCreator.getFacilityOccupantInfo(name, value)
      ),
    addFacilityOccupant: (
      email,
      fullName,
      phone,
      notes,
      landline,
      jobTitle,
      eid
    ) =>
      dispatch(
        AddFacilityOccupantActionCreator.addFacilityOccupant(
          email,
          fullName,
          phone,
          notes,
          landline,
          jobTitle,
          eid
        )
      ),
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
      workSchedule
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStep3);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    // aspectRatio: 8.6 / 1,
    // paddingVertical:"1.2%",
    height: 45,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: RFPercentage(1.5),
  },
  container: {
    flexDirection: "column",
    marginBottom: "6%",
  },
  subCont: {
    flexDirection: "column",
    width: "100%",
    marginTop: "4%",
  },
  label: {
    paddingLeft: "1.5%",
    fontWeight: "bold",
    color: "#595959",
    fontSize: width > 700 ? RFPercentage(1.7) : RFPercentage(1.5),
  },

  OccupantCont: {
    paddingHorizontal: "5%",
  },
  Occupant: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#666",
    fontSize: width > 700 ? RFPercentage(2) : RFPercentage(1.9),
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
    marginHorizontal: "5%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingBottom: "7%",
  },
  note: {
    width: "100%",
    // aspectRatio: 4 / 1,
    height: 150,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingLeft: "4%",
    marginTop: "1%",
    fontSize: RFPercentage(1.5),
  },
  nextBtn: {
    backgroundColor: "#309694",
    borderRadius: 12,
    // paddingHorizontal: "2%",
    alignItems: "center",
    // paddingVertical: "4%",
    height: "100%",
    justifyContent: "center",
    marginLeft: "3%",
    // marginBottom: "12%",
    // marginHorizontal: "8%",
  },
  addSite: {
    fontSize: RFPercentage(1.9),
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: "2%",
  },
  validation: {
    color: "red",
    paddingLeft: "1.5%",
    paddingTop: "1%",
    fontSize: RFPercentage(1.4),
  },
  errorMsg: {
    marginHorizontal: "5%",
    width:"90%",
    height:55,
    marginBottom: "3%",
    backgroundColor: "#CAF3D1",
    flexDirection: "row",
    paddingHorizontal: "3.5%",
    borderRadius: 12,
    alignItems: "center",
  },
  errorTxt: {
    fontWeight: "bold",
    paddingHorizontal: "4%",
    color: "#595959",
  },
  btns: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    marginVertical: "5%",
    height: 50,
    justifyContent: "space-between",
    width: "100%",
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
    // marginBottom: "12%",
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
});
