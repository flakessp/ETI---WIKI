if(Posts.find().count() === 0){
  Posts.insert({
    heading: "Awesome heading for post",
    text: " "
  });
}
