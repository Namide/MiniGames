package mg.games;

import js.html.Element;
import mg.utils.Console;
import mg.utils.Table;

/**
 * ...
 * @author Namide
 */
class Game
{
	static var INST:Game;
	
	var mainUI:Table;
	var gameUI:Table;
	var consoleUI:Console;
	
	public function new() 
	{
		mainUI = new Table(js.Browser.document.body, 2, 1);
		consoleUI = new Console(mainUI.getTd(0, 1));
		INST = this;
		
		Console.add("<strong>Init Game loader</strong>", true);
		Console.add("<em>by Namide (Damien Doussaud)</em>");
		Console.add("Language: Haxe 3.1.3");
		Console.add("Build: Javascript", true);
		Console.add("All files loaded", true);
		
		
	}
	
	
}