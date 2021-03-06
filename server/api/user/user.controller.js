'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var request = require('request');
var fs = require('fs');
var Club = require('../club/club.model');
var Stage = require('../stage/stage.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

exports.addHOF = function (req, res, next) {

    console.log(req.params.postId);

    
    console.log('erro2r');
  
  req.user.hof.push(req.params.postId);

  req.user.save(function (err) {
      if (err) { return handleError(res, err); }
        console.log(req.user.hof);
       res.json(200, req.user.hof);

    });
};

//to change gallery pic
/*exports.galPicChange = function (req, res) {
  var userId = req.user._id;
  console.log(req.body.galleryPic);
  User.findById(userId, function (err,user){
    user.galleryPic=req.body.galleryPic;
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      console.log(user.galleryPic);
      return res.json(200, user);

    });
  });
};*/


exports.editProfile = function (req, res) {
  var userId = req.user._id;
  console.log(req.body.club,req.body.vedik);
  var c=req.body.club;
  var v=req.body.vedik;

  User.findById(userId, function (err,user){

    if(req.body.name){
      user.name=req.body.name; 
    }
    
    if(req.body.about){
    user.about=req.body.about;
    }
    if(req.body.galleryPic){
    user.galleryPic=req.body.galleryPic;
    }
    if(req.body.propic){
    user.proPic=req.body.proPic;
    }
    if(c){
      for(var i=0;i<c.length;i++){
        Club.findById(c[i]._id,function (err,club){
          club.subscribed_users.push({user:req.user._id});
          club.save(function (err){
               if (err) { return handleError(res, err); }
               console.log('club added +'+i);
          })
        })
      }
    }
    if(v){
      for(var i=0;i<v.length;i++){
        Stage.findById(v[i]._id,function (err,stage){
          stage.subscribed_users.push({user:req.user._id});
          stage.save(function (err){
               if (err) { return handleError(res, err); }
               console.log('stage added +'+i);
          })
        })
      }
    }
    user.step=req.body.step+1;
    
    user.save(function (err) {
      if (err) { return handleError(res, err); }
        console.log(user.step);
       res.json(200, user);

    });
  });
};
/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    var i =0,isFollowing;
    for(;i<user.subscribed_users.length;i++){
      if(user.subscribed_users[i].user.equals(req.user._id)){
        isFollowing = true;
      }
    }
    if(isFollowing!=true){
      isFollowing=false;
    }
    console.log({user:user,isFollowing:isFollowing});
   
    return res.json({user:user,isFollowing:isFollowing});
    
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/*propic upload code*/
exports.uploadProPic = function(req, res) {
  console.log(req.files.file.path);
  fs.readFile(req.files.file.path, function (err, data) {
  console.log(data);
  var newPath = 'client/assets/proPic/'+req.user._id ;
  console.log(newPath);
  fs.writeFile(newPath, data, function (err) {
    if (err) {return res.send(500, err)};
    // res.redirect("back");
  });
  req.user.proPic='assets/proPic/'+req.user._id ;
  req.user.step=2;
  req.user.save( function(err){
    if (err) {return res.send(500, err)};
    console.log('saved');
  })
});


  console.log('here');
  // var file = req.files.file;
  //   console.log(file);
  //   console.log(file.type);
  //   request(file).pipe(fs.createWriteStream('client/assets/images/hi_big.png'));
    
  };

exports.uploadGalPic = function(req, res) {
  console.log(req.files.file.path);
  fs.readFile(req.files.file.path, function (err, data) {
  console.log(data);
  var date = new Date();
  var fileName = date.getTime(); 
  var newPath = 'client/assets/galleryPic/'+fileName ;
  console.log(newPath);
  fs.writeFile(newPath, data, function (err) {
    // res.redirect("back");
  });
  req.user.galleryPic='assets/galleryPic/'+fileName ;
  req.user.step=5;
  req.user.save( function(err){
    if (err) {return res.send(500, err)};
    console.log('saved');
    return res.send(200, req.user.galleryPic);
  })
});
  

  console.log('here');
  // var file = req.files.file;
  //   console.log(file);
  //   console.log(file.type);
  //   request(file).pipe(fs.createWriteStream('client/assets/images/hi_big.png'));
    
  };
/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.showUser = function(req, res, next) {
  var userId = req.params.id;
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  var checkId=checkForHexRegExp.test(userId);

  console.log(checkId);
  if(!checkId)
   { return res.send(404); }
  /*User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });*/
  User.findById(userId,'-salt -hashedPassword',function (err,user){
      if(err) return handleError(res,err);
      console.log(user);
      

  })
  .populate('videos.video')
  .exec(function (err, user){
    if(err) {
      console.log(err);
      next(err);
    }
    if(!user)  { return res.send(404); }
    
      var i=0;
      var isFollowing;
      for(;i<user.subscribed_users.length;i++){
      if(user.subscribed_users[i].user.equals(req.user._id)){
        isFollowing = true;
      }
    }
    if(isFollowing!=true){
      isFollowing=false;
    }
    console.log({user:user,isFollowing:isFollowing});
   
    return res.json({user:user,isFollowing:isFollowing});

  
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  /*User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });*/
  User.findOne({_id:userId},'-salt -hashedPassword')
  .populate('asAdmin.user')
  .exec(function (err, user){
    if(err) {
      console.log(err);
      next(err);
    }
    else {
      res.json(user);

  }
  });
};

exports.addSubscriber = function (req,res){
  User.findById(req.params.id,function (err,user){
    if(err){
      return handleError(res,err);
    }
    if(!user) { return res.send(404); }
    user.subscribed_users.push({user:req.user._id});

    user.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else{
        console.log(user);
        return res.json({added:true});
      }
    });  
  });
};
exports.deleteSubscriber = function (req,res){
  User.findById(req.params.id,function (err,user){
    if(err){
      return handleError(res,err);
    }
    if(!user) { return res.send(404); }
    var i =0;
    for(;i<user.subscribed_users.length;i++){
      if(user.subscribed_users[i].user.equals(req.user._id)){
        user.subscribed_users[i].remove(function (err){
          if(err){ return handleError(res,err);}
          else{
            user.save(function (err){
              if(err){ return handleError(res, err);}
              else {
                return res.json({removed : true});
              }
            });
          }
        })
      }
    } 
  });
};


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.search = function (req, res, next) {
  var query = req.params.searchQuery;
  User.find(
    { "name": { "$regex": query, "$options": "i" } },'name',
    function(err,docs) {
      if(!err) {
        res.json(docs);
      }
      else {
        console.log(err);
        res.json([{name:'Error',href:"#"}]);
      } 
    } 
  );
}

function handleError(res, err) {
  return res.send(500, err);
}