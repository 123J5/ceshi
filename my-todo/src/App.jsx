import React, { Component } from 'react'
import Footer from './components/Footer'
import './css/index.css'
import ItemSo from './components/ItemSo'

export default class App extends Component {

  constructor(){
    super()
    this.state={
      items:[],
      flag:'all',
      itemvs:[],
      view:false
    }
  }
   addTodo = (e)=>{
       let {items} = this.state
       if(e.key!=='Enter') return
       let todo={}
       todo.id=Date.now()
       todo.content=e.target.value.trim()
       todo.hasComplete=false
       items.push(todo)
       this.setState({items})
       e.target.value=''
  }

  deleteTodo = (id)=>{
       let {items} = this.state
       items=items.filter(item=>item.id!==id)
       this.setState({items})
  }
  hasComple=(todo)=>{
      let {items} = this.state
      items=items.map(item=>{
          if(item.id===todo.id){
              item.hasComplete=!item.hasComplete
          }
          return item
       })
       this.setState({items})
  }
  changeView=(flag)=>{
    this.setState({flag})
    let {items,itemvs} = this.state
    console.log(flag)
      switch(flag){
       case 'all':
        itemvs=items.filter(item=>item)
           break
       case 'active':
        itemvs=items.filter(item=>!item.hasComplete)
           break
       case 'completed':
        itemvs=items.filter(item=>item.hasComplete)
           break
    }
    this.setState({itemvs})
  }
  clearHasCompleted=()=>{
        let {items} = this.state
        items=items.filter(item=>!item.hasComplete)
        this.setState({items})
  }
  selectAllTodo=()=>{
     let {items,view}=this.state
     if(!view){
        items=items.map(item=>{
          item.hasComplete=true
          return item
        })
     }else{
      items=items.map(item=>{
        item.hasComplete=false
        return item
      })
     }
     this.setState({items,view:!view})
  }
  Edittodo=(todo)=>{
     let {items} =this.state
     items=items.map(item=>{
      if(item.id===todo.id){
        item.content=todo.content
      }
      return item
     })
     this.setState({items})
  }
  render() {
    let {items,flag,itemvs,view} = this.state
    console.log(items)
    let {changeView,clearHasCompleted,selectAllTodo,Edittodo} = this
    items=flag==='all'?items:itemvs
    // if(flag=='completed'){
    //   items=items.filter(item=>item.hasComplete)
    // }
    let itemsed=items.map(item=><ItemSo key={item.id} todo={item} deleteTodo={this.deleteTodo} hasComple={this.hasComple} Edittodo={Edittodo}></ItemSo>
    )
    let length=items.length
    if(flag==='all'){
      length=items.length
    }else if(flag==='active'){
      length=items.filter(item=>!item.hasComplete).length
    }else{
      length=items.filter(item=>item.hasComplete).length
    }
  
    return (
        <section className="todoapp">
          <header className="header">
            <h1>Todos</h1>
              <input type="text" className="new-todo" placeholder="What need to be done?"
                   onKeyUp={this.addTodo}
              />
          </header>
          <section className="main">
               <input type="checkbox" className="toggle-all" id="toggle-all"  checked={view} onChange={selectAllTodo}
               />
               <label htmlFor="toggle-all"></label>
               <ul className="todo-list">
                   { 
                       itemsed 
                       }
               </ul>
          </section>
          <Footer todoNum={length} changeView={changeView} view={flag} clearHasCompleted={clearHasCompleted}/>
       
        </section>
  )
  }
}
