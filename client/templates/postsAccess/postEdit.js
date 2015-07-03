Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('.epicarea').val()
    }

    if (this.text === postProperties.text && this.title==postProperties.title)
      alert("no changes were made")
    else {
      Meteor.call('postUpdate',postProperties,currentPostId,function(error, result){
        if(error)
          return alert(error.reason);
        Router.go('postPage',{_id:currentPostId});
      });
    }

  },

  'click .delete': function(e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
