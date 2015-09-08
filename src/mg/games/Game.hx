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
	
	var containerUI:Table;
	var mainUI:Table;
	var gameUI:Element;
	var consoleUI:Console;
	
	public function new() 
	{
		containerUI = new Table( js.Browser.document.body, 1, 1 );
		containerUI.table.style.width = "100%";
		containerUI.table.style.height = "100%";
		
		mainUI = new Table(containerUI.getTd(0,0), 2, 1);
		mainUI.table.style.margin = "auto";
		mainUI.table.style.height = "480px";
		mainUI.table.style.width = "720px";
		
		consoleUI = new Console(mainUI.getTd(0, 1), 480);
		gameUI = mainUI.getTd(0, 0);
		gameUI.style.width = "480px";
		
		INST = this;
		
		Console.add("Init Game loader", TextType.Transparent | TextType.Italic);
		Console.add("by Namide (Damien Doussaud)", TextType.Transparent | TextType.Italic);
		Console.add("Language: Haxe 3.1.3", TextType.Transparent);
		Console.add("Build: Javascript", TextType.Transparent);
		Console.add("All files loaded", TextType.Transparent | TextType.Italic);
		
		
	}
	
	
}