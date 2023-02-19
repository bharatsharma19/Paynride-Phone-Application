import axios from 'axios';

//const ServerURL = 'http://10.0.2.2:3001';
const ServerURL = 'http://192.168.29.107:3001';

const getData = async url => {
  try {
    var response = await fetch(`${ServerURL}/${url}`);

    var result = await response.json();

    return result;
  } catch (error) {
    return null;
  }
};

const postData = async (url, body) => {
  try {
    var response = await axios.post(`${ServerURL}/${url}`, body);

    var result = await response.data;

    return result;
  } catch (error) {
    return false;
  }
};

export {ServerURL, postData, getData};
