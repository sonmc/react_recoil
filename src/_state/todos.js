import { atom } from 'recoil';

const todosAtom = atom({
    key: 'todos',
    default: null
});

const todoAtom = atom({
    key: 'todo',
    default: null
});

export { 
    todosAtom,
    todoAtom
};