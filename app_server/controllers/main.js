/* GET homepage */
const index = (req, res) => {
    res.render('index', {title: "travlr Getawayss"});
};

module.exports = {
    index
};