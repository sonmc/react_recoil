import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { history, useFetchWrapper } from '_helpers';
import { authAtom, todoAtom, todosAtom } from '_state';

export { useTodoActions };

function useTodoActions() {
    const baseUrl = "https://jsonplaceholder.typicode.com/todos";
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setTodos = useSetRecoilState(todosAtom);
    const setTodo = useSetRecoilState(todoAtom);

    return {
        getAll,
        getById,
        update,
        delete: _delete,
        resetTodos: useSetRecoilState(todosAtom),
        resetTodo: useSetRecoilState(todoAtom)
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then((res) => {
            setTodos(res);
        });
    }

    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`).then(setTodo);
    }

    function update(id, params) {
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then(x => {
                if (id === auth?.id) {
                    const Todo = { ...auth, ...params };
                    localStorage.setItem('Todo', JSON.stringify(Todo));
                    setAuth(Todo);
                }
                return x;
            });
    }

    function _delete(id) {
        setTodos(Todos => Todos.map(x => {
            if (x.id === id)
                return { ...x, isDeleting: true };

            return x;
        }));

        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                setTodos(Todos => Todos.filter(x => x.id !== id));
            });
    }
}
