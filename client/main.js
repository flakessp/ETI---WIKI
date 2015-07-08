Meteor.subscribe("posts");
Meteor.subscribe("history");
Meteor.subscribe("uploads");
Template.postList.helpers({
  'post': function() {
    return Posts.find({}, {sort:{submitted: -1}});
  }
});
Template.postPage.helpers({
  'post': function() {
    return Posts.find();
  },
  'uploads': function(){
    return Uploads.find();
  }
});
