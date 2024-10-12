const Aritcle = require('../model/Aritcle');
const User = require('../model/User');
const express = require('express');
const { get } = require('http');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { title } = require('process');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const { getDashboard,createAritcle,getArticle,getAbout } = require('../controller/dashboardController');
//const { register } = require('module');
const jwtSecret = process.env.JWT_SECRET; 

router.use(express.static(path.join(__dirname, '../', 'public')));

router.get('/',(req,res)=>{
res.render('auth/login');
});

router.get('/register',(req,res)=>{
  res.render('auth/register');
  });

  const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
      //return res.status(401).json( { message: 'Unauthorized'} );
      return res.sendFile(path.join(__dirname,'../', 'public', '404.html'));
      // res.redirect('/');
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }
  

//DASHBOARD
router.get('/dashboard',authMiddleware, async (req,res)=>{
    const locals = {
        title: "Dashboard ::",
        header:"Dashboard"
      }
    res.render('home',{locals});
});
          
//Api
router.get('/api/articles',async(req,res)=>{

  Aritcle.find().then(function(lists){
   res.status(200).json(lists);

    })
})


//ARTICLE     
//GET ARTICLE   
router.get('/article',authMiddleware,async (req,res)=>{
    try {
    const locals = {
        title: "Article ::",
        header:"Article"
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const aritcleData = await Aritcle.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Aritcle.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    //const aritcleData = await Aritcle.find();
    res.render('article',{
        locals,
        aritcleData,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
    });
   } catch (error) {
    console.log(error);
    
   }
});


// //IMAGE INFORMATION
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });
// router.post('/add-article', upload.single('image'));

/**
 * POST ARTICLE /
 * Create New Post
*/
router.post('/add-article', async (req, res) => {
    try {
      try {
        const newArticle = new Aritcle({
            title: req.body.title,
            description: req.body.description,
            // thumbnail: req.file.path // Save the file path
        });
  
        await Aritcle.create(newArticle);
        res.redirect('/article');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
  });


// /**
//  * EDIT ARTICLE 
// */
router.get('/edit-article/:id', async (req, res) => {
    try {
      const data = await Aritcle.findOne({ _id: req.params.id });
  
      res.render('/article', {
        data,
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });

  /**
 * DELETE /
 * Delete Post
*/
router.delete('/delete-article/:id', authMiddleware, async (req, res) => {

  try {
    await Aritcle.deleteOne( { _id: req.params.id } );
    res.redirect('/article');
  } catch (error) {
    console.log(error);
  }

});
  /**
 * POST /
 * Admin - Check Login
*/
router.post('/admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne( { email } );

    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
});

/**
* POST /
* Admin - Register 
*/
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ email, password:hashedPassword });
      res.status(201).json({ message: 'User Created', user });
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'User already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
    }

  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});

module.exports = router;