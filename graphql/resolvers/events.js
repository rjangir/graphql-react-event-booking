const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('../resolvers/merge')

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        }
        catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {

        if (!req.isAuth)
            throw new Error("Unauthenticated!");
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5e27e35bfe1f503c80890d85'
        });
        let createEvent;
        try {
            const res = await event.save();
            createEvent = transformEvent(res);

            const user = await User.findById('5e27e35bfe1f503c80890d85');
            if (!user) {
                throw new Error('User not found!');
            }
            user.createdEvents.push(event);
            await user.save();
            return createEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

