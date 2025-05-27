import React, { useEffect, useState } from 'react';
import { Layout, Typography, Divider, message } from 'antd';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css'

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + '/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    }
  };

  const addTask = async (title) => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + '/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (res.ok) {
        message.success('Tâche ajoutée');
        fetchTasks();
      }
    } catch (error) {
      message.error('Erreur lors de l’ajout');
    }
  };

  const toggleTask = async (id, completed) => {
    await fetch(process.env.REACT_APP_API_URL + `/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  const editTask = async (id, newTitle) => {
    await fetch(process.env.REACT_APP_API_URL + `/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(process.env.REACT_APP_API_URL + `/tasks/${id}`, {
      method: 'DELETE',
    });
    message.info('Tâche supprimée');
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Title style={{ color: 'white', margin: 0 }} level={3}>ToDo List</Title>
        </Header>
        <Content style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
          <TaskInput onAdd={addTask} />
          <Divider />
          <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
          />
        </Content>
      </Layout>
  );
}

export default App;
