
const api = {
  getArticles(){
    let url = process.env.REACT_APP_API_URL;
    return fetch(url, {
      // mode: "no-cors",
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then((res) => res.json());
  },

}

export default api;