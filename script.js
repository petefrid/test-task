jQuery(function($){
	$( document ).ready(function() {
		$('#check-text').on(' click', function(e) {
			var text = $('#input-text').val();
			$('#output .original-text').html(text);

			var i = text.length;
			if (i == 0) {
				analizeText(i, text);
			} else {
				$('#output .results').append("<br>Teksts netika ievadīts!");
			}

			$('.input-box').hide();
			$('#output .original-text').html(text);
			$('.output-box').show();
		});

		var autoInput = {
			"empty" : "",
			"numbers" : "111 111",
			"a" : "aaaaaaa",
			"ab" : "ababababababababaaaaaaaaaaaaaaaaaaaaaaaa",
			"text" : "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
		};

		$('#auto-check').on(' click', function(e) {
			$('.input-box').hide();
			$.each(autoInput, function(index, value){
				var i = value.length;
				var passed = '';
				if (i > 0) {
					analizeText(i, value, index);
				} else {
					if (index == 'empty') { passed = ' Auto test - Passed'; }
					$('#output .results').append("<br>Teksts netika ievadīts!" + passed + "<br>");
				}
				$('.output-box').show();
			});
		});



		function isLetter(c) {
			return c.toLowerCase() != c.toUpperCase();
		}
		function analizeText(i, text, test = '') {
			var containsLetters = false;
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
			var passed = '';
			if (test != '') {
				passed = ' Auto test - Failed';
				if (test == 'empty') {
					passed = ' Auto test - Failed';
				} else if (test == 'numbers' && count == 0) {
					passed = ' Auto test - Passed';
				} else if (test == 'a' && count == 7 && chars['a'] == 7) {
					passed = ' Auto test - Passed';
				} else if (test == 'ab' && count == 40 && chars['a'] == 32 && chars['b'] == 8) {
					passed = ' Auto test - Passed';
				} else if (test == 'text' && count == 2432) {
					passed = ' Auto test - Passed';
					correct = {
						'a' : 161,
						'b' : 40,
						'c' : 76,
						'd' : 87,
						'e' : 308,
						'f' : 51,
						'g' : 45,
						'h' : 86,
						'i' : 190,
						'j' : 4,
						'k' : 24,
						'l' : 107,
						'm' : 101,
						'n' : 161,
						'o' : 197,
						'p' : 62,
						'r' : 171,
						's' : 178,
						't' : 199,
						'u' : 83,
						'v' : 24,
						'w' : 28,
						'x' : 7,
						'y' : 42
					};
					$.each(correct, function(letter, repeated){
						if (chars[letter] != repeated) { passed = ' Auto test - Failed'; }
					});
				}
			}
			output = output + '<br>Tekstā sastopami ' + count + ' burti' + passed + '<br>';
			output = output + '<div style="display: inline-block; width: 35px; text-align: center;">Burts</div> : <div style="display: inline-block; width: 75px; text-align: center;">Sastopams</div> : <div style="display: inline-block; width: 80px; text-align: center;">Procentuāli</div><br>';
			$.each(charsUsed, function(index, value){
				var perc = parseFloat(chars[value]) / count * 100.0;
				output = output + '<div style="display: inline-block; width: 35px; text-align: center;">' + value + '</div>' + " : " + '<div style="display: inline-block; width: 75px; text-align: center;">' + chars[value] + '</div>' + " : " + '<div style="display: inline-block; width: 80px; text-align: right;">' + perc.toFixed(2) + '%</div><br>';
			});
			if (count == 0) {
				output = "<br>Teksts nesatur burtus!" + passed + "<br>";
			}
			$('#output .results').append(output);
			return;
		}
	});
});
