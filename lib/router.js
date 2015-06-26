Router.configure({
  layoutTemplate:"layout"
});
Router.route('/', {name:'postList'});

Router.route('/posts/:_id',{
  name: 'postPage',
  data: function (){
    return Posts.findOne({_id: this.params._id}); }
});

Router.route('/submit', {name: 'postSubmit'});
