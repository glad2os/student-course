import axios from 'axios';

const graphqlAPI = axios.create({
    baseURL: 'http://localhost:4000/graphql', // Your GraphQL endpoint
    headers: {
        'Content-Type': 'application/json',
    },
});

export default graphqlAPI;