# CRUD App Documentation

## Overview

This CRUD (Create, Read, Update, Delete) application was developed using Vite + React for the frontend and Firebase for backend services. The application allows users to perform basic CRUD operations on menu items.

## Technologies Used

- **Vite + React**: Vite was used as the build tool and development server. It provided fast builds and hot module replacement during development.
- **Tailwind CSS**: Tailwind CSS was utilized for styling the UI components. Its utility-first approach allowed for rapid styling and customization.
- **Fuse.js**: Fuse.js was integrated into the application to implement client-side full-text search functionality. This allows users to efficiently search for menu items based on their name or category.

## Other Libraries Used

- **Compressor JS**: Compressor JS was used for compressing images before uploading them to Firebase Storage, optimizing storage usage and improving loading times.
- **React Router Dom**: React Router Dom was utilized specifically for updating URL search query parameters to persist state on page reloads. By managing state in the URL, the application ensures that users can navigate back to the same view and retrieve previous data even after reloading the page.
- **React Modal**: React Modal was utilized for creating modal dialogs within the application, enhancing user interaction for actions like item creation or editing.
- **React Toastify**: React Toastify was integrated to display toast notifications for user feedback on various actions such as successful item creation or deletion.
- **React Tooltip**: React Tooltip was used to provide informative tooltips for UI elements, improving user experience by offering contextual information.

## Features

- **Basic CRUD Operations**: Users can create, read, update, and delete menu items.
- **Image Upload**: Although not originally required (based on instructions), the application includes a feature for uploading images for menu items using Firebase Storage. This adds visual appeal and enhances the user experience.
- **Full-text Search**: The application incorporates client/browser-side full-text search functionality using Fuse.js. This allows users to quickly search for menu items by name or category without reloading the page.
