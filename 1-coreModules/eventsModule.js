const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Create an event listener
eventEmitter.on('greet', () => {
  console.log('Hello, World!');
});

// Emit the event
eventEmitter.emit('greet');  // Output: Hello, World!
