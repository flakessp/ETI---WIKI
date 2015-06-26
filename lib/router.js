Router.route('/', function () {
  this.render('Home', {
    data: function () { return Items.findOne({_id: this.params._id}); }
  });
});

Router.route('/posts/:_id',{
  name: 'postPage',
  data: function (){
    return Items.findOne({_id: this.params._id}); }
});
