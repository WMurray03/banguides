import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { v4 as uuid } from 'uuid';

function Todo() {

    // ---- Bunch of useStates ----
    const [todos, setTodos] = useState([])

    const [timeOfDay, setTimeOfDay] = useState('')

    const [currentTime, setCurrentTime] = useState('');

    const [snackbarState, setSnackbarState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = snackbarState;

    const [notificationMessage, setNotificationMessage] = useState('')

    // ---- Clock ----
    function updateClock() {
        const time = new Date()
        setCurrentTime(time.toLocaleTimeString());

        const hours = time.getHours()
        if (hours < 12) {
            setTimeOfDay('Good Morning')
        } else if (hours < 18) {
            setTimeOfDay('Good Afternoon')
        } else {
            setTimeOfDay('Good Evening')
        }
    }

    useEffect(() => {
        updateClock();
        setTodos(JSON.parse(localStorage.getItem('todos')))
    }, []);

    setInterval(updateClock, 1000)

    // ---- Todo Functions ----

    function createTodo() {
        let i = todos.length;

        if (document.getElementById('text').value === '') {
            return;
        } else {
            // Updates
            const updatedTodos = [...todos]
            updatedTodos.splice(i + 1, 0, {
                content: document.getElementById('text').value,
                isCompleted: false,
                id: uuid()
            })

            // Updates Localstorage
            setTodos(updatedTodos)
            localStorage.setItem('todos', JSON.stringify(updatedTodos))

            // Notification
            setNotificationMessage("Task Added")
            setSnackbarState({ ...snackbarState, open: true });

            // Clears text box
            document.getElementById('text').value = ''
        }
    }

    function updateTodo(e, i) {
        const updatedTodos = [...todos]
        updatedTodos[i].content = e.target.value

        // Updates Localstorage
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))

    }

    function removeTodo(e) {
        let i = e.target.id;
        const updatedTodos = [...todos]
        updatedTodos.splice(i, 1)


        // Updates Localstorage
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))

        // Notification
        setNotificationMessage("Task Deleted")
        setSnackbarState({ ...snackbarState, open: true });
    }

    function updateTodoCheckbox(i) {
        console.log(i)
        const updatedTodos = [...todos]
        updatedTodos[i].isCompleted = !updatedTodos[i].isCompleted

        // Updates Localstorage
        setTodos(updatedTodos)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }

    function closeSnackbar() {
        setSnackbarState({ ...snackbarState, open: false });
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    return (
        <div className="page-container">
            <header>
                <div className="Header-Container">
                    <div>
                        <p id="time">{currentTime}</p>
                    </div>
                </div>
            </header>

            <main>
                <div className="greeting">
                    <h2 id="greeting-text">{timeOfDay}</h2>
                    <h3>Enter your daily tasks, check them as you go!</h3>
                </div>

                <div className="new-task">
                    <input id="text" className="input-text-box" type="text" placeholder="Add a new task" />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createTodo}
                        sx={{
                            backgroundColor: '#1663be',
                            color: 'white',
                            width: '216px',
                            height: '32px',
                            marginBottom: '20px',
                            border: '1px #333 solid',
                            borderRadius: '3px',
                            fontWeight: 'bold',
                        }}
                    >Add
                    </Button>
                </div>

                <ul className="todo-list">
                    {todos.map((todo, i) => (
                        <li key={todo.id} className="todo">
                            <div className="columnone">
                                <input className="checkbox" checked={todo.isCompleted} type="checkbox" id={"checkbox" + i} onChange={() => updateTodoCheckbox(i)} />
                                <input className="text" type="text" value={todo.content} onChange={e => updateTodo(e, i)} />
                            </div>
                            <div className="columntwo">
                                <Button
                                    id={i}
                                    onClick={e => removeTodo(e)}
                                    sx={{
                                        fontWeight: 'bold',
                                        width: '64px',
                                        height: '27px',
                                        padding: 0,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >DEL
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div>
                    <Snackbar className='snackbar'
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={closeSnackbar}
                        autoHideDuration={5000}
                        message={notificationMessage}
                        key={vertical + horizontal}
                        action={action}
                    />
                </div>
            </main>
        </div>
    )
}

export default Todo