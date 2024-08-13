import axios from 'axios';
import * as actionTypes from '../../Actions/Actions';
import { server,privatePath }from '../Constants'

export const getAllDoneTasks = (eid) => {
 
    return dispatch =>{
    
    var token = 'Bearer '+localStorage.getItem('nufmtoken');
       
    var link = server +  privatePath + '/tasks/done?email='+eid;
        
    axios.get(link,{headers: {/*'Authorization': token,*/}})
            .then(res=>{
                // console.log(res.data)
                    dispatch(getAllDoneTasksEnd(res.data));
                          
            }).catch(err => {
                dispatch(getAllDoneTasksFail(err));
            })    
        }
    }


export const getAllDoneTasksEnd = (data) => {
    return{
        type: actionTypes.GetAllDoneTasks.GET_ALL_DONE_TASKS_END,
        donetasks: data
    }
}

export const getAllDoneTasksFail = (err) => {

    return{
        type: actionTypes.GetAllDoneTasks.GET_ALL_DONE_TASKS_FAIL,
        error: err
    }
}