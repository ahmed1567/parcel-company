
const home = (req, res)=>{
        if (req.session.driver){
                return res.render('home',{title:'home',session:req.session.driver,user:"driver"})
        }else if(req.session.user){
                return res.render('home',{title:'home',session:req.session.user})
        }
        return res.render('home',{title:'home'})      
}

const admin = (req, res)=>{
        return res.render('admin',{ admin:"admin"})
}

const admin_post=(req,res)=>{
        email="admin@gmail.com"
        password="qwert"
        if (req.body.email===email&&req.body.password===password){
                req.session.user="admin";
                return res.render('home',{title:'home',session:req.session.user})
        }else{
             return res.render('admin',{title:'admin',exp:"uncorrect email or password"})
        }
        
}

module.exports={
    home,
    admin,
    admin_post
}