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
		html.style.backgroundColor = Main.ColorDark;
		
		var body = Browser.document.body;
		body.style.height = "100%";
		body.style.margin = "0";
		body.style.padding = "0";
		body.style.color = Main.ColorLight;
		
		game = new mg.games.Snake();
	}
	
	public inline static var ColorDark:String = "#000";
	public inline static var ColorLight:String = "#FFF";
	
}