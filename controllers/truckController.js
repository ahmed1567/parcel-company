const {con}=require('../models/databaseModel')
const bcrypt = require('bcrypt');


const add = (req, res)=>{
        return res.render('trucks/add_truck',{title:'Add truck',session:req.session.user})
}


const add_post= (req, res)=>{
    if(req.body.add=='ADD'){
      bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        bcrypt.hash(req.body.password, Salt, function (err, hash) {
            if (err) {
                throw err;
            }
            hashedPassword = hash;
            var sql = "INSERT INTO trucks (truck_id,name,weight,password) VALUES (?,?,?,?)";
            con.query(sql,[req.body.truck_id,req.body.name,req.body.weight,hashedPassword], function (err, result) {
            if (err) throw err;
            });
            return res.render('home',{title:'home' ,exp:"successful operation",session:req.session.user});
        })
    })

    }
}

const all_trucks = (req, res)=>{
        var sql = "SELECT a.truck_id , a.name,a.weight,count(b.parcel_id) as num FROM trucks as a INNER JOIN parcels as b ON a.truck_id = b.truck_id and b.status='0' GROUP BY a.truck_id;  ";
        con.query(sql, function (err, result, fields) {
        if (err){throw err;}
        return res.render('trucks/all_trucks',{title:'All Trucks',trucks:result,session:req.session.user})
        });
}

const view_truck=(req,res)=>{
    truck_id=req.query.id;
    parcel_id=req.query.parcel_id;
    console.log(truck_id);
    console.log(parcel_id);
    if (req.session.user){
        session=req.session.user
    }else{
        session=req.session.driver
    }
    console.log(session);
    if (truck_id && parcel_id) {
        var sql = "UPDATE parcels SET status = '1' WHERE truck_id = ? and parcel_id= ? ;  ";
        con.query(sql,[truck_id,parcel_id], function (err, result) {
          if (err){throw err;
          }
          var sql = "SELECT *from parcels where truck_id=? and status='0' ;  ";
          con.query(sql,[truck_id], function (err, result, fields) {
            if (err){throw err;
            }
            return res.render('trucks/view_truck',{title:'View',parcels:result,session:session})
          });
        });
    } else {
        var sql = "SELECT *from parcels where truck_id=? and status='0' ;  ";
        con.query(sql,[truck_id], function (err, result, fields) {
          if (err){throw err;
          }
          return res.render('trucks/view_truck',{title:'View',parcels:result,session:session})
        });
        
    }
}

const truck_driver=(req,res)=>{
    return res.render('trucks/truck_driver',{title:'driver'})

}

const driver_sign_in=(req,res)=>{
    if(req.body.sign_in=='sign_in'){ 
        var sql = "select * from trucks where truck_id=?";
        con.query(sql,[req.body.truck_id], function (err, result, fields) {
          if (err){throw err;
          }else if (result.length===0){
            return res.render('trucks/truck_driver',{title:'sign in',exp:'please ask admin to add your truck first'});
          }
        bcrypt.genSalt(10, function (err, Salt) {
                bcrypt.compare(req.body.password, result[0].password, 
                    async function (err, isMatch) {
                    // Comparing the original password to
                    // encrypted password   
                    if (isMatch) {
                          req.session.driver=req.body.truck_id;
                          return res.render('home',{title:'home',session:req.session.driver,user:"driver"})
                    }
                    if (!isMatch) {
                          return res.render('trucks/truck_driver',{title:'sign in',exp:'please enter the correct password'});
                    }
                });
            });
        });
    };
}
const sign_out = (req, res)=>{
    req.session.destroy();
    res.redirect('/');
}
module.exports={
add,
add_post,
all_trucks,
view_truck,
truck_driver,
driver_sign_in,
sign_out
}