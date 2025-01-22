# AI Email Reply Generator

The **AI Email Reply Generator** is a full-stack web application that uses **Spring Boot** for the backend and **React** for the frontend. It generates professional, casual, or friendly email replies based on the provided email content. This application leverages the **Gemini API** to generate email replies dynamically.

## Features

- **Generate Email Replies**: Input the original email content and select a tone (optional) to generate a professional, casual, or friendly reply.
- **Copy to Clipboard**: Easily copy the generated email reply to your clipboard.
- **User-Friendly UI**: Clean and intuitive user interface built with React and Material-UI.
- **Responsive Design**: The app is fully responsive and works seamlessly on both desktop and mobile devices.

## Tech Stack

- **Backend**:

  - Spring Boot (Java)
  - WebClient (for making API requests)
  - JSON processing with Jackson
  - Lombok for boilerplate code reduction

- **Frontend**:

  - React
  - Material-UI for UI components
  - Axios for making HTTP requests
  - React hooks for state management

- **External API**: Gemini API for generating email replies
