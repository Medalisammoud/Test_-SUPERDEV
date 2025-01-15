let events = [];
let currentId = 1;

// Récupérer tous les événements
const getAllEvents = (req, res) => {
  res.json(events);
};

// Créer un nouvel événement
const createEvent = (req, res) => {
  const { title, description, date, category } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and date are required.' });
  }

  const newEvent = {
    id: currentId++,
    title,
    description,
    date,
    category,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

// Récupérer un événement par ID
const getEventById = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).json({ message: 'Event not found.' });
  }
  res.json(event);
};

// Mettre à jour un événement
const updateEvent = (req, res) => {
  const { title, description, date, category } = req.body;
  const event = events.find(e => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  if (title) event.title = title;
  if (description) event.description = description;
  if (date) event.date = date;
  if (category) event.category = category;

  res.json(event);
};

// Supprimer un événement
const deleteEvent = (req, res) => {
  const index = events.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  events.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
