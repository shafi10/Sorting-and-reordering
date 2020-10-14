import React,{createContext, useReducer} from 'react'
import dataReducer from './dataReducer'
import axios from 'axios'

const initialState = {
    datas:[],
    loading:true,
    error:{}
}


export const dataApi = createContext(initialState)


export const GlobalData = ({children}) =>{
    const [state, dispatch] = useReducer( dataReducer , initialState)

    async function getData(){
        try {
            const {data} = await axios.get('http://localhost/api/list.php')
            dispatch({
                type:'GET_DATA',
                payload:data.data.rows
            })
        } catch (error) {
            dispatch({
                type:'DATA_ERROR',
                payload:error
            })
        }
    }


    return (
       <dataApi.Provider value={{
        getData,
        datas:state.datas,
        loading:state.loading
       }}>
          {children}
       </dataApi.Provider>
    )
}