import React, { Component,createRef } from 'react'

export default class ItemSo extends Component {
  constructor(props){
    super(props)
    this.state = {
      ishasclik:false
    }
    this.inputso=createRef()
    this.labelSo=createRef()
  }
  changeEdit=(e)=>{
    console.log(1111)
    console.log(this.inputso)
    let {ishasclik} = this.state
    this.inputso.current.value=e.target.innerText
    this.inputso.current.focus()
    this.setState({
      ishasclik:!ishasclik
    })
  }
  render() {
    let {ishasclik} = this.state
    console.log('33333',ishasclik)
    let  {todo,deleteTodo,hasComple,Edittodo} = this.props
    let completed = todo.hasComplete?'completed':''
    let editting =ishasclik ?completed+' editing':completed
    return (
      <li className={editting}>
        <div className="view">
        <input type="checkbox" className="toggle" checked={todo.hasComplete} onChange={()=>hasComple(todo)}></input>
        
        <label onDoubleClick={this.changeEdit}>{todo.content}</label>
        <button className="destroy" onClick={()=>deleteTodo(todo.id)}></button>
        </div>
        <input type="text" className="edit" ref={this.inputso} 
        onBlur={ishasclik?()=>{
          todo.content=this.inputso.current.value
          Edittodo(todo)
          this.setState({
            ishasclik:!ishasclik
          })
    }:null} 
        onKeyUp={(e)=>{
          // console.log(1111)
          // console.log(ishasclik)
          // console.log(e.key)
          if(e.key!=="Enter") return 
          else{
            console.log(113331)
            todo.content=this.inputso.current.value
            Edittodo(todo)
            console.log(this.setState)
            this.setState({
              ishasclik:false
            })
          }
        }
}
        />
      </li>
    )
  }
}
