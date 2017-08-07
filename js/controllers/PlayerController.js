var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var PlayerController = function()
{

  this.onPlayerReady;
  this.onPlayerStateChange;
  this.onPlayerError;
  this.isPlayerReady = false;

  return this;
}

PlayerController.prototype.loadPlayer = function ()
{
  var that = this;

  this.player = new YT.Player('player', {

    height: '390',
    width: '640',
    videoId: '9W44NWYwa1g',
    playerVars: {'playsinline':'1'},
    events: {
      'onReady': function()
      {
        that.isPlayerReady = true;
        that.onPlayerReady();
      },
      'onStateChange': this.onPlayerStateChange,
      'onError': this.onPlayerError
    }
  });
};
