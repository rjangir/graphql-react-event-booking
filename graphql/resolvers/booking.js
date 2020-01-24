
const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformEvent, transformBooking } = require('../resolvers/merge')

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        }
        catch (err) {
            throw err;
        }
    },
    bookEvent: async args => {
        //const event = await event.bind(this, args.eventId);
        const fetchedEvent = await Event.findById(args.eventId);
        if (!fetchedEvent) throw new Error("Event not found");
        const booking = new Booking({
            user: '5e27e35bfe1f503c80890d85',
            event: fetchedEvent.id
        });
        let bookedEvent;
        try {
            const res = await booking.save();
            bookedEvent = transformBooking(res);
            // const user = await User.findById('5e27e35bfe1f503c80890d85');
            // if (!user) {
            //     throw new Error('User not found!');
            // }
            // await user.save();
            return bookedEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;

        } catch (error) {
            throw error;
        }
    }
}