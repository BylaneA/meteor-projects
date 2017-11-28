import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players} from './../imports/api/players';


//transfomer l'objet array en jsx array
const renderPlayers = (playersList) => {
  return playersList.map((player) => {
    return (
      <p key={player._id}>
        {player.name} has {player.score} point(s).
        <button onClick={() => {
          alert('deleted')
        }}>X</button>
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

Meteor.startup(() => {

  //allows you to run a function that depends on reactive data sources, in such a way that if there are changes to the data later, the function will be rerun
  Tracker.autorun(() => {
    let players = Players.find().fetch();
    let title = 'Score Keep';
    let name = 'Mike';
    let jsx = (
      <div>
        <h1>{title}</h1>
        <p>Hello {name}!</p>
        <p>This is my second p.</p>
        {renderPlayers(players)}
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player name"/>
          <button>Add Player</button>
        </form>
      </div>
    );
  ReactDOM.render(jsx, document.getElementById('app'));
  });


});