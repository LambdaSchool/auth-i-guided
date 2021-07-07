const router = require("express").Router();

const Users = require("./users-model.js");

const restricted = (req,res,next)=>{
  if(req.session && req.session.user){
    next()
  }else{
    res.status(401).json("Unauthorized")
  }
}

router.get("/",restricted, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    customMessage: 'Something went wrong inside the users router'
  });
});

module.exports = router;
