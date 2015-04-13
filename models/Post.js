var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, default: '' },
    author: { type: String, default: '' },
    body: String,
    published: Boolean,
    date: { type: Date, default: Date.now },
    meta: {
        uvotes: { type: Number, default: 0 },
        dvotes: { type: Number, default: 0 },
        favs: { type: Number, default: 0 }
    }
});

// methods
PostSchema.method({
    findAll : function(cb) {
        return this.model('Post').find({}, cb);
    }  
});

// statics
PostSchema.static({

});


// register
mongoose.model('Post', PostSchema, 'posts');