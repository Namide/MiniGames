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
	var gameUI:Element;
	var consoleUI:Console;
	
	public function new() 
	{
		mainUI = new Table(js.Browser.document.body, 2, 1);
		mainUI.table.style.height = "480px";
		mainUI.table.style.width = "720px";
		
		consoleUI = new Console(mainUI.getTd(0, 1), 480);
		gameUI = mainUI.getTd(0, 0);
		gameUI.style.width = "480px";
		
		INST = this;
		
		Console.add("<strong>Init Game loader</strong>", true);
		Console.add("<em>by Namide (Damien Doussaud)</em>");
		Console.add("Language: Haxe 3.1.3");
		Console.add("Build: Javascript", true);
		Console.add("All files loaded", true);
		
		
	}
	
	
}