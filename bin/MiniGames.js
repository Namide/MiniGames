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
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
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
	html.style.backgroundColor = "#053604";
	var body = window.document.body;
	body.style.height = "100%";
	body.style.margin = "0";
	body.style.padding = "0";
	body.style.color = "#47e743";
	this.game = new mg.games.Snake();
};
mg.Main.main = function() {
	mg.Main.MAIN = new mg.Main();
};
mg.games = {};
mg.games.Game = function() {
	this.containerUI = new mg.utils.Table(window.document.body,1,1);
	this.containerUI.table.style.width = "100%";
	this.containerUI.table.style.height = "100%";
	this.mainUI = new mg.utils.Table(this.containerUI.getTd(0,0),2,1);
	this.mainUI.table.style.margin = "auto";
	this.mainUI.table.style.height = "480px";
	this.mainUI.table.style.width = "720px";
	this.consoleUI = new mg.utils.Console(this.mainUI.getTd(0,1),480);
	this.gameUI = this.mainUI.getTd(0,0);
	this.gameUI.style.width = "480px";
	mg.games.Game.INST = this;
	mg.utils.Console.INST.addText("Init Game loader",16 | 8);
	mg.utils.Console.INST.addText("by Namide (Damien Doussaud)",16 | 8);
	mg.utils.Console.INST.addText("Language: Haxe 3.1.3",16);
	mg.utils.Console.INST.addText("Build: Javascript",16);
	mg.utils.Console.INST.addText("All files loaded",16 | 8);
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
	this.vel = 1000;
	var _g1 = this;
	mg.games.Game.call(this);
	mg.utils.Console.INST.addText("   _____             _",32 | 64);
	mg.utils.Console.INST.addText("  / ____|           | |",32);
	mg.utils.Console.INST.addText(" | (___  _ __   __ _| | _____",32);
	mg.utils.Console.INST.addText("  \\___ \\| '_ \\ / _` | |/ / _ \\ ",32);
	mg.utils.Console.INST.addText("  ____) | | | | (_| |   <  __/ ",32);
	mg.utils.Console.INST.addText(" |_____/|_| |_|\\__,_|_|\\_\\___| ",32 | 128);
	mg.utils.Console.INST.addText("Clone of the famous game of the 70s",8 | 16);
	this.init();
	this.draw(true);
	window.document.onkeydown = function(e) {
		var _g = e.keyCode;
		switch(_g) {
		case 38:
			if(_g1.snakeLastDir != mg.games.Dir.Down) _g1.snakeDir = mg.games.Dir.Top;
			break;
		case 40:
			if(_g1.snakeLastDir != mg.games.Dir.Top) _g1.snakeDir = mg.games.Dir.Down;
			break;
		case 37:
			if(_g1.snakeLastDir != mg.games.Dir.Right) _g1.snakeDir = mg.games.Dir.Left;
			break;
		case 39:
			if(_g1.snakeLastDir != mg.games.Dir.Left) _g1.snakeDir = mg.games.Dir.Right;
			break;
		}
	};
	haxe.Timer.delay($bind(this,this.upd),this.vel);
};
mg.games.Snake.__super__ = mg.games.Game;
mg.games.Snake.prototype = $extend(mg.games.Game.prototype,{
	draw: function(init) {
		if(init == null) init = false;
		if(init) {
			this.table = new mg.utils.Table(this.gameUI,20,20);
			var _g = 0;
			while(_g < 20) {
				var i = _g++;
				var _g1 = 0;
				while(_g1 < 20) {
					var j = _g1++;
					var elmt = this.table.getTd(i,j);
					elmt.style.backgroundColor = "#095307";
					elmt.innerHTML = "";
				}
			}
		}
		var _g2 = 0;
		while(_g2 < 20) {
			var i1 = _g2++;
			var _g11 = 0;
			while(_g11 < 20) {
				var j1 = _g11++;
				var elmt1 = this.table.getTd(j1,i1);
				if(this.snake[i1][j1] > 0) {
					elmt1.style.transition = "none";
					elmt1.style.backgroundColor = "#47e743";
				} else if(this.apples[i1][j1] > 0) {
					elmt1.style.transition = "background-color 0.25s";
					elmt1.style.backgroundColor = "#148212";
				} else {
					elmt1.style.transition = "background-color 0.25s";
					elmt1.style.backgroundColor = "#095307";
				}
			}
		}
	}
	,init: function() {
		mg.utils.Console.INST.addText("Init grid: " + 20 + "x" + 20,16);
		mg.utils.Console.INST.addText("Init properties: pos, vel, score, time",16);
		mg.utils.Console.INST.addText("Start Game",4);
		this.snakeHead = { x : Math.floor(6.666666666666667), y : Math.floor(13.333333333333334)};
		this.snakeLength = 5;
		this.snakeDir = mg.games.Dir.Right;
		this.snakeLastDir = null;
		this.score = 0;
		this.frame = 0;
		this.vel = 300;
		this.startTime = haxe.Timer.stamp();
		this.snake = [];
		this.apples = [];
		var _g = 0;
		while(_g < 20) {
			var i = _g++;
			this.snake[i] = [];
			this.apples[i] = [];
			var _g1 = 0;
			while(_g1 < 20) {
				var j = _g1++;
				this.snake[i][j] = 0;
				this.apples[i][j] = 0;
			}
		}
	}
	,dead: function() {
		mg.utils.Console.add("Time: " + Math.round((haxe.Timer.stamp() - this.startTime) * 100) / 100 + "s",null);
		mg.utils.Console.INST.addText("Score: " + this.score,4);
		mg.utils.Console.INST.addText("   _____ ",32 | 64);
		mg.utils.Console.INST.addText("  / ____| ",32);
		mg.utils.Console.INST.addText(" | |  __  __ _ _ __ ___   ___ ",32);
		mg.utils.Console.INST.addText(" | | |_ |/ _` | '_ ` _ \\ / _ \\ ",32);
		mg.utils.Console.INST.addText(" | |__| | (_| | | | | | |  __/ ",32);
		mg.utils.Console.INST.addText("  \\_____|\\__,_|_| |_| |_|\\___| ",32);
		mg.utils.Console.INST.addText("   ____                        ",32);
		mg.utils.Console.INST.addText("  / __ \\  ",32);
		mg.utils.Console.INST.addText(" | |  | |_   _____ _ __  ",32);
		mg.utils.Console.INST.addText(" | |  | \\ \\ / / _ \\ '__| ",32);
		mg.utils.Console.INST.addText(" | |__| |\\ V /  __/ |      ",32);
		mg.utils.Console.INST.addText("  \\____/  \\_/ \\___|_| ",32 | 128);
		this.init();
	}
	,eat: function() {
		this.snakeLength++;
		this.score++;
		this.apples[this.snakeHead.x][this.snakeHead.y] = 0;
		mg.utils.Console.INST.addText("Eat apple!",8 | 16);
		mg.utils.Console.INST.addText("Score: " + this.score,4);
	}
	,check: function() {
		this.snakeLastDir = this.snakeDir;
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
		if(this.snakeHead.x < 0) this.snakeHead.x = 19; else if(this.snakeHead.x >= 20) this.snakeHead.x = 0; else this.snakeHead.x = this.snakeHead.x;
		if(this.snakeHead.y < 0) this.snakeHead.y = 19; else if(this.snakeHead.y >= 20) this.snakeHead.y = 0; else this.snakeHead.y = this.snakeHead.y;
		if(this.apples[this.snakeHead.x][this.snakeHead.y] > 0) this.eat();
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
		if(this.snake[this.snakeHead.x][this.snakeHead.y] > 0) this.dead();
		this.snake[this.snakeHead.x][this.snakeHead.y] = this.snakeLength;
		var _g11 = 0;
		var _g4 = this.apples.length;
		while(_g11 < _g4) {
			var i1 = _g11++;
			var _g31 = 0;
			var _g22 = this.apples[i1].length;
			while(_g31 < _g22) {
				var j1 = _g31++;
				if(this.apples[i1][j1] > 0) this.apples[i1][j1]--;
			}
		}
		if(this.frame % Math.floor(20.) == 0) {
			var p = this.getRandPos();
			while(this.snake[p.x][p.y] > 0 && this.snakeLength < 400) p = this.getRandPos();
			this.apples[p.x][p.y] = 40;
		}
		this.frame++;
		if(this.frame % Math.round(5.0 * (300 / this.vel)) == 0) {
			this.vel = Math.floor(300 - (haxe.Timer.stamp() - this.startTime));
			if(this.vel < 40) this.vel = 40; else {
			}
		}
	}
	,getRandPos: function() {
		return { x : Math.floor(Math.random() * 20), y : Math.floor(Math.random() * 20)};
	}
	,upd: function() {
		if(mg.games.Game.INST != this) {
			mg.utils.Console.INST.addText("Snake kill process",16);
			return;
		}
		this.check();
		this.draw();
		haxe.Timer.delay($bind(this,this.upd),this.vel);
	}
});
mg.utils = {};
mg.utils._Console = {};
mg.utils._Console.TextType_Impl_ = function() { };
mg.utils._Console.TextType_Impl_.value = function(index) {
	return 1 << index;
};
mg.utils.Console = function(element,height) {
	this.console = element;
	this.console.style.backgroundColor = "#053604";
	this.textUI = window.document.createElement("div");
	this.textUI.style.color = "#47e743";
	this.textUI.style.fontFamily = "\"Courier New\", monospace";
	this.textUI.style.overflow = "hidden";
	this.textUI.style.height = height + "px";
	this.textUI.style.fontSize = 14 + "px";
	this.console.appendChild(this.textUI);
	this.commands = [];
	mg.utils.Console.INST = this;
	haxe.Timer.delay($bind(this,this.write),1000);
};
mg.utils.Console.add = function(text,type) {
	if(type == null) type = 0;
	mg.utils.Console.INST.addText(text,type);
};
mg.utils.Console.prototype = {
	addText: function(text,type) {
		if((type & 4) != 0) text = "<strong>" + text + "</strong>";
		if((type & 8) != 0) text = "<em>" + text + "</em>";
		if((type & 2) != 0) text = "<small>" + text + "</small>";
		if((type & 1) != 0) text = "<span style=\"font-size:large\">" + text + "</span>";
		if((type & 16) != 0) text = "<span style=\"opacity:0.5\">" + text + "</span>";
		if((type & 32) != 0) text = "<pre style='margin:0;padding:0;'>" + text + "</pre>";
		if((type & 64) != 0) text = "<br>" + text;
		if((type & 128) != 0) text += "<br><br>";
		this.commands.push(text);
	}
	,write: function() {
		if(this != mg.utils.Console.INST) return;
		if(this.commands.length > 0) {
			var text = this.commands.shift();
			var div = window.document.createElement("div");
			div.innerHTML = text;
			this.textUI.appendChild(div);
			this.textUI.scrollTop = this.textUI.scrollHeight;
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
mg.Main.ColorBlack = "#053604";
mg.Main.ColorDarkGray = "#095307";
mg.Main.ColorWhiteGrey = "#148212";
mg.Main.ColorWhite = "#47e743";
mg.games.Snake.SIZE = 20;
mg.games.Snake.VEL_DELAY = 5.0;
mg.games.Snake.APPLE_TIME = 40;
mg.games.Snake.SNAKE_VEL = 300;
mg.games.Snake.SNAKE_VEL_MAX = 40;
mg.games.Snake.SNAKE_SIZE = 5;
mg.utils._Console.TextType_Impl_.Big = 1;
mg.utils._Console.TextType_Impl_.Small = 2;
mg.utils._Console.TextType_Impl_.Strong = 4;
mg.utils._Console.TextType_Impl_.Italic = 8;
mg.utils._Console.TextType_Impl_.Transparent = 16;
mg.utils._Console.TextType_Impl_.Ascii = 32;
mg.utils._Console.TextType_Impl_.JumpBefore = 64;
mg.utils._Console.TextType_Impl_.JumpAfter = 128;
mg.Main.main();
})();

//# sourceMappingURL=MiniGames.js.map