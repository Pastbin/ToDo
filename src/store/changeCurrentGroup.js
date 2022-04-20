import {actions} from "./actions";

localStorage.getItem('currentGroup') || localStorage.setItem('currentGroup', "0");

export const changeCurrentGroup = (state = localStorage.getItem('currentGroup'), action) => {

  switch (action.type){
    case actions.CHANGE_CURRENT_GROUP:
      localStorage.setItem('currentGroup', action.payload)
      return {...state}
    default: return {...state}
  }
}
