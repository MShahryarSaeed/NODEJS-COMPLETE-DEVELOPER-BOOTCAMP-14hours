const mongoose=require("mongoose");

beforeAll(async()=>{
    await mongoose.connect('mongodb://localhost:27017/testing-Blog-API');
})

// afterEach(async()=>{
//     await mongoose.connection.db.dropDatabase({dbName:"testing-Blog-API"});
// })

afterAll(async()=>{
    await mongoose.connection.close();
})

/* 
it('returns 5',()=>{
    expect(2+3).toBe(5)
});

it('returns 8',()=>{
    expect(2*4).toBe(8)
})

it('returns true',()=>{
    const cb=()=>true;
    expect(cb()).toBe(true)
})
*/

// it('returns 5',()=>{
//     expect(2+3).toBe(5)
// });
