const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mutations = {
  // ctx.db.mutation.createItem returns a promise so if we want the items to go into the item value we have to make this an async method and await the creation of the item inside of there and then return the item.

  async createItem(parent, args, ctx, info) {
    // TODO check if they are logged in

    // here is where we begin to interface with the prisma database

    const item = await ctx.db.mutation.createItem({
        data: {
          // spread the args in with (... notation)
          ...args
        }
        // passing the info var as a second argument will make sure the actual item will be returned to us from the db when we've created it.
      },
      info
    );
    console.log(item);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args
    };
    // remove the ID from the updates ❌
    delete updates.id;
    // run the update method🏃🏾‍♂️
    // context is the context in the request.db is how we expose the actual prisma database to ourself. On top of that is a query or mutation and then we have access to all of the mutations that are in the generate prsima.gql file.
    // since we are returning this promise based function it will wait for that update to pass
    return ctx.db.mutation.updateItem({
        data: updates,
        where: {
          id: args.id
        }
      },
      // 2nd arg and how the update item function above knows what to return
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = {
      id: args.id
    };
    // find item
    const item = await ctx.db.query.item({
      where
    }, `{id title}`);
    // check if they own that item, or have the permissions
    // TODO
    // delete it❌
    return ctx.db.mutation.deleteItem({
      where
    }, info);
  },
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // has their password
    const password = await bcrypt.hash(args.password, 10);
    // create user in db
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: {
          set: ['USER']
        },
      }
    }, info);
    // Create the JWT token for user
    const token = jwt.sign({
      userId: user.id
    }, process.env.APP_SECRET);
    // now set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      // one year cookie
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    // return user to the browser
    return user;
  }
};
module.exports = Mutations;