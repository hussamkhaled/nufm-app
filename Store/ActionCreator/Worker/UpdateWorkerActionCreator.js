import axios from 'axios';
import * as actionTypes from '../../Actions/Actions';
import { server , privatePath}from '../Constants'

//---------------------Worker Id ----------------------

export const getWorkerById = (eid) =>{

    return dispatch =>{
        // var token = 'Bearer '+localStorage.getItem('nufmtoken');
        var link = server +  privatePath + '/worker/'+ eid;
            
           axios.get(link,{headers: {/*'Authorization': token,*/}})
                .then(res=>{
                        console.log(res.data)
                        dispatch(getWorkerByIdEnd(res.data));            
                }).catch(err => {
                    dispatch(getWorkerByIdFail(err));
                })     
      
    
}
}

export const getWorkerByIdEnd = (data) => {
       
    return{
        type: actionTypes.GetWorker.GET_WORKER_END,
        wr: data
    }
}

export const getWorkerByIdFail = (err) => {

    return{
        type: actionTypes.GetWorker.GET_WORKER_FAIL,
        error: err
    }
}