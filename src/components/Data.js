import React,{useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { dataApi } from '../contexApi/dataContex'
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';


export const Data = (props) => {
  const [search, setSearch] = useState('')
  let [searchItem, setSearchItem] = useState([])
  const { getData, datas, loading} = useContext(dataApi)
   const [sorting, setSorting] = useState({field:'', order:''})     
  const [sortingField, setSortingField] = useState('')
  const [sortingOrder, setSortingOrder] = useState('asc')

     useEffect(() =>{
          getData()     
     },[])
     
      useEffect(()=>{
        setSearchItem(
      datas.filter(data =>{ 
         if(search.includes('-')){
          return data.created_at.toLowerCase().includes(search.toLowerCase())
         }
         else if(isNaN(search)){
          return data.name.toLowerCase().includes(search.toLowerCase())
         }
         else if(parseInt(search) !== NaN){
          return data.id.toString().includes(search)
       }    
      }))
    },[search,datas])
   
   useEffect(() =>{
    if(sorting.field == "id"){
      let reversed = sorting.order === "asc" ? 1 : -1
      if(sorting.field == 'id'){
        searchItem = searchItem.sort((a,b) => reversed * a[sorting.field] - b.[sorting.field])
      }else{
        searchItem = searchItem.sort((a,b) => reversed * a[sorting.field].localeCompare(b[sorting.field]))
      }
  
    }
   },[sorting])

    const onSortingChange = field => {
      const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
      setSortingField(field)
      setSortingOrder(order)
      setSorting({field , order})
    }


   return loading ? <div><button className="btn btn-primary btn-lg btn-block">Data loading from server</button></div> : (
        <div className="data">
            <div>
               <Link to="/addData" className="btn btn-primary btn-lg btn-block">Create Form</Link>
               <Link to="/addData" className="btn btn-primary btn-lg btn-block">Update Form</Link>
            </div>

            <div className="heading">
              <h1>Data List</h1>
            </div>
            <div className="search">
              <label> Search: </label>
                 <input type="text" className="loan-sel" placeholder="Search with name" name="search"
                 value = {search}
                 onChange= { (e) => setSearch(e.target.value)} />
             </div>
          
            <table className="table text-center">
            <DragDropContext onDragEnd={(param)=>{
               const srcI = param.source.index
               const desI = param.destination.index
               searchItem.splice(desI, 0, searchItem.splice(srcI,1)[0])
             }}
              
             >
              <thead>
                <tr className="table-primary">
                <th scope="col" onClick={() => onSortingChange('id') }>ID
                      {sortingField && sortingField === 'id' && (
                        <i className={ sortingOrder === 'asc' ? "fas fa-caret-down" : "fas fa-caret-up"}></i>
                      )}
                     </th>
                     <th scope="col" onClick={() => onSortingChange('name') }>Name
                      {sortingField && sortingField === 'name' && (
                        <i className={ sortingOrder === 'asc' ? "fas fa-caret-down" : "fas fa-caret-up"}></i>
                      )}
                     </th>
                     <th scope="col">Feedback Message</th>
                     <th scope="col" onClick={() => onSortingChange('created_at') }>Submision Date
                      {sortingField && sortingField === 'created_at' && (
                        <i className={ sortingOrder === 'asc' ? "fas fa-caret-down" : "fas fa-caret-up"}></i>
                      )}
                     </th>
                 </tr>
               </thead>
                 <Droppable droppableId="droppable-1">
                 {(provided, _) => (
                 <tbody ref={provided.innerRef} {...provided.droppableProps}>
                   { searchItem && searchItem.map((data, i) =>
                   <Draggable key={data.id} draggableId={"draggableId-"+ data.id} index={i}>
                    {(provided, snapshot) => (
                    <tr key={data.id}  ref={provided.innerRef} {...provided.draggableProps} 
                    style={{
                      ...provided.draggableProps.style,
                      boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none"}}
                    {...provided.dragHandleProps}
                    
                    >
                      <td>{data.id}</td>
                    <td>{data.name}</td>
                   <td>{data.message}</td>
                   <td>{data.created_at}</td>
                 </tr>   
                  )}   
                 </Draggable>            
                    )}
                    {provided.placeholder}
                    </tbody>
                    )}
                    </Droppable>
            </DragDropContext>
            </table>

        </div>
    )
}
