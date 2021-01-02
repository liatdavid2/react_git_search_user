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
const fetchUserData = (data,i) => {
    const promise1 = (dispatch) =>{
        setTimeout(() => {
            axios.get('https://api.github.com/users/'+data.items[i].login+'?access_token=cb2d337db37e30fec0841ec2a5cdd36848d60ccd')
            .then(response =>{
                console.log(response)
                //dispatch(fetchUsersRequest)
                data.items[i].bio = response.data.bio
                data.items[i].email = response.data.email
                dispatch(fetchUsersSuccess(data))
            })     
        }, 1000);
      };
      return promise1
}
export const fetchUsersFromGit = (selectLogValue,pageNumber)=>{
    var data={}
    return (dispatch) =>{
       
        axios.get('https://api.github.com/search/users?q='+selectLogValue+'&page='+pageNumber+'&per_page=5&access_token=cb2d337db37e30fec0841ec2a5cdd36848d60ccd')
        .then(response =>{
            dispatch(fetchUsersRequest)
            data = response.data
            for(let i=0;i<data.items.length;i++){
            dispatch(fetchUserData(data,i))
            }
            dispatch(fetchUsersSuccess(data))
            //return Promise.all([data]);
        })
        .catch(error=>{
            const errorMsg = error.message
            dispatch(fetchUsersFailure(errorMsg))
        })
    }
}