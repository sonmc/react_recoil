import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { todosAtom, usersAtom } from '_state';
import { useTodoActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const todos = useRecoilValue(todosAtom);
    const todoActions = useTodoActions();
    const users = useRecoilValue(usersAtom);

    useEffect(() => {
        todoActions.getAll(); 
    }, []);

    console.log("users", users);
    return (
        <div>
            <h1>Todos</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Todo</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Title</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {todos?.map(user =>
                        <tr key={user.id}>
                            <td>{user.title}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => todoActions.delete(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!todos &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
