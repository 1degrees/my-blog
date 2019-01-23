var mongoose = require('mongoose');
// var jquery = require('./node_modules/jquery');
// const Koa = require('koa');
// const serve = require('koa-static');
mongoose.connect('mongodb://209.97.175.96:27017/mongodb', {
    user: 'zx1',
    pass: 'zx1'
}).then(
    async (e) => { 
        console.log('success');
        const Schema = mongoose.Schema;
        const articleSchema = new Schema({
            title: String,
            author: String,
            tag: String,
        }, { collection: 'article' });
        const article = mongoose.model('article', articleSchema);
        var mo = await article.find();
        console.log(mo)
    },
    err => { 
        console.log('error');
     }
  );

