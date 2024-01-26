const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getUser: async (_, {id, username}) => {
            const query = id ? { _id: id } : { username };
            return await User.findOne(query);
        },
    },

    Mutation: {
        createUser: async (_, { input }) => {
            const user = await User.create(input);
                const token = signToken(user);
                return { token, user };
        }, 

        login: async (_, { input }) => {
            const { userNameOrEmail, password } = input;
            const user = await User.findOne ({
                $or: [{ username: userNameOrEmail }, { email: userNameOrEmail}],
            });

            if (!user || !(await user.isCorrectPassword(password))) {
                throw new Error('Invalid credentials entered');
            } 

            const token = signToken(user);
            return { token, user };

        },

        

    },
}