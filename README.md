### Social Network API - README

This repository contains the code for a Social Network API, designed to serve as the backend for a social media application. The API is built using Node.js, Express.js, and MongoDB with Mongoose for handling large amounts of unstructured data.

## Table of Contents
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Posts](#posts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with this Social Network API, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
    cd social-network-api

2.  Install the dependencies
    npm install

3.  Setup environment variables:
    * Create a .env file in the root directory of the project.
    * Add the following environment variables to the .env file:
        MONGO_URL=your-mongodb-connection-string
    Replace your-mongodb-connection-string with your MongoDB connection string.

4. Start the server:
    npm start

The server will start, and the Mongoose models will be synced to the MongoDB database specified in your environment variables.

## Usage
The Social Network API provides various routes for interacting with users and thoughts, including creating, updating, and deleting users and thoughts, as well as adding and removing reactions to thoughts and managing friends in a user's friend list.

To interact with the API, you can use API client tools like Insomnia or Postman. The following sections outline the available API routes.

## API Routes

# Authentication
* POST /api/auth/register: Register a new user by providing a username, email, and password. The password is securely hashed before storing it in the database.

* POST /api/auth/login: Authenticate a user by providing their email and password. If the provided credentials are correct, the user is logged in.

# Users
* GET /api/users/:id: Retrieve a specific user by their ID.

* PUT /api/users/:id: Update a user's information. The user can update their profile details, including the password, if authenticated.

* DELETE /api/users/:id: Delete a user's account. The user can delete their own account if authenticated.

* PUT /api/users/:id/follow: Follow another user. This route allows a user to follow another user by their ID.

* PUT /api/users/:id/unfollow: Unfollow another user. This route allows a user to unfollow another user by their ID.

# Posts
* POST /api/posts: Create a new post. Users can create posts with this route.

* PUT /api/posts/:id: Update a post. Users can update their own posts using this route.

* DELETE /api/posts/:id: Delete a post. Users can delete their own posts using this route.

* PUT /api/posts/:id/like: Like or unlike a post. Users can like or unlike posts using this route.

* GET /api/posts/:id: Retrieve a specific post by its ID.

* GET /api/posts/timeline: Retrieve all timeline posts. This route returns posts from the user's own timeline, including posts from users they follow.

Please refer to the API documentation for detailed information on request payloads and response formats for each route. information on request payloads and response formats for each route.

## Contributing
Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them to your branch.
4. Create a pull request to merge your branch into the main repository.

## License
This project is licensed under the MIT License. 