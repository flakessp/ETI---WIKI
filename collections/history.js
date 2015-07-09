History = new Mongo.Collection("history");
History.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
Meteor.methods({
  historyInsert: function(postAttributes) {
    check(Meteor.userId(), String);

    check(postAttributes, {
      title: String,
      text: String,
      comment: String,
      postId: String
    });

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.profile.name,
      submitted: new Date()
    });
    History.insert(post);
  }
});
