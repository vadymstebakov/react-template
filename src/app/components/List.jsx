import React, { useRef, useState } from 'react';
import useScroll from '@hooks/useScroll';
import axios from '@axios';
import ThemeUtils from '@utils';

const List = () => {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const parentRef = useRef();
    const childRef = useRef();

    const fetchTodos = async (page, limit) => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`);
        await ThemeUtils.sleep(1000);

        setTodos(prev => [...prev, ...data]);
        setPage(prev => prev + 1);

        return data;
    };

    const isEnd = useScroll(parentRef, childRef, () => fetchTodos(page, limit));
    console.log(isEnd);
    return (
        <div ref={parentRef} style={{ height: '80vh', overflow: 'auto' }}>
            {todos.map(todo => (
                <div key={todo.id} style={{ padding: 30, border: '2px solid black' }}>
                    {todo.id}. {todo.title}
                </div>
            ))}
            {!isEnd && (
                <div ref={childRef} style={{ height: 20, background: 'darkblue', color: 'tomato' }}>
                    LOADING...
                </div>
            )}
        </div>
    );
};

export default List;
