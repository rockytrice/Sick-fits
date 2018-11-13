const Mutations = {
   async createItem(parent, args, ctx, info){
        // TODO check if they are logged in

        // here is where we begin to interface with the prisma database
        const item = await ctx.db.mutation.createItem({
            data: {
                // spread the args in with (... notation)
                ...args
            }
            
        }, info);
        console.log(item);
        return item;
    }
}
module.exports = Mutations;