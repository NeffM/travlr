/* GET homepage */
const index = (reg, res) => {
    res.render('index', {title: "travlr Getawayss"});
};

module.exports = {
    index
};