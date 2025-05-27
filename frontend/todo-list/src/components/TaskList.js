import React from 'react';
import { List } from 'antd';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
    return (
        <List
            bordered
            dataSource={tasks}
            renderItem={(task) => (
                <TaskItem
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            )}
            locale={{ emptyText: 'Aucune tâche' }}
        />
    );
};

export default TaskList;
