export const reducer = (state, action) => {
    switch(action.type){
      case 'SET':
        state = action.value
        return state;      
      default:    
        return state;
    }
  }

export const reducerChat = (chat, action) => {
    switch(action.type){
      case 'ADD':
        return [...chat, action.value]; 
      case 'SET':
        return action.value
      default:    
        return state;
    }
  }

export const reducerDocuments = (documents, action) => {
  switch(action.type){
    case 'ADD':
      return [...documents, action.value]; 
    case 'SET':
      return action.value
    case 'REMOVE':
      let newDocuments = [...documents]
      let idx = newDocuments.findIndex( doc => doc.id === action.value.id)
      newDocuments.splice(idx, 1)
      return newDocuments
    default:    
      return state;
  }
}

export const reducerPlants = (plants, action) => { 
  switch(action.type){
    case 'UPDATE':
      let newPlants = [...plants]
      let idx = newPlants.findIndex( plant => plant.id === action.value.id )
      if(idx >= 0){
        newPlants[idx] = action.value
      }else{
        newPlants.push(action.value)
      }
      return newPlants; 
    case 'SET':
      return action.value
    default:    
      return state;
  }
}

  