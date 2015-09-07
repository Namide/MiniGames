package mg.utils;

import js.Browser;
import js.html.Element;

/**
 * ...
 * @author Namide
 */
class Table
{

	public var table:Element;
	public var trs:Array<Element>;
	public var tds:Array<Array<Element>>;
	
	public function new( parent:Element, rows:Int, lines:Int ) 
	{
		table = Browser.document.createElement("table");
		table.style.width = "100%";
		table.style.height = "100%";
		
		trs = [];
		tds = [];
		
		for ( i in 0...lines )
		{
			var tr = Browser.document.createElement("tr");
			tds.push([]);
			for ( j in 0...rows )
			{
				var td = Browser.document.createElement("td");
				tr.appendChild( td );
				tds[tds.length - 1].push(td);
			}
			trs.push(tr);
			table.appendChild(tr);
		}
		
		parent.appendChild( table );
	}
	
	public function getTr(id:Int):Element
	{
		return trs[id];
	}
	
	public function getTd(trId:Int, tdId:Int):Element
	{
		return tds[trId][tdId];
	}
}