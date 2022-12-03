import './App.css';
import { useState } from 'react';
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';

export const App = () => {
  // 状態を変化させる際useStateを使用
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodotext] = useState({ id: 0, body: "", isCompleted: false });
  const [editFlag, setEditFlag] = useState(true);
  const [editedTodo, setEditedTodo] = useState({ id: 0, body: "", isCompleted: false });

  const allTaskCount = () => todoList.length

  const inCompletedCount = () => todoList.filter(todoText => !(todoText.isCompleted)).length

  const completedCount = () => todoList.filter(todoText => todoText.isCompleted).length

  const handleNewTodo = (e) => setTodotext({ ...todoText, body: e.target.value });

  // const onChangeTodoEditText = (event, index) => {
  //   const todos = [...incompleteTodos];
  //   todos[index].data = event.target.value;
  //   setIncompleteTodos(todos);
  // };

  const onClickAdd = (e) => {
    e.preventDefault()
    if (todoText.body === "") return;
    setTodoList([...todoList, todoText]);
    setTodotext({id: todoText.id + 1, body: "", isCompleted: false});
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
      <InputTodo todoText={todoText} onChange={handleNewTodo} onClick={onClickAdd} />
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
