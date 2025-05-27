import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'antd';

const TaskInput = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (!title.trim()) return;
        onAdd(title);
        setTitle('');
    };

    return (
        <Row gutter={8}>
            <Col flex="auto">
                <Input
                    placeholder="Nouvelle tâche"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onPressEnter={handleAdd}
                />
            </Col>
            <Col>
                <Button type="primary" onClick={handleAdd}>Ajouter</Button>
            </Col>
        </Row>
    );
};

export default TaskInput;
