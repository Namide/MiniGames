(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var mg = {};
mg.Main = function() {
	var html = window.document.documentElement;
	html.style.height = "100%";
	html.style.backgroundColor = "#000";
	var body = window.document.body;
	body.style.height = "100%";
	body.style.margin = "0";
	body.style.padding = "0";
	body.style.color = "#FFF";
	this.game = new mg.games.Snake();
};
mg.Main.main = function() {
	mg.Main.MAIN = new mg.Main();
};
mg.games = {};
mg.games.Game = function() {
	this.mainUI = new mg.utils.Table(window.document.body,2,1);
	this.consoleUI = new mg.utils.Console(this.mainUI.getTd(0,1));
	mg.games.Game.INST = this;
	mg.utils.Console.INST.addText("<strong>Init Game loader</strong>",true);
	mg.utils.Console.INST.addText("<em>by Namide (Damien Doussaud)</em>",false);
	mg.utils.Console.INST.addText("Language: Haxe 3.1.3",false);
	mg.utils.Console.INST.addText("Build: Javascript",true);
	mg.utils.Console.INST.addText("All files loaded",true);
};
mg.games.Dir = { __constructs__ : ["Top","Down","Left","Right"] };
mg.games.Dir.Top = ["Top",0];
mg.games.Dir.Top.__enum__ = mg.games.Dir;
mg.games.Dir.Down = ["Down",1];
mg.games.Dir.Down.__enum__ = mg.games.Dir;
mg.games.Dir.Left = ["Left",2];
mg.games.Dir.Left.__enum__ = mg.games.Dir;
mg.games.Dir.Right = ["Right",3];
mg.games.Dir.Right.__enum__ = mg.games.Dir;
mg.games.Snake = function() {
	this.VEL = 500;
	var _g1 = this;
	mg.games.Game.call(this);
	mg.utils.Console.ascii("   _____             _");
	mg.utils.Console.ascii("  / ____|           | |");
	mg.utils.Console.ascii(" | (___  _ __   __ _| | _____");
	mg.utils.Console.ascii("  \\___ \\| '_ \\ / _` | |/ / _ \\ ");
	mg.utils.Console.ascii("  ____) | | | | (_| |   <  __/ ");
	mg.utils.Console.ascii(" |_____/|_| |_|\\__,_|_|\\_\\___| ",true);
	mg.utils.Console.INST.addText("<em>Clone of the famous game of the 70s</em>",true);
	this.init();
	window.document.onkeydown = function(e) {
		var _g = e.keyCode;
		switch(_g) {
		case 38:
			_g1.snakeDir = mg.games.Dir.Top;
			break;
		case 40:
			_g1.snakeDir = mg.games.Dir.Down;
			break;
		case 37:
			_g1.snakeDir = mg.games.Dir.Left;
			break;
		case 39:
			_g1.snakeDir = mg.games.Dir.Right;
			break;
		}
	};
	haxe.Timer.delay($bind(this,this.upd),this.VEL);
};
mg.games.Snake.__super__ = mg.games.Game;
mg.games.Snake.prototype = $extend(mg.games.Game.prototype,{
	init: function() {
		mg.utils.Console.INST.addText("Init grid: " + 30 + "x" + 30,false);
		mg.utils.Console.INST.addText("<strong>Start Game</strong>",true);
		this.snakeHead = { x : Math.floor(10.), y : Math.floor(20.)};
		this.snakeLength = 1;
		this.snakeDir = mg.games.Dir.Right;
	}
	,dead: function() {
		mg.utils.Console.INST.addText("Game over!",true);
	}
	,eat: function() {
		mg.utils.Console.INST.addText("Eat apple!",true);
		this.snakeLength;
	}
	,check: function() {
		var _g = this.snakeDir;
		switch(_g[1]) {
		case 0:
			this.snakeHead.y--;
			break;
		case 1:
			this.snakeHead.y++;
			break;
		case 2:
			this.snakeHead.x--;
			break;
		case 3:
			this.snakeHead.x++;
			break;
		}
		if(this.apples[this.snakeHead.x][this.snakeHead.y] > -1) this.eat();
		var _g1 = 0;
		var _g2 = this.snake.length;
		while(_g1 < _g2) {
			var i = _g1++;
			var _g3 = 0;
			var _g21 = this.snake[i].length;
			while(_g3 < _g21) {
				var j = _g3++;
				if(this.snake[i][j] > 0) this.snake[i][j]--;
			}
		}
		if(this.snakeHead.x < 0) this.snakeHead.x = 29; else if(this.snakeHead.x >= 30) this.snakeHead.x = 0; else this.snakeHead.x = this.snakeHead.x;
		if(this.snakeHead.y < 0) this.snakeHead.y = 29; else if(this.snakeHead.y >= 30) this.snakeHead.y = 0; else this.snakeHead.y = this.snakeHead.y;
		if(this.snake[this.snakeHead.x][this.snakeHead.y] > -1) this.dead();
		this.snake[this.snakeHead.x][this.snakeHead.y] = this.snakeLength;
		this.testApple();
	}
	,testApple: function() {
	}
	,upd: function() {
		if(mg.games.Game.INST != this) {
			mg.utils.Console.INST.addText("Snake kill process",true);
			return;
		}
		this.check();
		haxe.Timer.delay($bind(this,this.upd),this.VEL);
	}
});
mg.utils = {};
mg.utils.Console = function(element) {
	this.console = element;
	this.console.style.backgroundColor = "#000";
	this.console.style.color = "#FFF";
	this.console.style.fontFamily = "\"Courier New\", monospace";
	this.commands = [];
	mg.utils.Console.INST = this;
	haxe.Timer.delay($bind(this,this.write),1000);
};
mg.utils.Console.add = function(text,jump) {
	if(jump == null) jump = false;
	mg.utils.Console.INST.addText(text,jump);
};
mg.utils.Console.ascii = function(text,jump) {
	if(jump == null) jump = false;
	mg.utils.Console.INST.addText("<pre style='margin:0;padding:0;'>" + text + "</pre>",jump);
};
mg.utils.Console.prototype = {
	addText: function(text,jump) {
		if(jump == null) jump = false;
		this.commands.push(text + (jump?"<br><br>":""));
	}
	,write: function() {
		if(this != mg.utils.Console.INST) return;
		if(this.commands.length > 0) {
			var text = this.commands.shift();
			var div = window.document.createElement("div");
			div.innerHTML = text;
			this.console.appendChild(div);
		}
		haxe.Timer.delay($bind(this,this.write),100);
	}
};
mg.utils.Table = function(parent,rows,lines) {
	this.table = window.document.createElement("table");
	this.table.style.width = "100%";
	this.table.style.height = "100%";
	this.trs = [];
	this.tds = [];
	var _g = 0;
	while(_g < lines) {
		var i = _g++;
		var tr = window.document.createElement("tr");
		this.tds.push([]);
		var _g1 = 0;
		while(_g1 < rows) {
			var j = _g1++;
			var td = window.document.createElement("td");
			tr.appendChild(td);
			this.tds[this.tds.length - 1].push(td);
		}
		this.trs.push(tr);
		this.table.appendChild(tr);
	}
	parent.appendChild(this.table);
};
mg.utils.Table.prototype = {
	getTr: function(id) {
		return this.trs[id];
	}
	,getTd: function(trId,tdId) {
		return this.tds[trId][tdId];
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
mg.Main.ColorDark = "#000";
mg.Main.ColorLight = "#FFF";
mg.games.Snake.SIZE = 30;
mg.games.Snake.APPLE_TIME = 20;
mg.Main.main();
})();

//# sourceMappingURL=MiniGames.js.map