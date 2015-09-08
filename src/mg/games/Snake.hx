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
	public inline static var SIZE:Int = 20;
	public inline static var VEL_DELAY:Float = 5.0;
	public inline static var APPLE_TIME:Int = SIZE * 2;
	public inline static var SNAKE_VEL:Int = 300;
	public inline static var SNAKE_VEL_MAX:Int = 40;
	public inline static var SNAKE_SIZE:Int = 5;
	var vel:Int = 1000;
	
	var snake:Array<Array<Int>>;
	var apples:Array<Array<Int>>;
	//var apples:Array<Array<Int>>;
	var snakeLastDir:Dir;
	var snakeDir:Dir;
	var snakeLength:Int;
	var snakeHead:Point;
	
	var startTime:Float;
	
	var score:Int;
	var frame:Int;
	
	
	var table:Table;
	
	
	public function new()
	{
		super();
		
		
		Console.add("   _____             _", TextType.Ascii | TextType.JumpBefore );
		Console.add("  / ____|           | |", TextType.Ascii);
		Console.add(" | (___  _ __   __ _| | _____", TextType.Ascii);
		Console.add("  \\___ \\| '_ \\ / _` | |/ / _ \\ ", TextType.Ascii);
		Console.add("  ____) | | | | (_| |   <  __/ ", TextType.Ascii);
		Console.add(" |_____/|_| |_|\\__,_|_|\\_\\___| ", TextType.Ascii | TextType.JumpAfter );
		
        Console.add("Clone of the famous game of the 70s", TextType.Italic | TextType.Transparent);
		
		init();
		draw(true);
		
		Browser.document.onkeydown = function(e:Dynamic)
		{
			switch(e.keyCode)
			{
				case 38 :
					if ( snakeLastDir != Dir.Down )
						snakeDir = Dir.Top;
				case 40 :
					if ( snakeLastDir != Dir.Top )
						snakeDir = Dir.Down;
				case 37 :
					if ( snakeLastDir != Dir.Right )
						snakeDir = Dir.Left;
				case 39 :
					if ( snakeLastDir != Dir.Left )
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
					elmt.style.backgroundColor = Main.ColorDarkGray;
					elmt.innerHTML = "";
				}
			}
		}
		
		for ( i in 0...SIZE )
		{
			for ( j in 0...SIZE )
			{
				var elmt = table.getTd(j, i);
				if ( snake[i][j] > 0  )
				{
					elmt.style.transition = "none";
					elmt.style.backgroundColor = Main.ColorWhite;
				}
				else if (apples[i][j] > 0)
				{
					elmt.style.transition = "background-color 0.25s";
					elmt.style.backgroundColor = Main.ColorWhiteGrey;
				}
				else
				{
					elmt.style.transition = "background-color 0.25s";
					elmt.style.backgroundColor = Main.ColorDarkGray;
				}
			}
		}
	}
	
	function init()
	{
		Console.add("Init grid: " + SIZE + "x" + SIZE, TextType.Transparent );
		Console.add("Init properties: pos, vel, score, time", TextType.Transparent );
		Console.add("Start Game", TextType.Strong );
		
		snakeHead = { x:Math.floor(SIZE / 3), y:Math.floor(SIZE * 2 / 3) };
		snakeLength = SNAKE_SIZE;
		snakeDir = Dir.Right;
		snakeLastDir = null;
		score = 0;
		frame = 0;
		vel = SNAKE_VEL;
		startTime = Timer.stamp();
		
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

		Console.add("Time: " + ( Math.round( (Timer.stamp() - startTime) * 100 )  ) / 100 + "s" );
		Console.add("Score: " + score, TextType.Strong);
		
		Console.add("   _____ ", TextType.Ascii | TextType.JumpBefore );
		Console.add("  / ____| ", TextType.Ascii );
		Console.add(" | |  __  __ _ _ __ ___   ___ ", TextType.Ascii ); 
		Console.add(" | | |_ |/ _` | '_ ` _ \\ / _ \\ ", TextType.Ascii ); 
		Console.add(" | |__| | (_| | | | | | |  __/ ", TextType.Ascii );
		Console.add("  \\_____|\\__,_|_| |_| |_|\\___| ", TextType.Ascii );           
		Console.add("   ____                        ", TextType.Ascii );
		Console.add("  / __ \\  ", TextType.Ascii );
		Console.add(" | |  | |_   _____ _ __  ", TextType.Ascii ); 
		Console.add(" | |  | \\ \\ / / _ \\ '__| ", TextType.Ascii );  
		Console.add(" | |__| |\\ V /  __/ |      ", TextType.Ascii );
		Console.add("  \\____/  \\_/ \\___|_| ", TextType.Ascii | TextType.JumpAfter );
		
		
		init();
	}
	
	function eat()
	{
		snakeLength++;
		score++;
		apples[snakeHead.x][snakeHead.y] = 0;
		
		Console.add( "Eat apple!", TextType.Italic | TextType.Transparent );
		Console.add( "Score: " + score, TextType.Strong );
	}
	
	function check()
	{
		snakeLastDir = snakeDir;
		
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
		
		snakeHead.x = (snakeHead.x<0)?(SIZE-1):(snakeHead.x>=SIZE)?0:snakeHead.x;
		snakeHead.y = (snakeHead.y<0)?(SIZE-1):(snakeHead.y>=SIZE)?0:snakeHead.y;
		
		
		if (apples[snakeHead.x][snakeHead.y] > 0)
			eat();
		
		for (i in 0...snake.length)
		{
			for (j in 0...snake[i].length)
			{
				if (snake[i][j] > 0)
					snake[i][j]--;
			}
		}
		
		
		if ( snake[snakeHead.x][snakeHead.y] > 0 )
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
		
		if ( (frame % Math.floor(APPLE_TIME * 0.5) ) == 0)
		{
			var p = getRandPos();
			while ( snake[p.x][p.y] > 0 && snakeLength < SIZE * SIZE )
				p = getRandPos();
				
			apples[p.x][p.y] = APPLE_TIME;
		}
		
		
		
		frame++;
		
		
		// VELOCITY
		//vel = Math.floor( SNAKE_VEL / Math.floor(1 + frame / VEL_DELAY) );
		//trace(frame, vel);
		if (   (frame % Math.round(VEL_DELAY * (SNAKE_VEL / vel))) == 0)
		{
			vel = Math.floor( SNAKE_VEL - (Timer.stamp() - startTime) );
			
			if ( vel < SNAKE_VEL_MAX )
				vel = SNAKE_VEL_MAX;
			else
			{
				//Console.add( "Update velocity", TextType.Transparent );
				//Console.add( "Frame time: " + (vel/1000) + "s", TextType.Transparent );
			}
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
			Console.add("Snake kill process", TextType.Transparent  );
			return;
		}
		
		check();
		draw();
		Timer.delay( upd, vel );
	}
	
}