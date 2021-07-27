import { Button, Card, Grid, ListItemText, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import '../App.css';
import ToDoList from './ToDoList';



function Dashboard() {
    // const tasksList = useSelector((state: Store) => state.task);
    const [task, setForm] = useState<any>(false);


    return (
        <div>
            <Grid container alignItems="center">
                <Grid xs={10} item>
                    Lista 0
                </Grid>
                <Grid xs={2} item>
                    <Button onClick={() => setForm(true)}>
                        Add task
                    </Button>
                </Grid>
            </Grid>
            <Grid container alignItems="center">
                <Grid xs={3} item>
                      lista1 <br></br>
                      lista2 <br></br>
                      lista3 <br></br>
                </Grid>
                <Grid xs={9} item>

                    <ToDoList task={task} ></ToDoList>
                </Grid>
            </Grid>
        </div>
    );

}

export default Dashboard;
