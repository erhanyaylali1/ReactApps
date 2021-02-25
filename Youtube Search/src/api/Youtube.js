import axios from 'axios';

const KEY = 'AIzaSyA01xKivQqM69sOzIAC7PU45noCusheqSg';

const Youtube = async (term) => {

  const response = await axios.get('https://www.googleapis.com/youtube/v3/search',{
    params: {
      q: term,
      part: 'snippet',
      maxResults: 10,
      type: 'video',
      key: KEY,
    }
  });

  return response.data.items;
}

export default Youtube