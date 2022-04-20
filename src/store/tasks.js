import itemList from "../data/itemList";
import {actions} from "./actions";

if (!localStorage.getItem('tasks')) {
  localStorage.setItem('tasks', JSON.stringify(itemList));
}
const localTasks = JSON.parse(localStorage.getItem('tasks'));
export const tasks = (state = localTasks, action) => {

  switch (action.type) {
    case actions.CHANGE_DATE: {
      const {currentGroup, date, index} = action.payload;
      state[currentGroup][1][index].date = date;
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }
    case actions.CHANGE_GROUP_OF_TASKS: {
      const {currentGroup, newIndexOfGroup, index} = action.payload;
      const [temp] = state[currentGroup][1].splice(index, 1);
      state[newIndexOfGroup][1].splice(state[currentGroup][1].length, 0, temp);
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }
    case actions.CHANGE_TEXT_IN_TASK: {
      const {currentGroup, text, index} = action.payload;
      state[currentGroup][1][index].task = text;
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }
    case actions.DONE_TASK: {
      const {currentGroup, index} = action.payload;
      state[currentGroup][1][index].done = !state[currentGroup][1][index].done
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }

    case actions.RE_INDEXED: {
      const {currentGroup, result} = action.payload;
      const [temp] = state[currentGroup][1].splice(result.source.index, 1)
      state[currentGroup][1].splice(result.destination.index, 0, temp)
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }
    case actions.DELETE_TASK: {
      const {currentGroup, delElem} = action.payload;
      state[currentGroup][1].splice(delElem, 1)
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }

    case actions.CREATE_TASK: {
      const {newTask, currentGroup} = action.payload;
      state[currentGroup][1].push(newTask)
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }

    case actions.CHANGE_GROUP_NAME: {
      const {value, currentGroup} = action.payload
      state[currentGroup][0] = value;
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }
    case actions.CLEAR_TASKS: {
      const currentGroup = action.payload
      state[currentGroup][1] =     [
        {
          "task": "задание 1",
          "date": '2022-07-26',
          "done": false
        },
      ]
      localStorage.setItem('tasks', JSON.stringify(state))
      return {...state}
    }
    default:
      return {...state}
  }


}
