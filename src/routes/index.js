const express = require('express');
const  router = express.Router()
const {addUsers,getUsers,getUser,updateUser,deleteUser,getProfile} = require('../controllers/user')
const {register,login} = require ('../controllers/auth')
const {auth} = require('../middleware/auth')
const {uploadfile} = require('../middleware/uploadfile')
const {addBook,getBooks,getBook,updateBook,deleteBook} = require('../controllers/book') 
const {pinjamBook,getPinjam} = require('../controllers/userbook')

router.post('/user',addUsers)
router.get('/user',auth,getUsers)
router.get('/user/:id',getUser)
router.patch('/user/:id',updateUser)
router.delete('/user/:id',deleteUser)

router.post('/book',uploadfile('image'),addBook)
router.get('/book',getBooks)
router.get('/book/:id',getBook)
router.patch('/book/:id',uploadfile('image'),updateBook)
router.delete('/book/:id',deleteBook)

router.post('/pinjam',auth,pinjamBook)
router.get('/pinjam',getPinjam)



router.post('/register',register)
router.post('/login',login)


module.exports = router;