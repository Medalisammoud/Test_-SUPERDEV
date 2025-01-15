import React from 'react';
import { List, Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const EventList = ({ events }) => {
  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={events}
      renderItem={(event) => (
        <List.Item>
          <Card>
            <Title level={3}>{event.title}</Title>
            <Paragraph>{event.description}</Paragraph>
            <Paragraph><strong>Date:</strong> {new Date(event.date).toLocaleString()}</Paragraph>
            <Paragraph><strong>Category:</strong> {event.category}</Paragraph>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default EventList;