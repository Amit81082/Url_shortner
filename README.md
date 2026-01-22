# URL Shortener

A simple URL shortener built with Next.js and MongoDB.

## Features

* Shorten long URLs
* Track clicks on shortened URLs
* User authentication and authorization

## How to use

1. Shorten a long URL by sending a POST request to `/api/shorten`.
2. Get the shortened URL by sending a GET request to `/api/shorten/:code`.
3. Track clicks on a shortened URL by sending a GET request to `/api/shorten/:code/stats`.

## API Endpoints

### Shorten a long URL

* **POST** `/api/shorten`
	+ Request body: `{"url": "https://example.com"}`
	+ Response: `{"code": "abcd", "longUrl": "https://example.com", "clicks": 0}`

### Get shortened URL

* **GET** `/api/shorten/:code`
	+ Request params: `{"code": "abcd"}`
	+ Response: `{"code": "abcd", "longUrl": "https://example.com", "clicks": 0}`

### Track clicks on shortened URL

* **GET** `/api/shorten/:code/stats`
	+ Request params: `{"code": "abcd"}`
	+ Response: `{"clicks": 1}`

## Local Development

1. Clone the repository and install dependencies with `npm install` or `yarn install`.
2. Start the development server with `npm run dev` or `yarn dev`.
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

