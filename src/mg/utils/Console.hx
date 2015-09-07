package mg.utils;
import haxe.Timer;
import js.Browser;
import js.html.Element;

/**
 * ...
 * @author Namide
 */
class Console
{
	static var INST:Console;
	
	public var console:Element;

	var commands:Array<String>;
	
	public function new(element:Element) 
	{
		console = element;
		console.style.backgroundColor = mg.Main.ColorDark;
		console.style.color = mg.Main.ColorLight;
		console.style.fontFamily = '"Courier New", monospace';// 'Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace';
		commands = [];
		INST = this;
		
		Timer.delay( write, 1000 );
	}
	
	function addText(text:String, jump:Bool = false)
	{
		commands.push( text + ((jump)?"<br><br>":"") );
	}
	
	function write()
	{
		if ( this != INST )
			return;
		
		
		if ( commands.length > 0 )
		{
			var text = commands.shift();
			var div = Browser.document.createElement("div");
			div.innerHTML = text;
			console.appendChild( div );
		}
		
		Timer.delay( write, 100 );
	}
	
	static public inline function add(text:String, jump:Bool = false)
	{
		INST.addText(text, jump);
	}
	
	static public function ascii(text:String, jump:Bool = false)
	{
		Console.add("<pre style='margin:0;padding:0;'>"+text+"</pre>", jump);
	}
}