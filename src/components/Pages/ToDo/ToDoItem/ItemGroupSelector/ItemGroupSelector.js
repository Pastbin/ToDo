import './ItemGroupSelector.scss'

function ItemGroupSelector({currentGroup,getAllGroupsOfTasks,changeGroup, i}){
  return(
    <div className="item__groups">
      <select name="select_group"
              id="select_group"
              value={currentGroup}
              onChange={e => changeGroup(e, i)}>
        {getAllGroupsOfTasks().map((name, i) => {
          return <option key={i}>{name}</option>
        })}
      </select>
    </div>
  )
}

export default ItemGroupSelector