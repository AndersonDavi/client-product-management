# ProductManagement

## Requirements

- Node.js (version 20 or higher)
- Angular CLI (version 17.2.2 or higher)
- Docker (optional, for container deployment)

## Environment Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/product-management.git
   cd product-management
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file based on the `.env.template` file and configure the necessary environment variables.

## Running Locally

1. Run the following command to start the application in development mode:
   ```sh
   npm run start
   ```

2. Open your browser and navigate to `http://localhost:4200`.

## Build

1. Run the following command to build the project:
   ```sh
   npm run build
   ```

2. The build artifacts will be stored in the `dist/` directory.

## Deployment with Docker

1. Build the Docker image:
   ```sh
   docker build -t product-management .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 80:80 product-management
   ```

3. Open your browser and navigate to `http://localhost`.

## Testing

1. Run unit tests:
   ```sh
   npm run test
   ```

## Project Structure

- `src/`: Source code of the Angular application.
- `dist/`: Output directory for build artifacts.
- `Dockerfile`: Configuration file for building the Docker image.
- `nginx.conf`: Nginx configuration file for serving the Angular application.
