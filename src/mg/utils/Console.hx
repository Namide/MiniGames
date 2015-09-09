package mg.utils;
import haxe.Timer;
import js.Browser;
import js.html.Element;

@:enum abstract TextType(Int) from Int to Int
{
    var Big         	= value(0);
    var Small        	= value(1);
    var Strong        	= value(2);
    var Italic          = value(3);
    var Transparent  	= value(4);
	var Ascii		  	= value(5);
	var JumpBefore	  	= value(6);
	var JumpAfter	  	= value(7);

    static inline function value(index:Int) return 1 << index;
}


/**
 * ...
 * @author Namide
 */
class Console
{
	public static var INST:Console;
	
	public var console:Element;
	public var textUI:Element;

	public var isWriting:Bool = false;
	
	var commands:Array<String>;
	
	public var onReady:Void->Void;
	
	public function new(element:Element, height:Int) 
	{
		console = element;
		console.style.backgroundColor = mg.Main.ColorBlack;
		
		textUI = Browser.document.createElement("div");
		textUI.style.color = mg.Main.ColorWhite;
		textUI.style.fontFamily = '"Courier New", monospace';// 'Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace';
		textUI.style.overflow = "hidden";
		textUI.style.height = height + "px";
		textUI.style.fontSize = 14 + "px";
		
		console.appendChild(textUI);
		
		commands = [];
		INST = this;
		
		Console.add("namide.com mini games v1.0", TextType.Transparent | TextType.Italic | TextType.JumpBefore);
		Console.add("©2015 by Namide (Damien Doussaud)", TextType.Transparent | TextType.Italic);
		Console.add("Language: Haxe 3.1.3", TextType.Transparent);
		Console.add("Build: Javascript", TextType.Transparent | TextType.JumpAfter);
		//Console.add("All files loaded", TextType.Transparent | TextType.Italic);
		
		Timer.delay( write, 1000 );
	}
	
	function addText(text:String, type:Int)
	{
		if ( type & TextType.Strong != 0 )
			text = "<strong>" + text + "</strong>";
		
		if ( type & TextType.Italic != 0 )
			text = "<em>" + text + "</em>";
		
		if ( type & TextType.Small != 0 )
			text = "<small>" + text + "</small>";
		
		if ( type & TextType.Big != 0 )
			text = '<span style="font-size:large">' + text + "</span>";
			
		if ( type & TextType.Transparent != 0 )
			text = '<span style="opacity:0.5">' + text + "</span>";
		
		
		if ( type & TextType.Ascii != 0 )
			text = "<pre style='margin:0;padding:0;'>" + text + "</pre>";
		
		if ( type & TextType.JumpBefore != 0 )
			text = "<br>" + text;
		
		if ( type & TextType.JumpAfter != 0 )
			text += "<br><br>";
		
		isWriting = true;
		commands.push( text );
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
		else if ( isWriting && onReady != null )
		{
			isWriting = false;
			onReady();
		}
		
		Timer.delay( write, 100 );
	}
	
	static public inline function add(text:String, type:Int = 0)
	{
		INST.addText(text, type);
	}
	
	/*static public function ascii(text:String, jump:Bool = false)
	{
		Console.add("<pre style='margin:0;padding:0;'>"+text+"</pre>", jump);
	}*/
}