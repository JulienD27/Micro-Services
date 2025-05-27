import React, { useState } from 'react';
import { List, Checkbox, Button, Space, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const showEditModal = () => {
        setEditedTitle(task.title);
        setIsModalVisible(true);
    };

    const handleEdit = () => {
        if (editedTitle.trim()) {
            onEdit(task.id, editedTitle);
        }
        setIsModalVisible(false);
    };

    return (
        <>
            <List.Item
                actions={[
                    <Button icon={<EditOutlined />} onClick={showEditModal} />,
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(task.id)}
                    />
                ]}
            >
                <Space>
                    <Checkbox
                        checked={task.completed}
                        onChange={() => onToggle(task.id, task.completed)}
                    />
                    <span
                        onClick={showEditModal}
                        style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            cursor: 'pointer'
                        }}
                    >
            {task.title}
          </span>
                </Space>
            </List.Item>

            <Modal
                title="Modifier la tâche"
                open={isModalVisible}
                onOk={handleEdit}
                onCancel={() => setIsModalVisible(false)}
                okText="Valider"
                cancelText="Annuler"
            >
                <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onPressEnter={handleEdit}
                />
            </Modal>
        </>
    );
};

export default TaskItem;
