import React, {createContext, useState, useEffect} from 'react'

export const ShortlistContext = createContext();

//context for storing list of saved/ favorite properties
const ShortlistContextProvider = (props) => {

    //state to store saved properties
    const [shortlist, setShortlist] = useState([]);

    //on first load => check if stored in local storage and update state if it exists
    useEffect(()=>{
        const storedShortlist = localStorage.getItem('shortlistState');
        if(storedShortlist){
            setShortlist(JSON.parse(storedShortlist))
        }
    },[])

    //when shortlist state is updated => save state to local storage
    useEffect(()=>{
        localStorage.setItem('shortlistState', JSON.stringify(shortlist))
    },[shortlist])

    //function to add home to shortlist array
    const addHome = home => {
        setShortlist([...shortlist , home]);
    };

    //function to remove home to shortlist array
    const removeHome = home => {
        setShortlist(shortlist.filter(item => item._id !== home._id))
    };

    return (
        <ShortlistContext.Provider value={{shortlist, setShortlist, addHome, removeHome}}>
            {props.children}
        </ShortlistContext.Provider>
    )
}

export default ShortlistContextProvider