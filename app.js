const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var posts = [];
const app = express();


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  let value = homeStartingContent;
  res.render("home.ejs", {startingContent: value,thePost: posts });
});


app.get("/contact", function(req,res){
  let value = contactContent;
  res.render("contact.ejs", {contact: value});
});

app.get("/about", function(req,res){
  let value = aboutContent;
  res.render("about.ejs", {about: value});
});

app.get("/compose", function(req,res){
  res.render("compose.ejs");
});

app.post("/compose", function(req,res){

  class post{
    constructor(title,content){
      this.title = title;
      this.content = content;
    }
  }
  // var post = {
  // title: req.body.postTitle,
  // content: req.body.postBody
  // }
  var newPost = new post(req.body.postTitle,req.body.postBody);
  posts.push(newPost);
  res.redirect("/");
});

// app.get("/posts/:topic", function(req,res)
// {
//   posts.forEach(function(post)
//   {
//     if(_.lowerCase(req.params.topics) === _.lowerCase(post.title))
//       {
//         res.render("post.ejs", {thePost: post});
//       }
//
//   });

  // for(let i= 0; i,posts.length; i++){
  //   if(_.lowerCase(req.params.topics) === _.lowerCase(posts.title)){
  //     res.render("post.ejs", {thePost: posts[i]});
  //   }
  // }


//   app.get("/posts/:topic", function(req,res)
//   {
//     const requestedTitle = _.lowerCase(req.params.topics);
//     posts.forEach(function(post)
//     {
//       const storedTitle = _.lowerCase(post.title);
//       if(requestedTitle === storedTitle)
//         {
//           console.log(post);
//           res.render("post.ejs", {title: post.title, content: post.content});
//         }
//     });
// });

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

// function toggleText()
// {
//  var points =document.getElementById("points");
//  var showMoreText =$("moreText");
//  var buttonText =$("textButton");
//
//  if (points.style.display === "none")
//  {
//  showMoreText.style.display = "none";
//  points.style.display = "inline";
//   }
//  else {
//  showMoreText.style.display = "inline";
//  points.style.display = "none";
//    }
// }

// <p><%=post.content.substring(0, 100) + "..." %><a href="/posts/" + "<%=post.title%>">Read More</a></p>







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
