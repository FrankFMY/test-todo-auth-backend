import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';
import { Todo } from '../types/todo';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTodos();
    // eslint-disable-next-line
  }, [token]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (e) {
      setError('Ошибка загрузки задач');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) return setError('Заголовок обязателен');
    try {
      await createTodo({ title, description });
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (e) {
      setError('Ошибка создания задачи');
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      fetchTodos();
    } catch (e) {
      setError('Ошибка обновления');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (e) {
      setError('Ошибка удаления');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Мои задачи</h2>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">Выйти</button>
        </div>
        <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Заголовок"
            className="flex-1 p-2 border rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Описание"
            className="flex-1 p-2 border rounded"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Добавить</button>
        </form>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        <ul>
          {todos.map(todo => (
            <li key={todo._id} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo)} />
                <span className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.title}</span>
                {todo.description && <span className="text-xs text-gray-500 ml-2">{todo.description}</span>}
              </div>
              <button onClick={() => handleDelete(todo._id)} className="text-red-500 hover:underline text-sm">Удалить</button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && <div className="text-gray-500 text-center mt-4">Нет задач</div>}
      </div>
    </div>
  );
};

export default Todos; 