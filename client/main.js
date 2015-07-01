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

    Meteor.call("postInsert", post, function(error, result){
      if(error)
        return alert(error.reason);
      Router.go('postPage',{_id:result._id});
    });
  }
});
