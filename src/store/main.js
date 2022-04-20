import {combineReducers, createStore} from "redux";
import {tasks} from "./tasks";
import {changeCurrentGroup} from "./changeCurrentGroup";

const main = combineReducers({
  tasks,
  currentGroup: changeCurrentGroup,
})

const store = createStore(main)

export  default store