const Aritcle = require('../model/Aritcle');

const getDashboard = (req,res)=>{
    const locals = {
        title: "Dashboard ::",
        header:"Dashboard"
      }
    res.render('home',{locals});
}

//article
//CREATE ARTICLE
const createAritcle = async (req, res) => {
  //  const aritcles = new Aritcle(req.body);
  const aritcles = new Aritcle({
    title: req.body.title,
    description: req.body.description,
  });
    try {
      await Aritcle.save();
      res.redirect('/article');
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
const getArticle = async (req,res)=>{
    const aritcles = await Aritcle.find();
    const locals = {
        title: "Article ::",
        header:"Article"
      }
    res.render('article',{locals,aritcles});
}

//END ARTICLE
//about
const getAbout = (req,res)=>{
    const locals = {
        title: "About ::",
        header:"About"
      }
    res.render('about',{locals});
}





const getweb = (req,res)=>{
    res.render('web');
}
const login = (req,res)=>{
    res.render('auth/login');
}
const register = (req,res)=>{
    res.render('auth/register');
}

module.exports = {getDashboard,getweb,login,register,createAritcle,getArticle,getAbout};


