package mg;
import js.Browser;
import js.html.Element;

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
	static var MAIN:Main;
	
	var game:mg.games.Game;
	var body:Element;
	
	static function main() 
	{
		MAIN = new Main();
	}
	
	function new()
	{
		var html = Browser.document.documentElement;
		html.style.height = "100%";
		html.style.backgroundColor = Main.ColorBlack;
		
		var body = Browser.document.body;
		body.style.height = "100%";
		body.style.margin = "0";
		body.style.padding = "0";
		body.style.color = Main.ColorWhite;
		
		game = new mg.games.Snake();
	}
	
	public inline static var ColorBlack:String = "#053604";
	public inline static var ColorDarkGray:String = "#095307";
	public inline static var ColorWhiteGrey:String = "#148212";
	public inline static var ColorWhite:String = "#47e743";// "#2fa52d"; //47e743
	
}