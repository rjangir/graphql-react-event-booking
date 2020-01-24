const authResolvers = require('../resolvers/auth');
const eventResolvers = require('../resolvers/events');
const bookingResolvers = require('../resolvers/booking');


const rootResolver = {
...authResolvers,
...eventResolvers,
...bookingResolvers
};

module.exports = rootResolver;