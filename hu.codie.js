(function(ext) {
  var baseUrl = "http://localhost:8080";
  ext._shutdown = function() {};

  ext._getStatus = function() {
    return {
      status: 2,
      msg: "Ready"
    };
  };

  function sendCodieRequest(path, request, cb) {
    $.ajax({
      url: baseUrl + path,
      method: "GET",
      dataType: "jsonp",
      data: request,
      success: function(response) {
        console.log("Codie response", response);
        cb(response);
      }
    });
  }

  ext.echo = function(cb) {
    sendCodieRequest("/commands/echo", {dummy: 0}, cb);
  };

  ext.speed = function(leftSpeed, rightSpeed, cb) {
    sendCodieRequest("/commands/speed", {
      leftSpeed: leftSpeed,
      rightSpeed: rightSpeed
    }, cb);
  };

  ext.move = function(distance, speed, cb) {
    sendCodieRequest("/commands/move", {
      distance: distance,
      speed: speed
    }, cb);
  };

  ext.turn = function(direction, angle, speed, cb) {
    sendCodieRequest("/commands/turn", {
      angle: angle,
      speed: direction === "right" ? speed * -1 : speed
    }, cb);
  };

  ext.beep = function(duration, cb) {
    sendCodieRequest("/commands/beep", {
      duration: duration
    }, cb);
  };

  ext.setColor = function(hue, saturation, value, cb) {
    sendCodieRequest("/commands/setColor", {
      hue: hue,
      saturation: saturation,
      value: value
    }, cb);
  };

  ext.getDistance = function(cb) {
    sendCodieRequest("/queries/distance", {}, cb);
  };

  ext.getBattery = function(cb) {
    sendCodieRequest("/queries/battery", {}, cb);
  };

  ext.getSound = function(cb) {
    sendCodieRequest("/queries/sound", {}, cb);
  };

  ext.getLight = function(cb) {
    sendCodieRequest("/queries/light", {}, cb);
  };

  ext.getLine = function(cb) {
    sendCodieRequest("/queries/line", {}, cb);
  };

// Block and block menu descriptions
  var descriptor = {
    blocks: [
      // commands
      ["w", "Ping", "echo"],  
      ["w", "Mozogj %n mm-t, %n százalék sebességgel", "move", 100, 50],
      ["w", "Enable both motors. Left %n Right %n", "speed", 50, 50],
      ["w", "Fordulj %m.turnDirection %n fokot %n százalék sebességgel", "turn", "left", 90, 50],
      ["w", "Sípolj %n miliszekundumig", "beep", 100],
      ["w", "Szín: H %n S %n V %n", "setColor", 50, 100, 100],

      // queries
      ["R", "Távolság", "getDistance"],
      ["R", "Töltés", "getBattery"],
      ["R", "Zaj", "getSound"],
      ["R", "Fény", "getLight"],
      ["R", "Vonal", "getLine"],
    ],
    menus: {
      turnDirection: ["balra", "jobbra"]
    }
  };

  // Register the extension
  ScratchExtensions.register("Codie extension", descriptor, ext);
})({});
