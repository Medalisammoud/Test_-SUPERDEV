import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button, message } from 'antd';

const { TextArea } = Input;

const EventForm = ({ onEventCreated }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/events`, {
        ...values,
        date: values.date.toISOString(), // Convert moment object to ISO string
      });
      onEventCreated(response.data);
      form.resetFields();
      message.success('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      message.error('Failed to create event. Please try again.');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        title: '',
        description: '',
        date: null,
        category: '',
      }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title!' }]}
      >
        <Input placeholder="Enter event title" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea rows={4} placeholder="Enter event description" />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select a date!' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>

      <Form.Item label="Category" name="category">
        <Input placeholder="Enter event category" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
