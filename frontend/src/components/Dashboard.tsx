import { Button, Card, Grid, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import '../App.css';
import ToDoList from './ToDoList';



function Dashboard() {
    // const tasksList = useSelector((state: Store) => state.task);
    const [task, setForm] = useState<any>(false);
    const [listOption, setlistOption] = useState<string>("Lista 0");


    return (
        <div>
            <Grid container alignItems="center">
                <Grid xs={10} item>
                     {listOption}
                </Grid>
                <Grid xs={2} item>
                    <Button onClick={() => setForm(true)}>
                        Add task
                    </Button>
                </Grid>
            </Grid>
            <Grid className="pt-5 font-bold bg-gradient-to-r from-cyan-300 to-sky-300" container alignItems="center">
                <Grid xs={3} item>
                    {["lista 1", "lista 2", "lista 3"].map((m) => 
                        <ListItem button onClick={() => setlistOption(m)}>
                            <ListItemText primary={m} />
                        </ListItem>
                    )}
                </Grid>
                <Grid xs={9} item>
                    <ToDoList task={task} ></ToDoList>
                </Grid>
            </Grid>
        </div>
    );

}

export default Dashboard;
