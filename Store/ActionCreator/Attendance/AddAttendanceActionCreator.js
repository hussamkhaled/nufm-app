  
  {/*import axios from "axios";
  import * as actionTypes from "../../Actions/Actions";
  import { server , privatePath} from "../Constants";
  
  export const getAttendanceInfo = (name, value) => {
    return {
      type: actionTypes.AddAttendance.ADD_ATTENDANCE,
      name: name,
      value: value,
    };
  };
  
  export const addAttendance = (facility, user, task, type, lng, lat, attendanceImage) => {
    return (dispatch) => {
      dispatch(addAttendanceStart());
  
      // Prepare the image data in Base64 or formData as per backend requirement
      const params = {
        facility: facility,
        user: user,
        task: task,
        type: type,
        lng: lng,
        lat: lat,
        attendanceImage: attendanceImage // Ensure this is Base64 or appropriate format
      };
  
      const link = server + privatePath + "/addAttendance";
      axios.post(link, params, {
        headers: {
          "Content-Type": "application/json", // Change this if sending in different format
        },
      })
      .then((res) => {
        if (res.data.message === "expectation failed") {
          dispatch(addAttendanceFail("expectation failed"));
        } else {
          dispatch(addAttendanceEnd(res.data));
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(addAttendanceFail(err));
      });
    };
  };
  
  export const addAttendanceStart = () => {
    return {
      type: actionTypes.AddAttendance.ADD_ATTENDANCE_START,
    };
  };
  
  export const addAttendanceFail = (err) => {
    return {
      type: actionTypes.AddAttendance.ADD_ATTENDANCE_FAIL,
      error: err,
    };
  };
  
  export const addAttendanceEnd = (data) => {
    return {
      type: actionTypes.AddAttendance.ADD_ATTENDANCE_END,
      data: data,
    };
  };
  
*/}
 

import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const getAttendanceInfo = (name, value) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE,
    name: name,
    value: value,
  };
};

export const addAttendance = (
  facility,
  user,
  task,
  type,
  lng,
  lat,
  attendanceImage
) => {

 
  return (dispatch) => {
    dispatch(addAttendanceStart());

    // Prepare the form data
    var fd = new FormData();
    var data = JSON.stringify({
        "facility": facility,
        "task": task,
        "user": user,
        "type": type,
        "lng": lng,
        "lat": lat
    });
    fd.append("data", data);
    fd.append("attendanceImage", JSON.stringify(attendanceImage))

    const link = server + privatePath + "/attendance";
    console.log("Sending Data to Backend:", { data, attendanceImage });
    axios({
      method: "post",
      url: link,
      data: fd,
      headers: {
        "Content-Type": "multipart/form-data"
        // Uncomment below if you need authorization
        // "Authorization": `Bearer ${localStorage.getItem("nufmtoken")}`
      },
    })
      .then((res) => {
        console.log("Sending Data to Backend:", { data, attendanceImage }); // Log the data before sending
        if (res.data.message === "expectation failed") {
          dispatch(addAttendanceFail("expectation failed"));
        } else {
          dispatch(addAttendanceEnd(res.data));
         console.log(res.data);
        }
      })
      .catch((err) => {
     
        dispatch(addAttendanceFail(err));
      });
  };
};

export const addAttendanceStart = () => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_START,
  };
};

export const addAttendanceFail = (err) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_FAIL,
    error: err,
  };
};

export const addAttendanceEnd = (data) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_END,
    data: data,
  };
};


{/*import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";
import * as FileSystem from 'expo-file-system';

export const getAttendanceInfo = (name, value) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE,
    name: name,
    value: value,
  };
};

export const addAttendance = (facility, user, task, type, lng, lat, attendanceImageUri) => {
  return async (dispatch) => {
    dispatch(addAttendanceStart());

    try {
      // Convert image to base64
      const base64Image = await FileSystem.readAsStringAsync(attendanceImageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Create a FormData object
      const formData = new FormData();

      // Append fields to FormData
      formData.append("facility", JSON.stringify(facility));
      formData.append("user", user);
      formData.append("task", task || ""); // Use empty string if undefined
      formData.append("type", type || ""); // Use empty string if undefined
      formData.append("lng", lng);
      formData.append("lat", lat);

      // Append the image data
      formData.append("attendanceImage", JSON.stringify({
        id: "some-id", // Provide this if necessary, or omit if not required
        name: "image.jpg", // Adjust based on the image file name
        type: "image/jpeg", // Adjust based on the image type, e.g., image/jpeg or image/png
        data: base64Image
      }));

      console.log("Sending formData:", formData);

      const link = server + privatePath + "/addAttendance";
      const response = await axios.post(link, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message === "expectation failed") {
        dispatch(addAttendanceFail("expectation failed"));
      } else {
        dispatch(addAttendanceEnd(response.data));
      }
    } catch (error) {
      console.log("Error:", error.message);
      dispatch(addAttendanceFail(error));
    }
  };
};

export const addAttendanceStart = () => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_START,
  };
};

export const addAttendanceFail = (err) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_FAIL,
    error: err,
  };
};

export const addAttendanceEnd = (data) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_END,
    data: data,
  };
};
*/}


 


{/*
  
  
  import axios from "axios";
import * as actionTypes from "../../Actions/Actions";
import { server, privatePath } from "../Constants";

export const addAttendance = (facility, user, task, type, lng, lat, attendanceImage) => {
  return (dispatch) => {
    dispatch(addAttendanceStart());

    // Create a new FormData object
    const formData = new FormData();
    formData.append("facility", facility);
    formData.append("user", user);
    formData.append("task", task);
    formData.append("type", type);
    formData.append("lng", lng);
    formData.append("lat", lat);

    // Check if attendanceImage exists and append it to the FormData
    if (attendanceImage && attendanceImage.uri) {
      const imageUri = attendanceImage.uri;
      const fileName = imageUri.split('/').pop(); // Extract the file name from the URI
      const fileType = fileName.split('.').pop(); // Extract the file type from the file name
      formData.append("attendanceImage", {
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`, // Example: image/jpeg
      });
    }

    const link = `${server}${privatePath}/addAttendance`;

    axios.post(link, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.message === "expectation failed") {
        dispatch(addAttendanceFail("expectation failed"));
      } else {
        dispatch(addAttendanceEnd(res.data));
      }
    })
    .catch((err) => {
      console.log(err.message);
      dispatch(addAttendanceFail(err));
    });
  };
};

export const addAttendanceStart = () => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_START,
  };
};

export const addAttendanceFail = (err) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_FAIL,
    error: err,
  };
};

export const addAttendanceEnd = (data) => {
  return {
    type: actionTypes.AddAttendance.ADD_ATTENDANCE_END,
    data: data,
  };
};

  
  */}