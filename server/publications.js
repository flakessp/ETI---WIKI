Meteor.publish("posts", function(){
  return Posts.find();
});
Meteor.publish("history", function(){
  return History.find();
});
Meteor.publish("uploads", function(){
  return Uploads.find();
});
