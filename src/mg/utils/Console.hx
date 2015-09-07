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
	public var textUI:Element;

	var commands:Array<String>;
	
	public function new(element:Element, height:Int) 
	{
		console = element;
		console.style.backgroundColor = mg.Main.ColorDark;
		
		textUI = Browser.document.createElement("div");
		textUI.style.color = mg.Main.ColorLight;
		textUI.style.fontFamily = '"Courier New", monospace';// 'Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace';
		textUI.style.overflow = "hidden";
		textUI.style.height = height + "px";
		
		console.appendChild(textUI);
		
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
			textUI.appendChild( div );
			
			textUI.scrollTop = textUI.scrollHeight;
			//window.scrollTo(0,document.body.scrollHeight);
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