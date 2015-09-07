package mg.games;
import haxe.Timer;
import js.Browser;
import js.html.Point;
import mg.utils.Console;

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
	public inline static var SIZE:Int = 30;
	public inline static var APPLE_TIME:Int = 20;
	var VEL:Int = 500;
	
	var snake:Array<Array<Int>>;
	var apples:Array<Array<Int>>;
	//var apples:Array<Array<Int>>;
	var snakeDir:Dir;
	var snakeLength:Int;
	var snakeHead:Point;
	
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
		
		
		Browser.document.onkeydown = function(e:Dynamic)
		{
			switch(e.keyCode)
			{
				case 38 : snakeDir = Dir.Top;
				case 40 : snakeDir = Dir.Down;
				case 37 : snakeDir = Dir.Left;
				case 39 : snakeDir = Dir.Right;
			}
		};
		Timer.delay( upd, VEL );
	}
	
	function init()
	{
		Console.add("Init grid: " + SIZE + "x" + SIZE );
		//Console.add("Velocity: 1 frame by " + VEL + " millisec", true );
		Console.add("<strong>Start Game</strong>", true );
		
		snakeHead = { x:Math.floor(SIZE / 3), y:Math.floor(SIZE * 2 / 3) };
		snakeLength = 1;
		snakeDir = Dir.Right;
	}
	
	function dead()
	{
		Console.add("Game over!", true);
	}
	
	function eat()
	{
		Console.add("Eat apple!", true);
		snakeLength;
	}
	
	function check()
	{
		switch(snakeDir)
		{
			case Dir.Top : snakeHead.y--;
			case Dir.Down : snakeHead.y++;
			case Dir.Left : snakeHead.x--;
			case Dir.Right : snakeHead.x++;
		}
		
		if ( apples[snakeHead.x][snakeHead.y] > -1 )
			eat();
		
		for ( i in 0...snake.length )
		{
			for ( j in 0...snake[i].length )
			{
				if ( snake[i][j] > 0 )
					snake[i][j]--;
			}
		}
		
		
		
		snakeHead.x = (snakeHead.x<0)?(SIZE-1):(snakeHead.x>=SIZE)?0:snakeHead.x;
		snakeHead.y = (snakeHead.y<0)?(SIZE-1):(snakeHead.y>=SIZE)?0:snakeHead.y;
		
		if ( snake[snakeHead.x][snakeHead.y] > -1 )
			dead();
		
		
		snake[snakeHead.x][snakeHead.y] = snakeLength;
		
		
		testApple();
		
		
	}
	
	function testApple()
	{
		
	}
	
	function upd()
	{
		if ( Game.INST != this )
		{
			Console.add("Snake kill process", true );
			return;
		}
		
		check();
		
		Timer.delay( upd, VEL );
	}
	
}