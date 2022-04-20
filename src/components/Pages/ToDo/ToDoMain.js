import ToDoItem from "./ToDoItem/ToDoItem";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {actions} from "../../../store/actions";
import ToDoButtonsGroup from "./ToDoButtonsGroup/ToDoButtonsGroup";
import './ToDoMain.scss'
import {ClearTasks} from "./ClearTasks/ClearTasks";


function ToDoMain() {
  const dispatch = useDispatch();


  const dragEnd = (result) => {
    const currentGroup = localStorage.getItem('currentGroup')
    dispatch({type: actions.RE_INDEXED, payload: {result: result, currentGroup: currentGroup}})
  }

  return (
    <section className="todo-main">
      <div className="dashboard">
        <ToDoButtonsGroup/>
        <div className="row-title">
          <h3 className="title">TASK</h3>
          <h3 className="title">GROUPS</h3>
          <h3 className="title">DATE</h3>
        </div>


        <DragDropContext onDragEnd={dragEnd}>
          <ToDoItem/>
        </DragDropContext>
      </div>

      <ClearTasks/>

    </section>
  )
}

export default ToDoMain