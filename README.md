# Movimingle Integration Tests

This repository is dedicated to integration testing for the Movimingle application, which includes the `favorites-management-service` and `voting-service`. This README outlines the structure of the repository, how to set it up, and how to run tests.

## Repository Structure

The repository leverages Docker Compose to orchestrate the environment needed for running integration tests between the two microservices:

- **Favorites Management Service**: Manages user favorites.
- **Voting Service**: Handles voting functionalities.

Each service is included as a submodule, ensuring that we always test against the most recent changes committed to their respective repositories.

### Submodules

- `favorites-management-service`
- `voting-service`

## Prerequisites

To run the tests in this repository, you will need:

- Docker and Docker Compose
- Git
- Curl (for HTTP requests during testing)

## Setup

Clone this repository and its submodules:

```bash
git clone --recurse-submodules https://github.com/yourusername/movimingle-integration-tests.git
cd movimingle-integration-tests
```

If you've already cloned the repository without the submodules:

```bash
git submodule update --init --recursive
```

## Running Tests

The integration tests are automated via GitHub Actions. However, if you wish to run them manually, you can do so as follows:

### Start all services:

```bash
docker-compose up -d --build
```

### Check the status of services:

```bash
docker-compose ps
```

### Run the integration tests:
This involves making HTTP calls to the services to test their interaction.
```bash
curl -f http://localhost:8080/send?message=Hello
# Add more commands as necessary
```

### Shut down the services:

```bash
docker-compose down
```

## GitHub Actions

Integration tests are automatically triggered by pushes to the main branch or pull requests. You can view the results of these tests in the Actions tab of this repository.

## Updating Submodules

To update the submodules to the latest commit of their respective main branches:

```bash
git submodule update --remote --merge
git commit -am "Update submodules"
git push
```
