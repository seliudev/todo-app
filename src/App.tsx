import {useEffect, useState} from "react";

interface Todo {
    id: number;
    text: string;
}

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    // local storage
    useEffect(() => {
        const loadTodos = () => {
            const saved = localStorage.getItem("todos");
            if (saved) {
                setTodos(JSON.parse(saved));
            }
        };

        loadTodos();
    }, []);

    useEffect(() => {
        if (todos.length === 0) return;
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    const addTodo = () => {
        if (!input.trim()) return;
        setTodos([...todos, {id: Date.now(), text: input}]);
        setInput("");
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-blue-200 p-6 flex justify-center overflow-x-hidden">
            <div
                className="w-full max-w-md p-6 rounded-xl shadow bg-cover bg-center"
                style={{
                    backgroundImage: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='%23ffecadff'/><path d='M0 10h20z' stroke-width='1' stroke='%23e6c23fff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-38,0)' fill='url(%23a)'/></svg>")`,
                }}
            >
                <h1 className="text-3xl text-black font-bold mb-4 font-grace">Todo List</h1>

                {/* Input */}
                <div className="flex justify-between gap-2 mb-4 mt-10 w-full">
                    <input
                        className="flex-1 rounded px-3 py-2 mr-5 outline-none  border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a todo..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addTodo();
                        }}
                    />

                    <button
                        onClick={addTodo}
                        className="bg-blue-600 text-white px-4 py-1 mt-1 mr-2.5 rounded hover:cursor-pointer w-8 h-8 flex items-center justify-center"
                    >
                        <p className="font-medium text-xl">+</p>
                    </button>
                </div>

                {/* Scrollable Todo List */}
                <div className="max-h-[70vh] overflow-y-auto pr-2 mt-10">
                    <ul>
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex items-center justify-between px-3 py-1.5 rounded"
                            >
                            <span className="flex items-center gap-2">
                                <img src="/circle-svgrepo-com.svg" alt="point" className="w-3 h-3" />
                                {todo.text}
                            </span>
                                <button
                                    onClick={() => removeTodo(todo.id)}
                                    className="hover:cursor-pointer"
                                >
                                    <p className="text-red-600 text-xl font-bold">x</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

};

export default App;
