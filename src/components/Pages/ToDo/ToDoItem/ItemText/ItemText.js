import './ItemText.scss'

function ItemText({done,task,setTextTask,i,handlerKeyDown}){

  return(
    <input className={done ? 'item__task-text task-completed' : 'item__task-text '}
           value={task}
           title={task}
           onKeyDown={handlerKeyDown}
           autoFocus={!task}
           onChange={(e) => setTextTask(e, i)}/>
  )
}

export default ItemText