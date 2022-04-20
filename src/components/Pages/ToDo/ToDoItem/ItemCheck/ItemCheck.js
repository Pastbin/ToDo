import './ItemCheck.scss'

function ItemCheck({done, setDoneTask, i}){


  return(
    <input type="checkbox"
           name="check"
           checked={done}
           readOnly={true}
           onClick={() => setDoneTask(i)}/>
  )
}

export default ItemCheck