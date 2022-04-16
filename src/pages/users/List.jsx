import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { usersAtom } from '_state';
import { useUserActions } from '_actions';
import { todosAtom } from '_state';

export { List };

function List({ match }) {
    const { path } = match;
    const users = useRecoilValue(usersAtom);
    const userActions = useUserActions();
    const todos = useRecoilValue(todosAtom);

    useEffect(() => {
        userActions.getAll();  
    }, []);
    
    console.log("111111111", todos);
    return (
        <div>
            <h1>Users</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => userActions.delete(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                      {todos?.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.title}</td> 
                        </tr>
                    )}
                    {!users &&
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
