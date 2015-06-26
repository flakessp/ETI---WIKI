Router.configure({
  layoutTemplate:"layout"
});
Router.route('/', function () {
  this.render('postList', {
    data: function () { return Posts.findOne({_id: this.params._id}); }
  });
});

Router.route('/posts/:_id',{
  name: 'postPage',
  data: function (){
    return Posts.findOne({_id: this.params._id}); }
});
