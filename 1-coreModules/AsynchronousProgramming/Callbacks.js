//Def : Callbacks are functions passed as arguments to other functions, to be executed (called) later once an asynchronous operation completes. An asynchronous operation is an operation that takes some time to complete. When it's complete, the callback function is invoked.



// Calls the provided callback function after a delay of 1 second
function fetchData(url, callback) {
  setTimeout(() => {
    const dataToSendToCallback = "Hello, I will pass this data to the callback function after one second.";
    callback(dataToSendToCallback); // Calls the callback function after one second and provides the data to it
  }, 1000);
}

// Invokes fetchData with a Argument-1 (URL) and a Argument-2(callback) function
// The callback function is defined as an arrow function, which accepts data as an argument
// It will be called with the fetched data when the asynchronous operation completes
fetchData("fake.url.com", (dataReceivedByCallback) => console.log("Data:", dataReceivedByCallback)); // The second argument should be a function that accepts data as an argument, hence the arrow function is used

