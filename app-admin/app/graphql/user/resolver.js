module.exports = {
    Query: {
        userList(root, { current, pageSize, filters }, ctx){
            return ctx.connector.user.getUsers(current, pageSize, filters);
        },
        getUserById(root, { id }, ctx){
            return ctx.connector.user.getUserById(id);
        }
    },
    Mutation: {
        addUser(root, { user }, ctx){
            return ctx.connector.user.addUser(user);
        },
        delUser(root, { ids }, ctx){
            return ctx.connector.user.delUser(ids);
        },
        updateUser(root, { id, user, filters }, ctx){
            return ctx.connector.user.updateUser(id, user, filters);
        }
    }
}