package mg.games;
import haxe.Timer;
import js.Browser;
import js.html.Point;
import mg.utils.Console;
import mg.utils.Table;

/*enum Pawn {
  Apple;
  Empty;
}*/

enum Dir {
  Top;
  Down;
  Left;
  Right;
}

typedef Point = {
	var x:Int;
	var y:Int;
};

/**
 * ...
 * @author Namide
 */
class Snake extends Game
{
	public inline static var SIZE:Int = 10;
	public inline static var APPLE_TIME:Int = 20;
	public inline static var VEL:Int = 1000;
	var vel:Int = 1000;
	
	var snake:Array<Array<Int>>;
	var apples:Array<Array<Int>>;
	//var apples:Array<Array<Int>>;
	var snakeLastDir:Dir;
	var snakeDir:Dir;
	var snakeLength:Int;
	var snakeHead:Point;
	
	var score:Int;
	var frame:Int;
	
	
	var table:Table;
	
	
	public function new()
	{
		super();
		
		
		Console.ascii("   _____             _");
		Console.ascii("  / ____|           | |");
		Console.ascii(" | (___  _ __   __ _| | _____");
		Console.ascii("  \\___ \\| '_ \\ / _` | |/ / _ \\ ");
		Console.ascii("  ____) | | | | (_| |   <  __/ ");
		Console.ascii(" |_____/|_| |_|\\__,_|_|\\_\\___| ", true);
		
        Console.add("<em>Clone of the famous game of the 70s</em>", true);
		
		init();
		draw(true);
		
		Browser.document.onkeydown = function(e:Dynamic)
		{
			switch(e.keyCode)
			{
				case 38 :
					if ( snakeLastDir != Dir.Top )
						snakeDir = Dir.Top;
				case 40 :
					if ( snakeLastDir != Dir.Down )
						snakeDir = Dir.Down;
				case 37 :
					if ( snakeLastDir != Dir.Left )
						snakeDir = Dir.Left;
				case 39 :
					if ( snakeLastDir != Dir.Right )
						snakeDir = Dir.Right;
			}
		};
		Timer.delay( upd, vel );
	}
	
	function draw( init:Bool = false )
	{
		if ( init )
		{
			table = new Table( gameUI, SIZE, SIZE );
			for ( i in 0...SIZE )
			{
				for ( j in 0...SIZE )
				{
					var elmt = table.getTd(i, j);
					elmt.style.backgroundColor = Main.ColorDark;
					elmt.style.transition = "backgroundColor 0.25s";
					elmt.innerHTML = "";
				}
			}
		}
		
		for ( i in 0...SIZE )
		{
			for ( j in 0...SIZE )
			{
				var elmt = table.getTd(i, j);
				if ( snake[i][j] > 0 || apples[i][j] > 0 )
					elmt.style.backgroundColor = Main.ColorDark;
				else
					elmt.style.backgroundColor = Main.ColorLight;
			}
		}
	}
	
	function init()
	{
		Console.add("Init grid: " + SIZE + "x" + SIZE );
		//Console.add("Velocity: 1 frame by " + vel + " millisec", true );
		Console.add("<strong>Start Game</strong>", true );
		
		snakeHead = { x:Math.floor(SIZE / 3), y:Math.floor(SIZE * 2 / 3) };
		snakeLength = 1;
		snakeDir = Dir.Right;
		snakeLastDir = null;
		score = 0;
		frame = 0;
		vel = VEL;
		
		snake = [];
		apples = [];
		for (i in 0...SIZE)
		{
			snake[i] = [];
			apples[i] = [];
			for (j in 0...SIZE)
			{
				snake[i][j] = 0;
				apples[i][j] = 0;
			}
		}
	}
	
	function dead()
	{
		Console.add("Game over!", true);
		Console.add("Score: <strong>" + score + "</strong>", true);
		//init();
	}
	
	function eat()
	{
		Console.add("Eat apple!", true);
		snakeLength++;
		score++;
		Console.add("Score: <strong>" + score + "</strong>", true);
	}
	
	function check()
	{
		frame++;
		
		
		switch(snakeDir)
		{
			case Dir.Top :
				snakeHead.y--;
			case Dir.Down :
				snakeHead.y++;
			case Dir.Left :
				snakeHead.x--;
			case Dir.Right :
				snakeHead.x++;
		}
		
		trace(snakeHead, snakeDir);
		
		if (apples[snakeHead.x][snakeHead.y] > -1)
			eat();
		
		for (i in 0...snake.length)
		{
			for (j in 0...snake[i].length)
			{
				if (snake[i][j] > 0)
					snake[i][j]--;
			}
		}
		
		snakeHead.x = (snakeHead.x<0)?(SIZE-1):(snakeHead.x>=SIZE)?0:snakeHead.x;
		snakeHead.y = (snakeHead.y<0)?(SIZE-1):(snakeHead.y>=SIZE)?0:snakeHead.y;
		
		if ( snake[snakeHead.x][snakeHead.y] > -1 )
			dead();
		
		snake[snakeHead.x][snakeHead.y] = snakeLength;
		
		
		
		// APPLES
		for (i in 0...apples.length)
		{
			for (j in 0...apples[i].length)
			{
				if (apples[i][j] > 0)
					apples[i][j]--;
			}
		}
		
		if ( (frame % APPLE_TIME) == 0)
		{
			var p = getRandPos();
			while ( snake[p.x][p.y] > 0 && snakeLength < SIZE * SIZE )
				p = getRandPos();
				
			apples[p.x][p.y] = APPLE_TIME;
		}
		
		
		// VELLOCITY
		if ( (frame % (APPLE_TIME * 3)) == 0)
		{
			vel = Math.floor(vel * 2 / 3);
		}
		
		
	}
	
	function getRandPos():Point
	{
		return { x:Math.floor(Math.random() * SIZE), y:Math.floor(Math.random() * SIZE) }
	}
	
	function upd()
	{
		if ( Game.INST != this )
		{
			Console.add("Snake kill process", true );
			return;
		}
		
		trace("check");
		
		check();
		draw();
		Timer.delay( upd, vel );
	}
	
}