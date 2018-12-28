const Mutations = {
    // ctx.db.mutation.createItem returns a promise so if we want the items to go into the item value we have to make this an async method and await the creation of the item inside of there and then return the item.
    
   async createItem(parent, args, ctx, info){
        // TODO check if they are logged in

        // here is where we begin to interface with the prisma database

        
        const item = await ctx.db.mutation.createItem({
            data: {
                // spread the args in with (... notation)
                ...args
            }
            // passing the info var as a second argument will make sure the actual item will be returned to us from the db when we've created it.
        }, info);
        console.log(item);
        return item;
    }
}
module.exports = Mutations;