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
