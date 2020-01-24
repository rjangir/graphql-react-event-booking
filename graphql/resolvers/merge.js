const Event = require('../../models/event');
const User = require('../../models/user');
const {dateToString} = require('../../helpers/date')


const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return transformEvent(event);
        });
    }
    catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user.createdEvents)
        };
    }
    catch (err) {
        throw err;
    }
}

const event = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    }
    catch (err) {
        throw err;
    }
}
const transformEvent = event => {
    return {
        ...event._doc,
        date: dateToString(event.date),
        creator: user.bind(this, event.creator)
    }
};
const transformBooking = booking => {
    return {
        ...booking._doc,
        event: event.bind(this, booking.event),
        user: user.bind(this, booking.user),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt),
    };
};

exports.transformEvent = transformEvent;
//exports.events = events;
exports.transformBooking = transformBooking;