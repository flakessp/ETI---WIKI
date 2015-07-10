Router.configure({
  layoutTemplate:"layout"
});
Router.route('/', {
  name:'postList'
});

Router.route('/posts/:_id',{
  name: 'postPage',
  data: function (){
    return Posts.findOne({_id: this.params._id}); }
});

Router.route('/submit', {name: 'postSubmit'});

Router.route(':_id/history', {
  name: 'historyList',
  data: function(){
    return {
       history: History.find({postId: this.params._id})
      };
    }
  });
  Router.route("/profile",{
      name:"profile",
      data:function (){
        var username=Router.current().params.username;
        return Meteor.users.findOne({
            username:username
        });

      }
  });

Router.route('/history/:_id', {
  name: 'postInHistory',
  data: function(){
    return History.findOne({_id: this.params._id});}
  });

Router.route('posts/:_id/edit',{
  name:'postEdit',
  data: function (){
    return Posts.findOne({_id: this.params._id}); }
});
var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
