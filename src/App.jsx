import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export const App = () => {
  // 状態を変化させる際useStateを使用
  const [todoText, setTodotext] = useState({ id: 0, body: "", isCompleted: false });
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [editFlag, setEditFlag] = useState(true);
  const [editedTodo, setEditedTodo] = useState({ id: 0, body: "", isCompleted: false })

  const onChangeTodoText = (e) => setTodotext(e.target.value);

  const onChangeTodoEditText = (event, index) => {
    const todos = [...incompleteTodos];
    todos[index].data = event.target.value;
    setIncompleteTodos(todos);
  };

  const onClickAdd = (e) => {
    e.preventDefault()
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText ];
    setIncompleteTodos(newTodos);
    setTodotext({id: todoText.id + 1, body: "", isCompleted: false});
  };

  const onClickDelete = (id) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(id, 1);
    setIncompleteTodos(newTodos);
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

  const saveTask = () => {
    if (editedTodo === "") return
    const newTodoList = incompleteTodos.map(todo => {
      if(todo.id === editedTodo.id) todo.body = editedTodo.body
      return todo
    })
    setIncompleteTodos(newTodoList)
    setEditFlag(true)
  }
  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" value={todoText.body} onChange={onChangeTodoText} />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo) => {
            {
              if (editFlag) {
                return (
                  <div key={todo} className="list-row">
                    <li>{todo}</li>
                    <button onClick={() => {onClickEdit(todo.id)}}>編集</button>
                    {/* ループしないようにアロー関数で！ */}
                    <button onClick={() => onClickDelete(todo.id)}>削除</button>
                  </div>
                )
              } else {
                return (
                  // ループする際親要素にkeyを設定(差分をkeyを目印に抽出するため)
                  <div key={todo}>
                    <input value={todo.body} onChange={handleEditTodo} />
                    <button onClick={saveTask}>保存</button>
                  </div>
                );
              }
            }
          })}
        </ul>
      </div>
    </>
  );
};
