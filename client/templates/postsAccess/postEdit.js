Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    var currentPostId = this._id;
    var text = $(e.target).find('.epicarea').val();
    var diff = htmldiff(this.text, text);
    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      text: text
    }
    var historyProperties = {
      title: $(e.target).find('[name=title]').val(),
      text: text,
      comment: $(e.target).find('[name=comment]').val(),
      postId: currentPostId,
      diff: diff
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
      Router.go('postList');
    }
  }
});
