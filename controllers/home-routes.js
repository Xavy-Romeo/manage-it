const router = require('express').Router();

// get all posts for homepage
router.get('/', (req, res) => {
    res.render('./layouts/main');
});

module.exports = router;