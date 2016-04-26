// print(global.__gpioWrite);
__pinmux(35, 8);
var status = 0;

__wifi({
  mode: 'station', // default is station
  auth: 'PSK_WPA2',
  ssid: 'mcs1',
  password: '12345678',
});

global.eventStatus.on('wifiConnect', function(){
});

function loop() {
  setTimeout(function() {
    __gpioWrite(35, status);
    if (status == 0) {
      status = 1;
    } else  {
      status = 0;
    }
    loop();
  }, 2000);
}

loop();