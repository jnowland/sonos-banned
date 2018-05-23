const { DeviceDiscovery, Sonos } = require('sonos');
const banned = require('./banned.json');
const sonos = new Sonos('192.168.0.8');


// start listening
sonos.on('CurrentTrack', function( track ) {
  
  if( banned.artists.includes(track.artist) || banned.songs.includes(track.title) ){
    console.log('Skipped: %s by %s', track.title, track.artist);

    sonos.next().then(success => {
      console.log('Track skipped: %s by %s', track.title, track.artist);
    }).catch(err => {
      console.log('Error occurred %j', err)
    });

  } else {
    console.log('Track changed to %s by %s', track.title, track.artist);
  }

});

sonos.on('Volume', volume => {
  console.log('New Volume %d', volume)
})