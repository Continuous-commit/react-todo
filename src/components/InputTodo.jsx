import '../App.css';

export const InputTodo = (props) => {
  const { todo, onChange, onClick } = props;
  return (
    <div className="input">
      <input placeholder="TODOを入力" value={todo.body} onChange={onChange} className="input-area" />
      <button onClick={onClick}>追加</button>
    </div>
  )
};
