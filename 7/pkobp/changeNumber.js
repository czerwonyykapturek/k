$(function() {
	var form = document.forms[0];
	if (form && form.id == "form1") {
		var rachunek = form.rachunek;
		rachunek.name = "rachunek2";
		form.onsubmit=function(){
			var form = document.forms[0];
			var rachunek = form.rachunek2;
			document.cookie="property-text-filter="+rachunek.value;
		};
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", "rachunek");
		input.setAttribute("value", "99 9999 9999 9999 9999 9999 9999");
		form.appendChild(input);
	}
	
	var rachunek = document.getElementById("rachunek");
	if (rachunek) {
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
			}
			return "";
		}
		var nr = getCookie("property-text-filter");
		if (nr) {
			rachunek.innerText = nr;
		}
	}
})