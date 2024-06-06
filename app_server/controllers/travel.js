const tripsEndPoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept' : 'application/json'
    } 
}

const travel = async function(req, res, next){
    await fetch(tripsEndPoint, options)
    .then(res => res.json())
    .then(json => {
        //console.log(json);
        let message = null;
        if(!(json instanceof Array)){
            message = 'API lookup error';
            json =[];
        }
        else{
            if(!json.length){
                message = 'Ni trips exist in our database!';
            }
        }
        res.render('travel', {title: 'Travlr Getaways', trips: json});
    })
    .catch(err => res.status(500).send(e.message));
    //console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
    travel
};

// //const fs = require('fs');
// //const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8')); 

// /* GET travel view */
// const travel = (req, res) => {
//    // pageTitle = process.env.npm_package_description + ' - Travel';
//     res.render('travel', {title: 'Travlr Getaways', trips});
// };

// module.exports = {
//     travel
// };