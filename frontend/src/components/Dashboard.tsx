import { Button, Card, TextField, Typography } from '@material-ui/core';
import React from 'react';
import '../App.css';



function Dashboard() {
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [success, setSuccess] = React.useState<string>('');


  return (
    <Card elevation={2} className="Dashboard" style={{ maxHeight: 800 }}>
     Hello
    </Card>
  );
  
}

export default Dashboard;
