const withAuth = (req, res, next) => {
    // if no session, then redirect user to login page
    if (!req.session.user_id) {
        res.redirect('/login')
    }
    else {
        // go to next middleware/function
        next();
    }
};

module.exports = withAuth;