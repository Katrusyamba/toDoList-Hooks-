import React, { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
} from "@mui/material";
import styled from "styled-components";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 550px;
  border: 8px solid rgb(233, 237, 249);
  border-radius: 25px; 
  overflow: hidden;
  margin: 0 auto;
`;

const ButtonsGroup = styled.div`
display: flex;
justifyContent: space-between;
`

const TaskItem = styled.div`

`

const CountItems = styled.div`

`

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [copyTasks, setCopyTasks] = useState<Task[]>([]);

  const addTask = (): void => {
    if (newTask.trim() === "") return;
    const newTaskItem: Task = {
      id: Date.now(),
      text: newTask,
      done: false,
    };
    setTasks([...tasks, newTaskItem]);
    setCopyTasks([...copyTasks, newTaskItem]);
    setNewTask("");
  };

  const toggleTask = (taskId: number): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    const updatedCopyTasks = copyTasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    setCopyTasks(updatedCopyTasks);
  };

  const allTask = (): void => {
    setTasks([...copyTasks]);
  };

  const ActiveTask = (): void => {
    const activeTasks = copyTasks.filter((task) => !task.done);
    setTasks(activeTasks);
  };

  const ComplitedTask = (): void => {
    const complitedTask = copyTasks.filter((task) => task.done);
    setTasks(complitedTask);
  };

  const clearCompletedTask = (): void => {
    const deleteTasks = copyTasks.filter((task) => !task.done);
    setTasks(deleteTasks);
    setCopyTasks(deleteTasks);
  };

  return (
    <Wrapper>
      <Container
        maxWidth="sm"
        style={{
          overflowY: "auto",
          maxHeight: "550px",
          marginTop: "20px",
          position: "relative",
        }}
      >
        <AppBar position="static">
          <Toolbar  data-testid="app-title">
          <Typography variant="h6" style={{ margin: '0 auto', fontSize: '44px' }}>Todos</Typography>
          </Toolbar>
        </AppBar>
        <Box display="flex" alignItems="center" marginTop="30px">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTask}
            style={{ height: "56px", marginLeft: "15px" }}
          >
            Добавить
          </Button>
        </Box>
        <Paper style={{ maxHeight: "300px", overflowY: "auto" }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} data-testid="task">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    color="primary"
                  />
                }
                label={task.text}
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                }}
              />
            </TaskItem>
          ))}
        </Paper>
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="absolute"
          bottom="0"
        >
          <CountItems>{tasks.filter((task) => !task.done).length} items left</CountItems>
          <ButtonsGroup >
            <Button onClick={allTask}>All</Button>
            <Button onClick={ActiveTask}>Active</Button>
            <Button onClick={ComplitedTask}>Completed</Button>
          </ButtonsGroup>
          <Button onClick={clearCompletedTask}>Clear completed</Button>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default App;


