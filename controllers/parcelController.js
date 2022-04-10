const {con}=require('../models/databaseModel')

const add = (req, res)=>{

    var sql = "select name from trucks  ";
     con.query(sql, function (err, result, fields) {
      if (err){throw err;}
        return res.render('parcels/add_parcel',{title:'Add Parcel',trucks:result,session:req.session.user})
    });
 
}

const add_post= (req, res)=>{
    if(req.body.add=='ADD'){
        var sql = "select truck_id from trucks where name=? ";
        con.query(sql, [req.body.truck],function (err, result, fields) {
          if (err){throw err;
          }
          var sql = "INSERT INTO parcels (truck_id,name,details,weight) VALUES (?,?,?,?)";
          con.query(sql,[result[0].truck_id,req.body.name,req.body.details,req.body.weight], function (err, result) {
          if (err) throw err;
          return res.render('home',{title:'home' ,exp:"successful operation ",session:req.session.user});
          });
          
        });
    }
}
const all_parcels= (req, res)=>{
      var sql = "SELECT * from parcels;  ";
      con.query(sql, function (err, result, fields) {
      if (err){throw err;}
      return res.render('parcels/all_parcel',{title:'All Parcels',parcels:result,session:req.session.user})
      });
}

module.exports={
add,
add_post,
all_parcels
}