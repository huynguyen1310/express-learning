module.exports.postCreateValidate = function name(req,res,next) {
    var errors = [];
    if(!req.body.name){
        errors.push('Name is require');
    }
    if(!req.body.phone){
        errors.push('Phone is require');
    }
    if(errors.length){
        res.render('users/create',{errors:errors});
        return;
    }
    next();
} 