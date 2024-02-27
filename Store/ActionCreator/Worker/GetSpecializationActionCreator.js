import axios from 'axios';
import * as actionTypes from '../../Actions/Actions';
import { server , privatePath} from '../Constants'


export const getSpecialization = () => {
    
    return dispatch =>{    

        // var token = 'Bearer '+localStorage.getItem('nufmtoken');

        var link = server+ privatePath + '/worker/specializations'

       axios.get(link,{headers: {/*'Authorization': token,*/}})
            .then(res=>{
                dispatch(getSpecializationEnd(res.data));                
            }).catch(err => {
                dispatch(getSpecializationFail(err));
            })
          }
        }


export const getSpecializationFail = (err) =>{
    return{
        type: actionTypes.GetSpecialization.GET_SPECIALIZATION_FAIL,
        error: err
    }
}

export const getSpecializationEnd = (data) =>{
    return {
        type: actionTypes.GetSpecialization.GET_SPECIALIZATION_END,
        spec: data
    }
}


