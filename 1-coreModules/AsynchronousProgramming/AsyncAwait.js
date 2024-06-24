// Async functions and the await keyword provide a syntactic sugar for working with Promises, making asynchronous code appear more synchronous and easier to understand.

// Asynchronous programming is a programming paradigm used in software development to handle tasks that may take some time to complete, without blocking the execution of other tasks. In essence, it allows a program to perform multiple operations concurrently, rather than sequentially.

function FetchData(url){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            const data="Hello World";
            resolve(data)

        },1000);

    })
  }

//   try catch bloack is used to handle errors in async await syntax

async function fetchData() {

    try {

      const data = await FetchData("www.example.com");
      console.log(data);

    } catch (error) {

      console.error(error);
      
    }

  }

fetchData();
