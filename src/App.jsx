import './App.css';
import { useState } from 'react';
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';

export const App = () => {
  // 状態を変化させる際useStateを使用
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({ id: 0, body: "", isCompleted: false });
  const [editFlag, setEditFlag] = useState(true);
  const [editedTodo, setEditedTodo] = useState({ id: 0, body: "", isCompleted: false });

  const allTaskCount = () => todoList.length

  const inCompletedCount = () => todoList.filter(todo => !(todo.isCompleted)).length

  const completedCount = () => todoList.filter(todo => todo.isCompleted).length

  const handleNewTodo = (e) => setTodo({ ...todo, body: e.target.value });

  const onClickAdd = (e) => {
    e.preventDefault()
    if (todo.body === "") return;
    setTodoList([...todoList, todo]);
    setTodo({id: todo.id + 1, body: "", isCompleted: false});
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
    newTodos.splice(id, 1);
    setTodoList(newTodos);
  };

  const onClickEdit = (id) => {
    const editList = {...editedTodo, id};
    setEditedTodo(editList);
    setEditFlag(false);
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
    setEditFlag(true);
  }
  return (
    <div className="wrapper">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <InputTodo todo={todo} onChange={handleNewTodo} onClick={onClickAdd} />
      <TodoList 
        editFlag={editFlag} 
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
