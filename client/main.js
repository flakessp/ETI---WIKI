Meteor.subscribe("posts");

Template.postList.helpers({
  'post': function() {
    return Posts.find();
  }
});
Template.postPage.helpers({
  'post': function() {
    return Posts.find();
  }
});
Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val()
    };
    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});
