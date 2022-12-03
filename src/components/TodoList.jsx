import '../App.css';

export const TodoList = (props) => {
  const { editFlag,
          allTaskCount, 
          completedCount,
          inCompletedCount,
          todoList,
          onClickComplete,
          onClickEdit,
          onClickDelete,
          handleEditTodo,
          saveTask
        } = props;
  return (
    <>
      <div className="status-field">
        <ul className="status">
          <li className="status-list">全てのタスク: {allTaskCount()}</li>
          <li className="status-list">完了済: {completedCount()}</li>
          <li className="status-list">未完了: {inCompletedCount()}</li>
        </ul>
      </div>
      <div className="todo-area">
        <ul>
          {todoList.map((todo) => {
            if (editFlag) {
              return (
                <div key={todo} className="list-row">
                  <input type="checkbox" onClick={() => {onClickComplete(todo.id)}} className="checkbox" />
                  <li className="text">{todo.body}</li>
                  <button onClick={() => {onClickEdit(todo.id)}}>編集</button>
                  {/* ループしないようにアロー関数で！ */}
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>
                </div>
              )
            } else {
              return (
                // ループする際親要素にkeyを設定(差分をkeyを目印に抽出するため)
                <div key={todo} className="list-row">
                  <input type="checkbox" onClick={() => {onClickComplete(todo.id)}} className="checkbox" />
                  <input defaultValue={todo.body} onChange={handleEditTodo} className="text" />
                  <button onClick={() => saveTask(todo.id)}>保存</button>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </>
  )
};
