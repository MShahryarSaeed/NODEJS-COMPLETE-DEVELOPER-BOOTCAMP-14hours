// Promises provide an alternative approach to working with asynchronous code, offering better readability and error handling compared to callbacks. A Promise represents the eventual completion or failure of an asynchronous operation.
//  Promise is a class

function fetchData(url) {

    return new Promise((resolve, reject) => {
      // Simulating asynchronous operation
      setTimeout(() => {
        const data = "Async operation successful!";
        resolve(data);
        //same as in callback like callback(data)
      }, 1000);

    });

  }
   
  // Using the promise
  fetchData('www.example.com')
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });