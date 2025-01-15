import { render, screen, waitFor } from "@testing-library/react";
import EventsPage from "./EventsPage";

// Mock axios globally
jest.mock('axios');

beforeEach(() => {
  // Reset all mocks before each test
  axios.get.mockReset();
});

test("title should be rendered", async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, title: "Event 1" }] });

  render(<EventsPage />);

  // Wait for the title to appear
  await waitFor(() => screen.getByText(/Event Management/i));
  expect(screen.getByText(/Event Management/i)).toBeInTheDocument();
});

test("event list should be displayed", async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, title: "Event 1" }] });

  render(<EventsPage />);

  // Wait for the event to be displayed
  await waitFor(() => expect(screen.getByText(/Event 1/i)).toBeInTheDocument());
});

test("loading should be rendered while fetching events", async () => {
  // Mock API call delay to simulate loading
  axios.get.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: [{ id: 1, title: "Event 1" }] }), 1000)));

  render(<EventsPage />);

  // Ensure loading message is shown while fetching data
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  // Wait for loading text to disappear after data is fetched
  await waitFor(() => expect(loadingText).not.toBeInTheDocument());
});
