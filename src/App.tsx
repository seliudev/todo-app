import { useState } from "react";

interface Todo {
    id: number;
    text: string;
}

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input }]);
        setInput("");
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-200 p-6 flex justify-center">
            <div className="w-full max-w-md bg-yellow-200 p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>

                {/* Input */}
                <div className="flex gap-2 mb-4">
                    <input
                        className="flex-1 border border-yellow-300 rounded px-3 py-2 bg-yellow-100"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a todo..."
                    />
                    <button
                        onClick={addTodo}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer"
                    >
                        Add
                    </button>
                </div>

                {/* Todo Items */}
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between bg-yellow-100 px-3 py-2 rounded"
                        >
                            <span>{todo.text}</span>
                            <button
                                onClick={() => removeTodo(todo.id)}
                                className="text-red-600 hover:cursor-pointer"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
