'use strict';


var mongoose = require('mongoose');

exports.query = function(req, res) {
    if (!req.user) {
        return res.status(401).send('Not Authorized');
    }

    if (req.params.model && req.body) {
        try {
            var model = mongoose.model(req.params.model);
        }
        catch (e) {
            return res.status(400).send(req.params.model + ' is not a model');
        }

        model.find(req.body, function(err, results) {
            if (!err) {
                return res.status(200).json(results);
            }
            else {
                return res.status(401).send(err);
            }
        });
    }
    else {
        return res.status(400).send(req.params.model + ' is not a model');
    }
};


// PUT:  Sauvegarder un nouveau fichier dans la BD//
exports.put = function (req, res) {
    
    console.log('PUT /binder model : '+req.params.model+' and body : '+JSON.stringify(req.body));
    
    if (!req.user) {
        return res.status(401).send('Not Authorized');
    }
    
    // try to parse for model name
    var modelName;
    if(!req.params || !req.params.model){
        var modelNameMatch = req.path.match(/\/binder\/(\w+)\/?/);
        if(Array.isArray(modelNameMatch) && modelNameMatch.length){
            modelName = modelNameMatch[1];
        }
    }
    
    if ((req.params.model || modelName) && req.body) {
        try {
            var model = mongoose.model(req.params.model || modelName);
        } catch (e) {
            return res.status(400).send(req.params.model || modelName + ' is not a model');
        }
    
        // initialize document
        var doc = new model();
    
        // write all fields from request body to new document
        for (var i in req.body) {
            doc[i] = req.body[i];
        }
    
        doc.user = req.user._id;
    
        var doc_upsert = doc.toObject();
    
        var doc_id;
        if (req.body._id) {
            doc_id = mongoose.Types.ObjectId(req.body._id);
        } else {
            doc_id = doc._id;
        }
    
        delete doc_upsert._id;
    
        model.update({
            _id: doc_id
        }, doc_upsert, {
            upsert: true
        }, function(err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(doc);
            }
    
        });
    }
};