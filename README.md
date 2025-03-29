# hackathon-2025
# Carbon Footprint Suggestions

This project provides an application aimed at helping users reduce their carbon footprint by suggesting eco-friendly actions and tools. The application includes both frontend and backend components to handle user interactions and data.

## Features

1. **Carbon Footprint Tips**: Users are provided with various suggestions and resources to help them lower their environmental impact.
2. **Browser Extension**: The "Ecobyte Datacounter" extension is provided to help users track their carbon consumption while browsing the internet.
3. **Tree Planting Initiatives**: The application encourages users to support tree planting initiatives through services like Ecosia and Treedom.

## Project Structure
carbon-footprint-suggestions/
├── backend/            # Contains the backend server logic and API.
├── frontend/           # Contains the frontend UI of the application.
└── README.md           # This file.

## Technologies Used

- **Frontend**: HTML, CSS (Bootstrap), JavaScript.
- **Backend**: Node.js, Express.js, MongoDB (for storage).
- **Database**: MongoDB (can be replaced with another database as needed).
- **Extensions**: Ecobyte Datacounter browser extension.

## Setup and Installation

### Frontend

1. Navigate to the `frontend` folder.
2. Open the `index.html` file in your browser or serve it using any local server (e.g., using `live-server` in VSCode).

### Backend

1. Navigate to the `backend` folder.
2. Install dependencies

3. Set up environment variables:
    - Create a `.env` file in the `backend` directory and add the necessary configurations (e.g., PostgreSQL crdential).
4. Run the server:
navigate to the `src` folder
    ```bash
    node index.js
    ```
    The backend server will be running on `http://localhost:3000`.

## Contributing

Feel free to fork this repository and submit a pull request if you'd like to contribute. Please make sure to write tests for any new features you add.

## License

This project is open source and available under the MIT License. See the [LICENSE](LICENSE) file for details.