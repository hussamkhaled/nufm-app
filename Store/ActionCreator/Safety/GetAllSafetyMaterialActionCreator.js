import axios from 'axios';
import * as actionTypes from '../../Actions/Actions';
import { server , privatePath}from '../Constants'

export const getAllSafetyMaterials = () => {
    
    return dispatch =>{    

        dispatch(getAllSafetyMaterialsStart());

        // var token = 'Bearer '+localStorage.getItem('nufmtoken');

        var link = server+ privatePath + '/safetyMaterials';

       axios.get(link,{headers: {/*'Authorization': token,*/}})
            .then(res=>{
                dispatch(getAllSafetyMaterialsEnd(res.data));                
            }).catch(err => {
                dispatch(getAllSafetyMaterialsFail(err));
            })
    }
}


export const getAllSafetyMaterialsStart = () =>{
    return {
        type: actionTypes.GetAllSafetyMaterial.GET_ALL_SAFETY_MATERIAL_START
    }
}

export const getAllSafetyMaterialsFail = (err) =>{
    return{
        type: actionTypes.GetAllSafetyMaterial.GET_ALL_SAFETY_MATERIAL_FAIL,
        error: err
    }
}

export const getAllSafetyMaterialsEnd = (data) =>{
    return {
        type: actionTypes.GetAllSafetyMaterial.GET_ALL_SAFETY_MATERIAL_END,
        safetyMaterials: data
    }
}


