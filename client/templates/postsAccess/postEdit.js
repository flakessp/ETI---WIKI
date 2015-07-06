Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('.epicarea').val()
    }
    var historyProperties = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('.epicarea').val(),
      comment: $(e.target).find('[name=comment]').val()
    }

    // checking if no changes were made
    if (this.text === postProperties.text && this.title==postProperties.title)
      alert("no changes were made");
    else if(historyProperties.comment === "")
      alert("PLease leave the comment!");
    else {
      Meteor.call('postUpdate',postProperties,currentPostId,function(error, result){
        if(error)
          return alert(error.reason);
        Meteor.call('historyInsert',historyProperties);
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
