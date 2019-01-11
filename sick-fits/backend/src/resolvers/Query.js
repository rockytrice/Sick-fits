// if the query is exactly the same both on  your prsima and your query, you can forward that query from yoga to prisma and it will handle all of the code below in the comment.
const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db")
  // async items(parent, args, ctx, info) {
  //   console.log('Getting Items!!');
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
