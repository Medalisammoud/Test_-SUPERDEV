import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Space, Modal } from 'antd';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { Pagination } from 'antd';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearch = (query) => {
    const value = query.target.value;
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(value.toLowerCase()) ||
        event.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setFilteredEvents((prev) => [...prev, newEvent]);
    setIsModalVisible(false); // Close modal after event creation
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Calculate the events to display based on current page and page size
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Event Management</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search events"
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          Add New Event
        </Button>
      </Space>

      {/* Modal for adding new event */}
      <Modal
        title="Add New Event"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <EventForm onEventCreated={handleEventCreated} />
      </Modal>

      {/* Event List with Pagination */}
      <EventList events={paginatedEvents} />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredEvents.length}
        onChange={onPageChange}
        style={{ marginTop: 16, textAlign: 'center' }}
      />
    </div>
  );
};

export default EventsPage;
