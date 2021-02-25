import axios from 'axios';

const Unsplash = async (term) => {

    const response = await axios.get('https://api.unsplash.com/search/photos',{
        params: {
            query: term
        }, 
        headers: {
            Authorization: 'Client-ID AsFWIr4HVphakCqgqwQ6YfaMQLwfS55nwQRbSyAFvEE', 
        }
    });
    return response.data.results;
}

export default Unsplash