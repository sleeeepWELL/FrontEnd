const config = {
  test_api: "http://54.180.79.156",
  api: "http://54.180.79.156",
  token : {
    headers: { authorization: `Bearer ${localStorage.getItem('token')}`}
  }
  
};

export { config };
