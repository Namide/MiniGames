(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
Math.__name__ = true;
var haxe = {};
haxe.Log = function() { };
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
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
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
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
mg.Main.__name__ = true;
mg.Main.main = function() {
	mg.Main.MAIN = new mg.Main();
};
mg.games = {};
mg.games.Game = function() {
	this.mainUI = new mg.utils.Table(window.document.body,2,1);
	this.mainUI.table.style.height = "480px";
	this.mainUI.table.style.width = "720px";
	this.consoleUI = new mg.utils.Console(this.mainUI.getTd(0,1),480);
	this.gameUI = this.mainUI.getTd(0,0);
	this.gameUI.style.width = "480px";
	mg.games.Game.INST = this;
	mg.utils.Console.INST.addText("<strong>Init Game loader</strong>",true);
	mg.utils.Console.INST.addText("<em>by Namide (Damien Doussaud)</em>",false);
	mg.utils.Console.INST.addText("Language: Haxe 3.1.3",false);
	mg.utils.Console.INST.addText("Build: Javascript",true);
	mg.utils.Console.INST.addText("All files loaded",true);
};
mg.games.Game.__name__ = true;
mg.games.Dir = { __ename__ : true, __constructs__ : ["Top","Down","Left","Right"] };
mg.games.Dir.Top = ["Top",0];
mg.games.Dir.Top.toString = $estr;
mg.games.Dir.Top.__enum__ = mg.games.Dir;
mg.games.Dir.Down = ["Down",1];
mg.games.Dir.Down.toString = $estr;
mg.games.Dir.Down.__enum__ = mg.games.Dir;
mg.games.Dir.Left = ["Left",2];
mg.games.Dir.Left.toString = $estr;
mg.games.Dir.Left.__enum__ = mg.games.Dir;
mg.games.Dir.Right = ["Right",3];
mg.games.Dir.Right.toString = $estr;
mg.games.Dir.Right.__enum__ = mg.games.Dir;
mg.games.Snake = function() {
	this.vel = 1000;
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
	this.draw(true);
	window.document.onkeydown = function(e) {
		var _g = e.keyCode;
		switch(_g) {
		case 38:
			if(_g1.snakeLastDir != mg.games.Dir.Top) _g1.snakeDir = mg.games.Dir.Top;
			break;
		case 40:
			if(_g1.snakeLastDir != mg.games.Dir.Down) _g1.snakeDir = mg.games.Dir.Down;
			break;
		case 37:
			if(_g1.snakeLastDir != mg.games.Dir.Left) _g1.snakeDir = mg.games.Dir.Left;
			break;
		case 39:
			if(_g1.snakeLastDir != mg.games.Dir.Right) _g1.snakeDir = mg.games.Dir.Right;
			break;
		}
	};
	haxe.Timer.delay($bind(this,this.upd),this.vel);
};
mg.games.Snake.__name__ = true;
mg.games.Snake.__super__ = mg.games.Game;
mg.games.Snake.prototype = $extend(mg.games.Game.prototype,{
	draw: function(init) {
		if(init == null) init = false;
		if(init) {
			this.table = new mg.utils.Table(this.gameUI,10,10);
			var _g = 0;
			while(_g < 10) {
				var i = _g++;
				var _g1 = 0;
				while(_g1 < 10) {
					var j = _g1++;
					var elmt = this.table.getTd(i,j);
					elmt.style.backgroundColor = "#000";
					elmt.style.transition = "backgroundColor 0.25s";
					elmt.innerHTML = "";
				}
			}
		}
		var _g2 = 0;
		while(_g2 < 10) {
			var i1 = _g2++;
			var _g11 = 0;
			while(_g11 < 10) {
				var j1 = _g11++;
				var elmt1 = this.table.getTd(i1,j1);
				if(this.snake[i1][j1] > 0 || this.apples[i1][j1] > 0) elmt1.style.backgroundColor = "#000"; else elmt1.style.backgroundColor = "#FFF";
			}
		}
	}
	,init: function() {
		mg.utils.Console.INST.addText("Init grid: " + 10 + "x" + 10,false);
		mg.utils.Console.INST.addText("<strong>Start Game</strong>",true);
		this.snakeHead = { x : Math.floor(3.3333333333333335), y : Math.floor(6.666666666666667)};
		this.snakeLength = 1;
		this.snakeDir = mg.games.Dir.Right;
		this.snakeLastDir = null;
		this.score = 0;
		this.frame = 0;
		this.vel = 1000;
		this.snake = [];
		this.apples = [];
		var _g = 0;
		while(_g < 10) {
			var i = _g++;
			this.snake[i] = [];
			this.apples[i] = [];
			var _g1 = 0;
			while(_g1 < 10) {
				var j = _g1++;
				this.snake[i][j] = 0;
				this.apples[i][j] = 0;
			}
		}
	}
	,dead: function() {
		mg.utils.Console.INST.addText("Game over!",true);
		mg.utils.Console.INST.addText("Score: <strong>" + this.score + "</strong>",true);
	}
	,eat: function() {
		mg.utils.Console.INST.addText("Eat apple!",true);
		this.snakeLength++;
		this.score++;
		mg.utils.Console.INST.addText("Score: <strong>" + this.score + "</strong>",true);
	}
	,check: function() {
		this.frame++;
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
		haxe.Log.trace(this.snakeHead,{ fileName : "Snake.hx", lineNumber : 179, className : "mg.games.Snake", methodName : "check", customParams : [this.snakeDir]});
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
		if(this.snakeHead.x < 0) this.snakeHead.x = 9; else if(this.snakeHead.x >= 10) this.snakeHead.x = 0; else this.snakeHead.x = this.snakeHead.x;
		if(this.snakeHead.y < 0) this.snakeHead.y = 9; else if(this.snakeHead.y >= 10) this.snakeHead.y = 0; else this.snakeHead.y = this.snakeHead.y;
		if(this.snake[this.snakeHead.x][this.snakeHead.y] > -1) this.dead();
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
		if(this.frame % 20 == 0) {
			var p = this.getRandPos();
			while(this.snake[p.x][p.y] > 0 && this.snakeLength < 100) p = this.getRandPos();
			this.apples[p.x][p.y] = 20;
		}
		if(this.frame % 60 == 0) this.vel = Math.floor(this.vel * 2 / 3);
	}
	,getRandPos: function() {
		return { x : Math.floor(Math.random() * 10), y : Math.floor(Math.random() * 10)};
	}
	,upd: function() {
		if(mg.games.Game.INST != this) {
			mg.utils.Console.INST.addText("Snake kill process",true);
			return;
		}
		haxe.Log.trace("check",{ fileName : "Snake.hx", lineNumber : 245, className : "mg.games.Snake", methodName : "upd"});
		this.check();
		this.draw();
		haxe.Timer.delay($bind(this,this.upd),this.vel);
	}
});
mg.utils = {};
mg.utils.Console = function(element,height) {
	this.console = element;
	this.console.style.backgroundColor = "#000";
	this.textUI = window.document.createElement("div");
	this.textUI.style.color = "#FFF";
	this.textUI.style.fontFamily = "\"Courier New\", monospace";
	this.textUI.style.overflow = "hidden";
	this.textUI.style.height = height + "px";
	this.console.appendChild(this.textUI);
	this.commands = [];
	mg.utils.Console.INST = this;
	haxe.Timer.delay($bind(this,this.write),1000);
};
mg.utils.Console.__name__ = true;
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
mg.utils.Table.__name__ = true;
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
String.__name__ = true;
Array.__name__ = true;
mg.Main.ColorDark = "#000";
mg.Main.ColorLight = "#FFF";
mg.games.Snake.SIZE = 10;
mg.games.Snake.APPLE_TIME = 20;
mg.games.Snake.VEL = 1000;
mg.Main.main();
})();

//# sourceMappingURL=MiniGames.js.map