import {actions} from "../../../../store/actions";
import {useDispatch, useSelector} from "react-redux";

export const ClearTasks = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const currentGroup = localStorage.getItem('currentGroup')

  const clear = () => {
    dispatch({type: actions.CLEAR_TASKS, payload: currentGroup})
  }

  return(
    <button style={{marginTop: '20px'}} className={"clear"} onClick={clear}>Очистить задачи</button>
  )
}