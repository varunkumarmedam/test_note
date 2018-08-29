var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var server = require('http').createServer(app);
var fs = require('fs');
var uri = "mongodb://localhost";
var i=0;

mongoClient.connect(uri, function(err,db){
	var dbo = db.db('vbase');
	var query = {
		title : "V_Test", //Title goes here
		notes : "..Again.." //Notes are written here
	}

	dbo.collection('note').find({}).toArray(function(err, db_notes){
		while(i < db_notes.length){
			if(db_notes[i].title == query.title){	
				console.log("Same book found at index and we append the data :)"+(i+1));
				var q_title = {title:query.title};
				var new_q = {$set :{notes : db_notes[i].notes+query.notes}};
				dbo.collection('note').updateOne(q_title,new_q,function(err, data){
					console.log("Data is Updated");
				})
				break;
			}
			i++;
		}
			if(i==db_notes.length){
			dbo.collection('note').insertOne(query, function(err, data){
				console.log("Your notes is stored :) ");
				fs.writeFile("text.txt", query.notes, function(err, data2){
				console.log("notes data stored in text file");
	 			})
			})
			}
	
	})


	
})
