import axios from 'axios'

export const fetchUsersRequest = () => {
    return{
        type:'FETCH_USERS_REQUEST'
    }
}

const fetchUsersSuccess = data => {
    return{
        type:'FETCH_USERS_SUCCESS',
        payload:data
    }
}

const fetchUsersFailure = error => {
    return{
        type:'FETCH_USERS_FAILURE',
        payload:error
    }
}

export const fetchUsersFromGit = (selectLogValue,pageNumber)=>{
    return (dispatch) =>{
        dispatch(fetchUsersRequest)
        axios.get('https://api.github.com/search/users?q='+selectLogValue+'&page='+pageNumber+'&per_page=5')
        .then(response =>{
            
            const data = response.data
            console.log(data)
            dispatch(fetchUsersSuccess(data))
            return Promise.all([data]);
        })
        .catch(error=>{
            const errorMsg = error.message
            dispatch(fetchUsersFailure(errorMsg))
        })
    }
}