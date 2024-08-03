# This documentation provides a high-level overview of the key aspects of your Contact Management App, including the store configuration, states, slices, components, pages, libraries used, and React functions utilized. This should help guide further development and maintenance of the application. 

## Contact Management App
# Documentation
# 1. Store
The central Redux store is configured in store.ts. It combines different slices for state management.
contacts: Manages the list of contacts.
loader: Manages the loading state for the application.

# 2. States
contacts: A list of contacts with properties like id, firstName, lastName, and status.
loader: A boolean indicating if a loader should be displayed.

# 3. Slices
contactsSlice.ts: Handles actions like adding, editing, and deleting contacts.
loaderSlice.ts: Handles actions for showing and hiding the loader.

# 4. Components
ContactDetails.tsx: Displays and edits the details of a selected contact using a form.
ContactForm.tsx: Manages the form for adding/editing contacts, handling form state and validation.
ContactList.tsx: Displays the list of contacts with options for editing and deleting each contact.
FullPageLoader.tsx: Displays a full-page loader overlay when data is being loaded.
Loader.tsx: Displays a loader within the main content area during data fetching.
LineChart.tsx: Displays a line chart with COVID-19 historical data using Chart.js.
Sidebar.tsx: Displays a collapsible sidebar menu with navigation links to different pages.
WorldMap.tsx: Displays an interactive map with COVID-19 data for different countries using Leaflet.

# 5. Pages
ChartsAndMaps.tsx: Container that displays the LineChart and WorldMap components together.
Contacts.tsx: Manages and displays contacts, allowing users to create and edit contacts using ContactForm and ContactList.

# 6. Libraries Used
React: Core library for building the user interface.
Redux: For state management of the application.
Redux Toolkit: Simplifies Redux usage.
React-Redux: Provides bindings for using Redux with React.
React-Router-Dom: For routing in the application.
React-Query: For data fetching and server-state management.
React Hook Form: For handling form state and validation.
Axios: For making HTTP requests.
Chart.js: For rendering charts.
React-Chartjs-2: React wrapper for Chart.js.
Leaflet: For interactive maps.
React-Leaflet: React wrapper for Leaflet.
Tailwind CSS: For styling the application.

# 7. React Functions Used
useState: For managing local state in functional components.
useEffect: For handling side effects in functional components.
useDispatch: For dispatching actions to the Redux store.
useSelector: For selecting data from the Redux store.
useParams: For accessing the URL parameters.
useNavigate: For programmatic navigation.
useQuery: For data fetching and caching with React Query.
handleSubmit and register: From react-hook-form for form management.
BrowserRouter, Routes, Route: For routing in the application.

# 8. Additional Notes
Responsive Design: Tailwind CSS utility classes are used extensively to ensure the application is responsive across different devices.
TypeScript: Ensures type safety throughout the codebase.
Loaders: Handling loaders using FullPageLoader for the homepage and regular Loader for other pages to enhance user experience during data fetching.