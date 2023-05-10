// export const BASE_URL = 'http://192.168.1.25:3005/api/v1/';
// export const BASE_URL = 'http://192.168.244.166:3005/api/v1/';

export const BASE_URL = 'http://afrobuy.shop:3000/api/v1/';

// export const BASE_URL = 'http://192.168.79.166:3005/api/v1/';


import axios from "axios";
export const signUp = async  (data)=>{
    const res  = await fetch(`${BASE_URL}user`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    });
    const body = await res.json();
    return body;
}


export const getServiceProvider = async (slug)=>{
    const res = await fetch(`${BASE_URL}service/${slug}`,{
        headers:{
            "Content-Type":"application/json",
        }
    })
    const body = await res.json()

    return body;
}


export const saveServiceData = async (data)=>{

    const res = await fetch(`${BASE_URL}service`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
            'Authorization': `Bearer ${data.token}`
        }
    })
    const body = await res.json()

    return body;

}



export const getProductByCategory = async (slug)=>{
    const config = {
		headers:{
            'Content-Type':"application/json",
        }
	}

	const {data} = await axios.get(`${BASE_URL}product/category/${slug}`,config)	
	return data;
}




export const getProductBySlug = async (slug)=>{
    const config = {
		headers:{
            'Content-Type':"application/json",
        }
	}

	const {data} = await axios.get(`${BASE_URL}product/category/${slug}/category`,config)	
	return data;
}



export const getPromotedPost = async (level)=>{
	const config = {
		headers:{
            'Content-Type':"application/json",
        }
	}
	const {data} = await axios.get(`${BASE_URL}product/promoted/${level}`,config)	
	return data;
}


export const getMyPost = async (token)=>{
	const config = {
		headers:{
            'Content-Type':"application/json",
            'Authorization':'Bearer ' + token}
	}
    
	const {data} = await axios.get(`${BASE_URL}product/user`,config)	

	return data;
}


export const getShoperDetails = async (id)=>{
	const config = {

		headers:{
            'Content-Type':"application/json",
        }
	}
	const {data} = await axios.get(`${BASE_URL}product/user/${id}`,config)	

	return data;
}


export const getProducts = async (limit,skip)=>{
	const {data} = await axios.get(`${BASE_URL}product?limit=${limit}&skip=${skip}`)	
	return data;
}



export const _promoteProduct = async (data)=>{

    const res  = await fetch(`${BASE_URL}product/promote`,{
        headers:{
            'Content-Type':'application/json'
        },
        method:"POST",
        body:JSON.stringify(data)
    });

    const body = await res.json()
    return body;

}


export const getProductDetails = async (id)=>{
    
	const {data} = await axios.get(`${BASE_URL}product/${id}/info`)	

	return data;

}

export const login = async (data)=>{
    const res  = await fetch(`${BASE_URL}user/login`,{
        headers:{
            'Content-Type':'application/json'
        },
        method:"POST",
        body:JSON.stringify(data)
    });

    const body = await res.json()
    return body;
}

export const addProduct = async (data)=>{
    const res  = await fetch(`${BASE_URL}product`,{
	    headers:{
		"Authorization":"Bearer "+data.token
	    },
        method:"POST",
        body:data.data
    });
    const body =  await res.json();
    console.log(body)
    return body;
    
}

export const getCategories = async (data)=>{
    const res  = await fetch(`${BASE_URL}category`,{
        headers:{
            'Content-Type':'application/json',
        }
    });

    const body = await res.json()

    return body;
    
}

export const updateUser = async (data)=>{

    try{
        const res  = await fetch(`${BASE_URL}user/`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+data.token
            },
            method:"PUT",
            body:JSON.stringify(data)
        });
    
    
        const body = await res.json()

        return body;

    }catch(err){
        return {msg:"failed"+err}
    }
}
