// module.exports = (req,res,next)=>{
//     if(!req.session.isLoggedId){
//         return res.redirect("/login")
//     }
//     next()
// }

function checkisNotAthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashbord");
  }
  return next();
}

function checkisAthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

module.exports = { checkisNotAthenticated, checkisAthenticated };
