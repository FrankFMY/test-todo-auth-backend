import { Todo } from '../types/todo';

const API_URL =
    (process.env.REACT_APP_API_URL || 'http://localhost:3000/api') + '/todos';

function getToken() {
    return localStorage.getItem('token');
}

export async function getTodos(): Promise<Todo[]> {
    const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.json();
}

export async function createTodo(data: Partial<Todo>): Promise<Todo> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateTodo(
    id: string,
    data: Partial<Todo>
): Promise<Todo> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteTodo(id: string): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.json();
}
