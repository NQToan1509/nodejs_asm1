const express=require('express')

const apiContronller=require('../controllers/apiContronller')

const authMiddleware= require('../auth/authMiddleware')

const router=express.Router()

router.get('/api/movies/trending',authMiddleware.tokenAuth,apiContronller.getTrendingPage)

router.get('/api/movies/top-rate',authMiddleware.tokenAuth,apiContronller.getTopRatePage)

router.get('/api/movies/discover',authMiddleware.tokenAuth,apiContronller.getDiscover)

router.post('/api/movies/video',authMiddleware.tokenAuth,apiContronller.getVideo)

router.post('/api/movies/search',authMiddleware.tokenAuth,apiContronller.getSearch)

router.use(apiContronller.get404)

module.exports=router