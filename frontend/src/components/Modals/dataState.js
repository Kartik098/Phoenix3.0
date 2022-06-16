import dataContext from "./dataContext"

export const DataState = (props) =>{
    console.log(props)
    const state = {
        "name" :"Kartik",
        "class": "12a",
        "value":props.loadfile
    }
    return(
        <dataContext.Provider value={state}>
            {props.children}
        </dataContext.Provider>
    )
}