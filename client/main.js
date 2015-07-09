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
  // NOTE: todo - return files only with data - postId : this._id
  // to read - http://habrahabr.ru/post/248875/
  'uploads': function(){
    return Uploads.find({"metadata":{"postId":this._id}});
  }
});

Template.postPage.events({
  'change .fileInput': function (event,template){

    var currentPostId = this._id;
    FS.Utility.eachFile(event,function(file){
      var fileObj = new FS.File(file);
      fileObj.metadata = {postId:currentPostId};
      console.log(currentPostId);
      Uploads.insert(fileObj,function(err){
        console.log(err);
      })
    })
  }
});
