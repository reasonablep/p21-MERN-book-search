const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate('savedBooks');
                return user;
            }
            throw new AuthenticationError('Must be logged in to see saved books')
        },
    },

    Mutation: {
        login: async (_, { input }) => {
            const { email, password } = input;
            const user = await User.findOne({ email });

            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };

        },

        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (_, { input }, context) => {
                const { bookId, description, title } = input;
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { savedBooks: {bookId, description, title} } },
                    { new: true }
                ).populate('savedBooks');

                return updatedUser;

    },

    removeBook: async (_, { bookId }, context) => {
        if (context.user) {

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            ).populate('savedBooks');

            return updatedUser;

    }

    throw new AuthenticationError('Must be logged in to remove a book')

},

},

};

module.exports = resolvers;