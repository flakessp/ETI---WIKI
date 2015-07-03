Posts = new Meteor.Collection('posts');

Posts.allow({
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
Posts.deny({
  update: function(userId, post, fieldNames) {
    // разрешаем редактировать только следующие два поля:
    return (_.without(fieldNames, 'title', 'text').length > 0);
  }
});

// NOTE: adding meteor metod to add post to DB (this is happening on server)
Meteor.methods({
  postUpdate:function(postProperties,currentPostId){
    check(Meteor.userId(), String);
    check(postProperties, {
      title: String,
      text: String
    });
    check(currentPostId, String);

    console.log(currentPostId, postProperties);
    var postId = Posts.update(currentPostId, {$set: postProperties});

    return {
      _id: postId
    };
  }
});
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
      author: user.profile.name,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
