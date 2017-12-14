import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players} from './../imports/api/players';
import App from './../imports/ui/App';

<<<<<<< HEAD
//getting initial data
//rendering app
=======

//transfomer l'objet array en jsx array
const renderPlayers = (playersList) => {
  return playersList.map((player) => {
    return (
      <p key={player._id}>
        {player.name} has {player.score} point(s).
        <button onClick={() => Players.update (player._id, {$inc: {score:1}})}>+1</button>
        <button onClick={() => Players.update (player._id, {$inc: {score:-1}})}>-1</button>
        <button onClick={() => Players.remove(player._id)}>X</button>
      </p>
    );
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  let playerName = e.target.playerName.value;

  if(playerName){
    e.target.playerName.value='';
    //players insert 
    Players.insert({
      name: playerName,
      score: 0
    });
  };
};

>>>>>>> 23e4c2a97d7291421139ddbe87f5006e5d39299b
Meteor.startup(() => {
  Tracker.autorun(() => {
    let players = Players.find().fetch();
    let title = 'Score Keep';
    ReactDOM.render(<App title= {title} players={players}/>, document.getElementById('app'));
  });
});
