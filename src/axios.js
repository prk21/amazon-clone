import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/challenge-a9cf5/us-central1/api", // the api (cloud function) URL
  //update with url from firebase->functions // us central, region..
});

export default instance;
