const config = {
<<<<<<< HEAD
  api: "http://3.35.208.142",
  test_api: "http://54.180.79.156",
  token: {},
=======
  api: "http://54.180.79.156",
  token : {
    headers: { authorization: `Bearer ${localStorage.getItem('token')}`}
  }
  
>>>>>>> kyu0507
};

export { config };
