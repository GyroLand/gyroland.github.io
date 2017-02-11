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

  ext.move = function(distance, speed, cb) {
    sendCodieRequest("/commands/move", {
      distance: distance,
      speed: speed
    }, cb);
  };

  ext.enableMotorBoth = function(leftSpeed, rightSpeed, cb) {
    sendCodieRequest("/commands/enableMotorBoth", {
      leftSpeed: leftSpeed,
      rightSpeed: rightSpeed
    }, cb);
  };

  ext.enableMotorLeft = function(speed, cb) {
    sendCodieRequest("/commands/enableMotorLeft", {
      speed: speed
    }, cb);
  };

  ext.enableMotorRight = function(speed, cb) {
    sendCodieRequest("/commands/enableMotorRight", {
      speed: speed
    }, cb);
  };

  ext.turn = function(direction, angle, speed, cb) {
    sendCodieRequest("/commands/turn", {
      angle: angle,
      speed: direction === "right" ? speed * -1 : speed
    }, cb);
  };

  ext.beep = function(volume, frequency, duration, cb) {
    sendCodieRequest("/commands/beep", {
      volume: volume,
      frequency: frequency,
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

  ext.setAnimation = function(animation, hue, saturation, repeat, speed, cb) {
    sendCodieRequest("/commands/setAnimation", {
      animation: animation === "round" ? 0 : 1,
      hue: hue,
      saturation: saturation,
      repeat: repeat,
      speed: speed
    }, cb);
  };

  ext.getDistance = function(cb) {
    sendCodieRequest("/queries/distance", {}, cb);
  };

  ext.getBatery = function(cb) {
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
      ["w", "Move %n mm with %n speed", "move", 100, 50],
      ["w", "Enable both motors. Left %n Right %n", "enableMotorBoth", 50, 50],
      ["w", "Set left motor speed to %n", "enableMotorLeft", 50],
      ["w", "Set right motor speed to %n", "enableMotorRight", 50],
      ["w", "Turn %m.turnDirection %n degrees with %n speed", "turn", "left", 90, 50],
      ["w", "Beep on %n volume, %n frequency and %n duration", "beep", 50, 440, 100],
      ["w", "Set color to H %n S %n V %n", "setColor", 50, 100, 100],
      ["w", "Start animation %m.animation with H %n S n%, repeat %n times and % speed", "setAnimation", "round", 50, 50, 5, 50],

      // queries
      ["R", "Distance", "getDistance"],
      ["R", "Battery", "getBattery"],
      ["R", "Sound", "getSound"],
      ["R", "Light", "getLight"],
      ["R", "Line", "getLine"],
    ],
    menus: {
      turnDirection: ["left", "right"],
      animation: ["round", "flash"]
    }
  };

  // Register the extension
  ScratchExtensions.register("Codie extension", descriptor, ext);
})({});
