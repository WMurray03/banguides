import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { v4 as uuid } from 'uuid';
import axios from 'axios';

function Todo() {

    // ---- Bunch of Consts ----
    const URL = 'http://localhost:3000';

    // ---- Bunch of useStates ----
    const [todos, setTodos] = useState([])

    const [timeOfDay, setTimeOfDay] = useState('')

    const [currentTime, setCurrentTime] = useState('');

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = snackbarState;

    const [createTextBoxValue, setCreateTextBoxValue] = useState("");

    const [notificationMessage, setNotificationMessage] = useState('');

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
        updateClock()
        fetchTasks()
    }, []);

    setInterval(updateClock, 1000)

    // ---- Data Handling ----
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${URL}/tasks`);
            setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // ---- Todo Functions ----
    const createTask = async () => {
        let i = todos.length;

        if (createTextBoxValue === '') {
            return;
        } else {
            // Updates
            const updatedTodos = [...todos]
            updatedTodos.splice(i + 1, 0, {
                content: createTextBoxValue,
                iscompleted: false,
                id: uuid()
            })

            // Updates state
            setTodos(updatedTodos)

            // POST request
            try {
                // Notification
                setNotificationMessage("Pending")
                const response = await fetch(`${URL}/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTodos[i]),
                });

                if (response.ok) {
                    // Notification
                    setNotificationMessage("Task Created")
                    setSnackbarState({ ...snackbarState, open: true });
                } else {
                    console.error('Failed to create field.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }

            // Clears text box
            setCreateTextBoxValue("")
        }
    }

    const updateTask = async (i) => {
        // PUT Request
        try {
            // Notification
            setNotificationMessage("Pending")
            setSnackbarState({ ...snackbarState, open: true });
            const response = await fetch(`${URL}/tasks/${todos[i].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: todos[i].id, content: todos[i].content, iscompleted: todos[i].iscompleted }),
            });

            if (response.ok) {
                // Notification
                setNotificationMessage("Task Updated")
                setSnackbarState({ ...snackbarState, open: true });
            } else {
                console.error('Failed to update field.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const deleteTask = async (i, e) => {
        const updatedTodos = [...todos]
        updatedTodos.splice(i, 1)

        // Updates Localstorage
        setTodos(updatedTodos)

        // Delete Request
        try {
            // Notification
            setNotificationMessage("Pending")
            setSnackbarState({ ...snackbarState, open: true });
            const response = await fetch(`${URL}/tasks/${todos[i].id}}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: todos[i].id, content: todos[i].content, iscompleted: todos[i].iscompleted }),
            });

            if (response.ok) {
                // Notification
                setNotificationMessage("Task Deleted")
                setSnackbarState({ ...snackbarState, open: true });
            } else {
                console.error('Failed to delete field.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    async function updateTaskCheckbox(i, e) {
        const updatedTodos = [...todos]
        updatedTodos[i].iscompleted = !updatedTodos[i].iscompleted
        // Updates Localstorage
        setTodos(updatedTodos)

        // PUT Request
        try {
            const response = await fetch(`${URL}/tasks/${todos[i].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: todos[i].id, content: todos[i].content, iscompleted: todos[i].iscompleted }),
            });

            if (!response.ok) {
                console.error('Failed to update field.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    function closeSnackbar() {
        setSnackbarState({ ...snackbarState, open: false });
    }

    const handleCreateText = (event) => {
        setCreateTextBoxValue(event.target.value);
    };

    const handleTaskValueChange = (index, event) => {
        const updatedTodos = [...todos]
        updatedTodos[index].content = event.target.value
        setTodos(updatedTodos)
    };

    const sendTaskValueChange = (index) => {
        updateTask(index)
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
                    <input id="text" className="input-text-box" value={createTextBoxValue} onChange={handleCreateText} type="text" placeholder="Add a new task" />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createTask}
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
                                <input className="checkbox" checked={todo.iscompleted} type="checkbox" id={"checkbox" + i} onChange={(e) => updateTaskCheckbox(i, e)} />
                                <input className="text" type="text" value={todo.content} onChange={(e) => handleTaskValueChange(i, e)} />
                            </div>
                            <div className="columntwo">
                                <Button
                                    id={i}
                                    onClick={e => sendTaskValueChange(i, e)}
                                    sx={{
                                        fontWeight: 'bold',
                                        width: '64px',
                                        height: '27px',
                                        padding: 0,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >UPDATE
                                </Button>

                                <Button
                                    id={i}
                                    onClick={e => deleteTask(i, e)}
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