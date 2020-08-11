require('dotenv').config();

const API_ENDPOINT =
<<<<<<< HEAD
  process.env.API_SERVER_PORT || 'http://localhost:4000/graphQL';
=======
  process.env.API_SERVER_PORT ||
  'http://localhost:4000/graphql' ||
  'https://queuetacular-api.herokuapp.com/graphql';
>>>>>>> f900dbf54190ba82dd8d2b8ff989276569d8560e

export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    // console.log(result.data);
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
    return null;
  }
}
