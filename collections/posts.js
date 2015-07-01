Posts = new Meteor.Collection('posts');

// NOTE: adding post to DB (this is happening on server)
Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      text: String
    });

    // NOTE: checking for uniqiuness of heading (the same post)
    var postWithSameLink = Posts.findOne({title:postAttributes.title});
    if(postWithSameLink){
      return{
        postExists: true,
        _id:postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
