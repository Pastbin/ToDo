import './ToDoButtonsGroup.scss'
import {ReactComponent as IcoRename} from "../../../../img/rename.svg"
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../../store/actions";

function ToDoButtonsGroup() {

  const dispatch = useDispatch();
  const state = useSelector(state => state)

  let tasks = JSON.parse(localStorage.getItem('tasks'))

  const getGroup = (e) => {
    const index = e.target.closest("button").dataset.index
    dispatch({type: actions.CHANGE_CURRENT_GROUP, payload: index})
  };

  const renameGroupToggle = e => {
    e.target.closest("button").firstChild.toggleAttribute('readonly')
    e.target.closest("button").firstChild.focus()
  }

  const changeGroupName = input => {
    const currentGroup = localStorage.getItem('currentGroup')
    dispatch({type: actions.CHANGE_GROUP_NAME, payload: {value: input.target.value, currentGroup: currentGroup}})
  }

  return (
    <div className="row-btn">
      {Object.keys(tasks).map((group, i) => {
        return <button key={i} data-index={i} onClick={e => getGroup(e)} className="row-btn__button">
          <input onChange={changeGroupName} readOnly={true} className='button__text' value={tasks[group][0]}/>
          <div onClick={renameGroupToggle} className="button__svg"><IcoRename/></div>
        </button>
      })}
    </div>
  )
}

export default ToDoButtonsGroup