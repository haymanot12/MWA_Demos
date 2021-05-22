var express =require("express");
var router = express.Router();
var controllerGames = require("../controllers/games.controllers.js");
var rev= require("../controllers/reviewsController.js");
var publisher =require("../controllers/publisherController.js")


router.route("/games").get(controllerGames.gamesGateAll).post(controllerGames.gamesAddOne);
router.route("/games/:gameId").get(controllerGames.gamesGetOne).put(controllerGames.gamesUpdateOne).delete(controllerGames.gamesDeleteOne);



router.route("/games/:gameId/reviews").get(rev.reviewGetAll).post(rev.createReviews);
router.route("/games/:gameId/reviews:reviewId").get(rev.reviewGetOne).put(rev.updatereview).delete(rev.deleteReviews);

router.route("/games/:gameId/publisher").get(publisher.getpublisher).post(publisher.createPublisher);
router.route("/games/:gameId/publisher:publisherId").get(publisher.getOnepublisher).put(publisher.updatePublisher).delete(publisher.deletePublisher);



module.exports = router;