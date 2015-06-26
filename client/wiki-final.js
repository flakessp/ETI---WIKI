if (Meteor.isClient) {
  Template.postList.helpers({
    'post': function(){
      return Posts.find();
    }
  });
  Template.postPage.helpers({
    'post': function(){
      return Posts.find();
    }
  });

}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
