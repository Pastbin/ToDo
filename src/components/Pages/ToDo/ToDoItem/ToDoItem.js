import {Draggable, Droppable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../../store/actions";
import {useEffect} from "react";
import ItemCheck from "./ItemCheck/ItemCheck";
import DnDElement from "./DnDElement/DnDElement";
import ItemGroupSelector from "./ItemGroupSelector/ItemGroupSelector";
import ItemDatapicker from "./ItemDatapicker/ItemDatapicker";
import ItemText from "./ItemText/ItemText";

import './ToDoItem.scss'


function ToDoItem() {


  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const allTasks = JSON.parse(localStorage.getItem('tasks'))
  const currentGroup = localStorage.getItem('currentGroup')
  const currentGroupName = allTasks[currentGroup][0]
  let allTasksOfCurrentGroup = allTasks[currentGroup][1]

  function getIndexOfGroup(group){
    for (let i = 0; i < Object.keys(allTasks).length; i++){
      if(allTasks[i][0] === group) {
        return i
      }
    }
  }


  useEffect(() => {
    const allItems = document.querySelectorAll('.item')
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList = "item draggable flight-start";

      setTimeout(() => {
        allItems[i].classList = 'item draggable flight';
      }, 40 * i)

      setTimeout(() => {
        allItems[i].classList = 'item draggable flight-end';
      }, 40 * allItems.length + 300)
    }
  }, [])

  //меняем дату
  const changeDate = (e, currentGroup, i) => {
    const date = e.target.value;
    dispatch({type: actions.CHANGE_DATE, payload: {currentGroup: currentGroup, date: date, index: i}})
  }

//инверсия завершения задачи
  const setDoneTask = (i) => {
    dispatch({type: actions.DONE_TASK, payload: {currentGroup: currentGroup, index: i}})
  }

//меняем текст задачи
  const setTextTask = (e, i) => {
    dispatch({type: actions.CHANGE_TEXT_IN_TASK, payload: {currentGroup: currentGroup, text: e.target.value, index: i}})
  }

  //удаляем задачу (оставляем одну)
  const handlerKeyDown = (e) => {
    if (!e.target.value && e.code === "Backspace" && allTasksOfCurrentGroup.length > 1) {
      e.preventDefault()
      const delElem = e.target.closest('.item').dataset.index;
      dispatch({type: actions.DELETE_TASK, payload: {currentGroup: currentGroup, delElem: delElem}})
    }

    //создаем новую задачу
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      let d = ("0" + (new Date().getDate()))
      d = d.slice(-2, d.length)
      let m = ("0" + (new Date().getMonth() + 1))
      m = m.slice(-2, m.length)
      let y = new Date().getFullYear()
      let currentDate = [y, m, d].join('-');
      let newTask = {
        "task": "",
        "date": currentDate,
        "done": false
      }
      dispatch({type: actions.CREATE_TASK, payload: {currentGroup: currentGroup, newTask: newTask}})
    }
  }

  //меняем группу
  const changeGroup = (event, index) => {
    const newIndexOfGroup = getIndexOfGroup(event.target.value);
    dispatch({
      type: actions.CHANGE_GROUP_OF_TASKS,
      payload: {newIndexOfGroup: newIndexOfGroup, index: index, currentGroup: currentGroup}
    })
    // beautiful button
    const buttons = document.querySelectorAll("button[data-btnid]")
    buttons.forEach(btn => {
      if (btn.innerHTML === newIndexOfGroup) {
        btn.style.transition = "box-shadow 0.3s linear"
        btn.style.boxShadow = "3px 3px 10px 2px blue";
        setTimeout(() => {
          btn.style.boxShadow = "3px 3px 5px gray";
        }, 300);
      }
    })
  }

  // собираем названия всех групп
  const getAllGroupsOfTasks = () => Object.keys(allTasks).map(i => allTasks[i][0]);


  return (
    <Droppable droppableId="0">
      {(provided) => (
        <div className="items" {...provided.droppableProps} ref={provided.innerRef}>
          {
            allTasksOfCurrentGroup.map((task, i) => {
              //проверяем на наличие задачи
              return (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {(provided) => (
                    <div
                      tabIndex={0}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      data-index={i}
                      className="item draggable">
                      <div className="item__task">
                        <DnDElement/>
                        <ItemCheck
                          done={task.done}
                          setDoneTask={setDoneTask}
                          i={i}/>
                        <ItemText
                          i={i}
                          done={task.done}
                          task={task.task}
                          setTextTask={setTextTask}
                          handlerKeyDown={handlerKeyDown}
                        />
                      </div>
                      <ItemGroupSelector
                        i={i}
                        currentGroup={currentGroupName}
                        getAllGroupsOfTasks={getAllGroupsOfTasks}
                        changeGroup={changeGroup}
                      />
                      <ItemDatapicker
                        done={task.done}
                        i={i}
                        date={task.date}
                        currentGroup={currentGroup}
                        changeDate={changeDate}/>
                    </div>)}
                </Draggable>
              )
            })}
          {provided.placeholder} </div>
      )}
    </Droppable>)

}

export default ToDoItem;

