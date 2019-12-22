import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

//Variables
//Settings
 var settings = 
 {  
    physics_accuracy: 3,
    mouse_influence: 20, mouse_cut: 5,

    gravity: 0,

    cloth_height: 50, cloth_width: 30,
    start_y: 20,
    spacing: 7,
    tear_distance: 60,

    canvas: null,
      ctx: null,
      cloth: null,
      boundsx: null,
      boundsy: null,
      mouse: {
          down: false,
          button: 1,
          x: 0, y: 0,
          px: 0, py: 0
      },

      nx: 0,
      var: 0
}
  
  var Point = function (x, y) {
      this.x      = x;
      this.y      = y;
      this.px     = x;
      this.py     = y;
      this.vx     = 0;
      this.vy     = 0;
      this.pin_x  = null;
      this.pin_y  = null;      
      this.constraints = [];
  };
  
  window.requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
          window.setTimeout(callback, 1000 / 60);
  };

//Mouse Click Functionality
  Point.prototype.update = function (delta) {

      if (settings.mouse.down) {
        var diff_x = this.x - settings.mouse.x,
            diff_y = this.y - settings.mouse.y,
            dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

        if (settings.mouse.button === 1) {
            if (dist < settings.mouse_influence) {
                this.px = this.x - (settings.mouse.x - settings.mouse.px) * 1.8;
                this.py = this.y - (settings.mouse.y - settings.mouse.py) * 1.8;
            }
          
        } else if (dist < settings.mouse_cut) this.constraints = [];
      }
  
      this.add_force(0, settings.gravity);
  
      delta *= delta;
      settings.nx = this.x + ((this.x - this.px) * .99) + ((this.vx / 2) * delta);
      settings.ny = this.y + ((this.y - this.py) * .99) + ((this.vy / 2) * delta);
  
      this.px = this.x;
      this.py = this.y;
  
      this.x = settings.nx;
      this.y = settings.ny;
  
      this.vy = this.vx = 0
  };

  //Canvas Draw Functionality
    Point.prototype.draw = function () {
        if (!this.constraints.length) return;
    
        var i = this.constraints.length;
        while (i--) this.constraints[i].draw();
    };
    
  //Constraints contents to the corder of the Canvas 
  Point.prototype.resolve_constraints = function () {
    if (this.pin_x != null && this.pin_y != null) {
        this.x = this.pin_x;
        this.y = this.pin_y;
        return;
    }

    var i = this.constraints.length;
    while (i--) this.constraints[i].resolve();

    this.x > settings.boundsx ? this.x = 2 * settings.boundsx - this.x : 1 > this.x && (this.x = 2 - this.x);
    this.y < 1 ? this.y = 2 - this.y : this.y > settings.boundsy && (this.y = 2 * settings.boundsy - this.y);
};
  
  Point.prototype.attach = function (point) {
      this.constraints.push(
          new Constraint(this, point)
      );
  };

//Breaks Constraints | Tears cloths
  Point.prototype.remove_constraint = function (constraint) {
      this.constraints.splice(this.constraints.indexOf(constraint), 1);
  };
  
//Does not seem to add anything
  Point.prototype.add_force = function (x, y) {
      /*this.vx += x;
      this.vy += y;
    
      var round = 400;
      this.vx = ~~(this.vx * round) / round;
      this.vy = ~~(this.vy * round) / round;*/
  };

//Points for contraint
  Point.prototype.pin = function (pinx, piny) {
      this.pin_x = pinx;
      this.pin_y = piny;
  };  
  var Constraint = function (p1, p2) {
      this.p1     = p1;
      this.p2     = p2;
      this.length = settings.spacing;
  };  
  Constraint.prototype.resolve = function () {
      var diff_x  = this.p1.x - this.p2.x,
          diff_y  = this.p1.y - this.p2.y,
          dist    = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
          diff    = (this.length - dist) / dist;
  
      if (dist > settings.tear_distance) this.p1.remove_constraint(this);
  
      var px = diff_x * diff * 0.5;
      var py = diff_y * diff * 0.5;
  
      this.p1.x += px;
      this.p1.y += py;
      this.p2.x -= px;
      this.p2.y -= py;
  };

//Draw Cloth
  Constraint.prototype.draw = function () {
    settings.ctx.moveTo(this.p1.x, this.p1.y);
    settings.ctx.lineTo(this.p2.x, this.p2.y);
  };

//Cloth Function
  var Cloth = function () {
      this.points = [];
  
      var start_x = settings.canvas.width / 2 - settings.cloth_width * settings.spacing / 2;
  
      for (var y = 0; y <= settings.cloth_height; y++) {
          for (var x = 0; x <= settings.cloth_width; x++) {
              var p = new Point(start_x + x * settings.spacing, settings.start_y + y * settings.spacing);
  
              x !== 0 && p.attach(this.points[this.points.length - 1]);
              y === 0 && p.pin(p.x, p.y);
              y !== 0 && p.attach(this.points[x + (y - 1) * (settings.cloth_width + 1)])
  
              this.points.push(p);
          }
      }
 };

//Update Function
  Cloth.prototype.update = function () {
      var i = settings.physics_accuracy;
  
      while (i--) {
          var p = this.points.length;
          while (p--) this.points[p].resolve_constraints();
      }
  
      i = this.points.length;
      while (i--) this.points[i].update(.016);
  };

//Draw Function
  Cloth.prototype.draw = function () {
    settings.ctx.beginPath();
  
      var i = settings.cloth.points.length;
      while (i--) settings.cloth.points[i].draw();
  
      settings.ctx.stroke();
  };
  
//Animation State Functions
  function update() {
    settings.ctx.clearRect(0, 0, settings.canvas.width, settings.canvas.height);
  
    settings.cloth.update();
    settings.cloth.draw();
  
      requestAnimationFrame(update);
  }

  function start() {
    settings.canvas.onmousedown = function (e) {
        settings.mouse.button  = e.which;
        settings.mouse.px      = settings.mouse.x;
        settings.mouse.py      = settings.mouse.y;
          var rect      = settings.canvas.getBoundingClientRect();
          settings.mouse.x       = e.clientX - rect.left;
          settings.mouse.y       = e.clientY - rect.top;
          settings.mouse.down    = true;
          e.preventDefault();
      };
  
      settings.canvas.onmouseup = function (e) {
        settings.mouse.down = false;
          e.preventDefault();
      };
  
      settings.canvas.onmousemove = function (e) {
        settings.mouse.px  = settings.mouse.x;
        settings.mouse.py  = settings.mouse.y;
          var rect  = settings.canvas.getBoundingClientRect();
          settings.mouse.x   = e.clientX - rect.left;
          settings.mouse.y   = e.clientY - rect.top;
          e.preventDefault();
      };
  
      settings.canvas.oncontextmenu = function (e) {
          e.preventDefault();
      };
  
      settings.boundsx = settings.canvas.width - 1;
      settings.boundsy = settings.canvas.height - 1;
  
      settings.ctx.strokeStyle = '#888';
    
      settings.cloth = new Cloth();
    
      update();
  }

  
  //Function
  function TearableCloth(props)
  {
    window.onload = function () {
        settings.canvas = document.getElementById('c');
        settings.ctx     = settings.canvas.getContext('2d');
    
        settings.canvas.width  = 560;
        settings.canvas.height = 350;
    
        start();
    };

      return(
        <div>
            <canvas id="c"></canvas>
        </div>
      )
  }

  export default TearableCloth;