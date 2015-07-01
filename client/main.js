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
      if(result.postExists)
        alert('This post has already been posted');

      Router.go('postPage',{_id:result._id});
    });
  }
});
