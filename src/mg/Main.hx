package mg;
import js.Browser;
import js.html.Element;
import mg.games.Game;
import mg.utils.Console;
import mg.utils.Table;

/*@:enum
@:coreType abstract Color from String to String {
	
	var Dark = "#000";
	var Light = "#FFF";
}*/

/**
 * ...
 * @author Namide
 */

class Main 
{
	public static var INST:Main;
	
	var game:Game;
	var body:Element;
	
	var containerUI:Table;
	var mainUI:Table;
	public var gameUI:Element;
	var consoleUI:Console;
	
	static function main() 
	{
		INST = new Main();
	}
	
	function new()
	{
		// HTML
		var html = Browser.document.documentElement;
		html.style.height = "100%";
		html.style.backgroundColor = Main.ColorBlack;
		
		// BODY
		var body = Browser.document.body;
		body.style.height = "100%";
		body.style.margin = "0";
		body.style.padding = "0";
		body.style.color = Main.ColorWhite;
		
		// CENTER ALL SCREEN
		containerUI = new Table( js.Browser.document.body, 1, 1 );
		containerUI.table.style.width = "100%";
		containerUI.table.style.height = "100%";
		
		// SCREEN
		mainUI = new Table(containerUI.getTd(0,0), 2, 1);
		mainUI.table.style.margin = "auto";
		mainUI.table.style.height = "480px";
		mainUI.table.style.width = "720px";
		
		// GAME SCREEN
		gameUI = mainUI.getTd(0, 0);
		gameUI.style.width = "480px";
		
		// CONSOLE SCREEN
		consoleUI = new Console(mainUI.getTd(0, 1), 480);
		consoleUI.onReady = function() { consoleUI.onReady = null; game = new mg.games.Snake(); }
		
		
		
		
		
		
	}
	
	public static var ColorBlack:String = "#053604";
	public static var ColorDarkGray:String = "#095307";
	public static var ColorWhiteGrey:String = "#148212";
	public static var ColorWhite:String = "#47e743";// "#2fa52d"; //47e743
	
}