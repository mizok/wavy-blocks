(function () {


  var nodes = 3;
  var waves = [];
  var waveHeight = 200;
  var colours = ["orange"];
  var frameCount = 0;

  // Initiator function
  function init() {
    let targets = document.querySelectorAll(".canvas");
    targets.forEach((o, i) => {
      each(o);
    })
  }

  function each(ele) {
    let cvs = ele
    let ctx = cvs.getContext("2d");
    resizeCanvas(cvs);

    for (var i = 0; i < 1; i++) {
      waves.push(new wave(cvs, colours[i], 0.75, nodes));
    }

    update(ctx, cvs);
  }

  function update(ctx, cvs) {
    let fill = "transparent"
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    for (var i = 0; i < waves.length; i++) {
      for (var j = 0; j < waves[i].nodes.length; j++) {
        bounce(cvs, waves[i].nodes[j]);
      }
      drawWave(ctx, cvs, waves[i]);
    }
    ctx.fillStyle = fill;
    frameCount += 1;
    let context = ctx;
    let canvas = cvs;
    requestAnimationFrame(() => {
      update(ctx, cvs)
    });
  }

  function wave(cvs, colour, lambda, nodes) {

    this.colour = colour;
    this.lambda = lambda; //波長
    this.nodes = [];

    for (var i = 0; i <= nodes + 2; i++) {
      var temp = [(i - 1) * cvs.width / nodes, 0, Math.random() * 200, 0.4];
      this.nodes.push(temp);
    }
  }

  function bounce(cvs, nodeArr) {
    nodeArr[0] = nodeArr[0];
    nodeArr[1] = waveHeight / 2 * Math.sin(nodeArr[2] / 20) + cvs.height / 2;
    nodeArr[2] = nodeArr[2] + nodeArr[3];

  }

  function drawWave(ctx, cvs, obj) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    var diff = function (a, b) {
      return (b - a) / 2 + a;
    }

    ctx.fillStyle = obj.colour;
    ctx.beginPath();
    ctx.moveTo(0, cvs.height);
    ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);

    for (var i = 0; i < obj.nodes.length; i++) {
      if (obj.nodes[i + 1]) {
        ctx.quadraticCurveTo(
          obj.nodes[i][0] + 300 * Math.cos(frameCount / 100), obj.nodes[i][1],
          diff(obj.nodes[i][0] + 300 * Math.cos(frameCount / 100), obj.nodes[i + 1][0] + 300 * Math.cos(frameCount / 100)), diff(obj.nodes[i][1], obj.nodes[i + 1][1])
        );
      }
      else {

        ctx.lineTo(obj.nodes[i][0] + 300 * Math.cos(frameCount / 100), obj.nodes[i][1]);
        ctx.lineTo(cvs.width, cvs.height);
      }
    }
    ctx.closePath();
    ctx.fill();

  }

  function drawNodes(array) {
    ctx.strokeStyle = "#888";

    for (var i = 0; i < array.length; i++) {
      ctx.beginPath();
      ctx.arc(array[i][0], array[i][1], 4, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }

  }

  function drawLine(array) {
    ctx.strokeStyle = "#888";

    for (var i = 0; i < array.length; i++) {

      if (array[i + 1]) {
        ctx.lineTo(array[i + 1][0], array[i + 1][1]);
      }
    }

    ctx.stroke();
  }

  function resizeCanvas(canvas, width, height) {

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
    }
    else {

      let cvsWidth = window.innerWidth - document.querySelector('.block').getBoundingClientRect().left * 2 + 300

      canvas.width = cvsWidth;
      canvas.height = waveHeight;
    }
  }

  document.addEventListener("DOMContentLoaded", init, false);
})();