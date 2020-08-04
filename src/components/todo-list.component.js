import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
  <tr>
    <td>{props.todo.username}</td>
    <td>{props.todo.description}</td>
    <td>{props.todo.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.todo._id}>edit</Link> | <a href="/" onClick={() => { props.deleteTodo(props.todo._id) }}>delete</a>
    </td>
  </tr>
)

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {todo: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3001/todo/')
    .then(response => {
      this.setState({ todo: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  deleteTodo(id) {
    axios.delete('http://localhost:3001/todo/'+id)
      .then(res => console.log(res.data));
    this.setState({
      todo: this.state.todo.filter(el => el.id !== id)
    })
  }

  todoList() {
    return this.state.todo.map(currenttodo => {
      return <Todo todo={currenttodo} deleteTodo={this.deleteTodo} key={currenttodo._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Todo List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
    )
  }
}
