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

Template.postPage.events({
  'change .fileInput': function (event,template){
    FS.Utility.eachFile(event,function(file){
      var fileObj = new FS.File(file);
      fileObj.post = this._id;
      console.log(fileObj);
      Uploads.insert(fileObj,function(err){
        console.log(err);
      })
    })
  }
});
