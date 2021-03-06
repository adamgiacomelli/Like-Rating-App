/**
 * Like.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	
    from: {
      type: 'string',
	  required: true
    },
	
    to: {
      type: 'string',
	  required: true
    },
	
	toUsername : {
      type: 'string',
	  required: true
	}
  },
  
  likeUser: function (inputs, cb) {
    Like.findOrCreate(inputs, inputs).exec(cb);
  },
  
  unlikeUser: function (inputs, cb) {
    Like.destroy(inputs).exec(cb);
  },
  
  countLikes: function (inputs, cb) {
	Like.count(inputs).exec(cb);
  },
  
  getMostLiked: function (cb) {
    Like.native(function(err, collection) {
	  if(err) return cb(err);
	  
	  collection.aggregate([
	    {
          $group: {
            _id : '$to',
		    username: {$first: '$toUsername'},
            count: { $sum: 1 }
          }
        },
        { 
		  $sort: { count : -1 } 
		}
	  ]).toArray(cb);
    });
  }
};

