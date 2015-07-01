Meteor.subscribe("posts");

Template.postList.helpers({
  'post': function() {
    return Posts.find({}, {sort:{submitted: -1}});
  }
});
Template.postPage.helpers({
  'post': function() {
    return Posts.find();
  }
});
