# Prefix Management Service

## Overview

This HTTP microservice exposes a GET REST API endpoint `/numbers/:type` using Node.js and Express. It retrieves a list of numbers from a specified URL and performs various operations based on the type of numbers requested.

## Features

- Fetches numbers from a given URL with authorization using a bearer token.
- Supports different types of number categories: Even Numbers (`e`), Prime Numbers (`p`), and Odd Numbers (`o`).
- Calculates the average of the numbers.
- Maintains the previous and current states of the numbers.

## API Endpoint

### GET `/numbers/:type`

#### Parameters

- `type` (URL parameter): The type of numbers to retrieve. Possible values:
  - `e` for Even Numbers
  - `p` for Prime Numbers
  - `o` for Odd Numbers

- `url` (Query parameter): The URL to fetch the numbers from. This should return a JSON object with an array of numbers in the `numbers` property.

#### Response

- `type`: Description of the type of numbers.
- `numbers`: The array of numbers fetched from the URL.
- `windowsprevState`: Previous state of the numbers.
- `windowscurrentState`: Current state of the numbers.
- `avg`: Average of the current numbers.

#### Example Request

```http
GET /numbers/e?url=https://example.com/api/numbers
