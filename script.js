jQuery(function($){
	$( document ).ready(function() {
		$('#check-text').on(' click', function(e) {
			console.log('testing');
			var text = $('#input-text').val();
			$('#output .original-text').html(text);

			var i = text.length;
			if (i == 0) {
				var output = "Teksts netika ievadīts!";
			} else {
				var count = 0;
				var chars = {};
				var charsUsed = [];
				var output = "";
				while (i--) {
					if ( isLetter(text.charAt(i)) ) {
						count++;
						if (text.charAt(i).toLowerCase() in chars) {
							chars[text.charAt(i).toLowerCase()]++;
						} else {
							charsUsed.push(text.charAt(i).toLowerCase());
							chars[text.charAt(i).toLowerCase()] = 1;
						}
					}
				}
				charsUsed.sort();
				output = output + '<br>Tekstā sastopami ' + count + ' burti<br>';
				output = output + '<div style="display: inline-block; width: 35px; text-align: center;">Burts</div> : <div style="display: inline-block; width: 75px; text-align: center;">Sastopams</div> : <div style="display: inline-block; width: 80px; text-align: center;">Procentuāli</div><br>';
				$.each(charsUsed, function(index, value){
					var perc = parseFloat(chars[value]) / count * 100.0;
					output = output + '<div style="display: inline-block; width: 35px; text-align: center;">' + value + '</div>' + " : " + '<div style="display: inline-block; width: 75px; text-align: center;">' + chars[value] + '</div>' + " : " + '<div style="display: inline-block; width: 80px; text-align: right;">' + perc.toFixed(2) + '%</div><br>';
				});
				if (output == '') {
					output = "Teksts nesatur burtus!";
				}
			}

			$('.input-box').hide();
			$('#output .original-text').html(text);
			$('#output .results').html(output);
			$('.output-box').show();
		});
	});
});

function isLetter(c) {
	return c.toLowerCase() != c.toUpperCase();
}
