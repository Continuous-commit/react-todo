import './App.css';
import { useState } from 'react';
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';

export const App = () => {
  // 状態を変化させる際useStateを使用
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({ id: 0, body: "", isCompleted: false, editFlag: true });
  const [editedTodo, setEditedTodo] = useState({ id: 0, body: "", isCompleted: false });

  const allTaskCount = () => todoList.length

  const inCompletedCount = () => todoList.filter(todo => !(todo.isCompleted)).length

  const completedCount = () => todoList.filter(todo => todo.isCompleted).length

  const handleNewTodo = (e) => setTodo({ ...todo, body: e.target.value });

  const onClickAdd = (e) => {
    e.preventDefault()
    if (todo.body === "") return;
    setTodoList([...todoList, todo]);
    setTodo({id: todo.id + 1, body: "", isCompleted: false, editFlag: true });
  };

  const onClickComplete = (id) => {
    const completeList = todoList.map((todo) => {
      if(todo.id === id) todo.isCompleted = !todo.isCompleted
      return todo
    })
    setTodoList(completeList);
  };

  const onClickDelete = (id) => {
    const newTodos = [...todoList];
    setTodoList(newTodos.filter(todo => !(todo.id === id)));
  };

  const onClickEdit = (id) => {
    const editList = {...editedTodo, id};
    setEditedTodo(editList);
    const editState = todoList.map((todo) => {
      if(todo.id === id) todo.editFlag = !todo.editFlag
      return todo
    })
    setTodoList(editState);
  };

  const handleEditTodo = (e) => {
    const handleEdit = {...editedTodo, body: e.target.value};
    setEditedTodo(handleEdit);
  };

  const saveTask = (id) => {
    if (editedTodo === "") return
    const newTodoList = todoList.map((todo) => {
      if(todo.id === editedTodo.id) todo.body = editedTodo.body
      return todo
    })
    setTodoList(newTodoList);
    const editState = todoList.map((todo) => {
      if(todo.id === id) todo.editFlag = !todo.editFlag
      return todo
    })
    setTodoList(editState);
  }
  return (
    <div className="wrapper">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <InputTodo todo={todo} onChange={handleNewTodo} onClick={onClickAdd} />
      <TodoList 
        allTaskCount={allTaskCount} 
        inCompletedCount={inCompletedCount} 
        completedCount={completedCount}  
        todoList={todoList}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        handleEditTodo={handleEditTodo}
        saveTask={saveTask}
      />
    </div>
  );
};
