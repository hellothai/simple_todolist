import { Button, Card, Grid, ListItemText, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import '../App.css';



function ToDoList(props) {
    // const tasksList = useSelector((state: Store) => state.task);
    const [task, setForm] = useState<any>(false);
    const [newTask, setNewTask] = useState<string>("");
    const [taskList, setTaskList] = useState<any>([
        "Primeira Task"
    ]);

    const submit = (task) => {
        taskList.push(task);
        setTaskList(taskList)
    };

    return (
        <div>
            {props.task &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    submit(
                        newTask
                    );
                }} noValidate autoComplete="off">
                    <div>
                        <TextField
                            label="Task"
                            id="outlined-size-small"
                            defaultValue=""
                            variant="outlined"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            size="small"
                        />
                        <Button size="small" variant="contained" type="submit" >
                            ok
                        </Button>

                    </div>
                </form>}
            <div>
                <Grid container>
                    <Grid item xs={4}>
                        TO-DO
                        {taskList.map((m) => (
                            <ListItemText primary={` ${m}`} />
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                        DOING
                    </Grid>
                    <Grid item xs={4}>
                        DONE
                    </Grid>
                </Grid>

            </div>

        </div>
    );

}

export default ToDoList;
