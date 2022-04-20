import './ItemDatapicker.scss'
const today = new Date().getTime();

function ItemDatapicker({date,changeDate,currentGroup,i,done}){
  return(
    <div className="item__date">
      <input type="date"
             value={date}
             onChange={(e) => {
               changeDate(e, currentGroup, i)
             }}
             className={today > new Date(date).getTime() && !done ? "item__date-input expired" : "item__date-input"}/>
    </div>
  )
}

export default ItemDatapicker