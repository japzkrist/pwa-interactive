(function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    var startx = 0,
        starty = 0;

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawStuff();
    }
    resizeCanvas();

    function drawStuff() {
        var centerX = canvas.width / 2 - 125;
        var centerY = canvas.height / 2 + 125;
        
        function randomCoord() {
            return {
                x: Math.floor(Math.random() * canvas.width),
                y: Math.floor(Math.random() * canvas.height)
            };
        }

        function rand(max) {
            return Math.floor(Math.random() * max);
        }

        function randomColor() {
            const colors = "#0000FF #FF0000 #FFFF00 #FF6600 #00FF00 #7F00FF #FF00FF".split(" "); // blue red yellow orange green purple pink
            return colors[rand(colors.length)];
        }

        const letters = "abcdefghijklmnopqrstuvwxyz0123456789";

        function randomLetter() {
            return letters.charAt(rand(letters.length));
        }
        
        function drawCircle(coords) {
            var radius = 140;
            var coord = coords;
            context.beginPath();
            context.arc(coord.x, coord.y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = randomColor();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(0,0,0,1)';
            context.stroke();
        }
        
        function drawSquare(coord) {
            const p = coord;
            context.beginPath();
            context.rect(p.x - 150, p.y - 150, 300, 300);
            context.fillStyle = randomColor();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(0,0,0,1)';
            context.stroke();
        }
        
        function drawRectangle(coord) {
            const p = coord;
            context.beginPath();
            context.rect(p.x - 180, p.y - 105, 400, 200);
            context.fillStyle = randomColor();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(0,0,0,1)';
            context.stroke();
        }
        
        function drawTriangle(coord) {
            const p = coord;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo((p.x - 150), (p.y + 300));
            context.lineTo((p.x + 150), (p.y + 300));
            context.closePath();
            context.fillStyle = randomColor();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(0,0,0,1)';
            context.stroke();
        }

        function drawLetter(coord, lete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const p = coord;
            context.beginPath();
            const letter = lete || randomLetter();
            
            context.font = "900 400px verdana";
            context.lineWidth = 3;
            context.strokeStyle = 'rgba(0,0,0,1)';
            context.strokeText(letter, p.x - 125, p.y + 150);
            context.fillStyle = randomColor();
            context.fillText(letter, p.x - 125, p.y + 150);
            context.stroke();
        }
        
        function drawShape(coord) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            coord = coord || randomCoord();
            var funs = [drawRectangle, drawCircle, drawSquare, drawLetter, drawTriangle, drawLetter, drawLetter, drawLetter];
            var rnd = rand(funs.length);
            funs[rnd](coord);
        }

        window.drawLetter = drawLetter(randomCoord(), randomLetter());

        function touch(e) {  
            playAudio("./audio/index.mp3")
            context.clearRect(0, 0, canvas.width, canvas.height);
            let rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left ;
            let y = e.clientY - rect.top ;
            drawShape({
                x: x,
                y: y
            });
        }
        
        function press(e) {
            playAudio("./audio/index.mp3")
            context.clearRect(0, 0, canvas.width, canvas.height);
            var keynum;

            if(window.event) { // IE                  
              keynum = e.keyCode;
            } else if(e.which){ // Netscape/Firefox/Opera                 
              keynum = e.which;
            } 
            var letter = String.fromCharCode(keynum);
            var coord = randomCoord();
            switch(letter.toLowerCase()) {
                case "x":
                    letter = "XAV";
                    coord = {x: startx + 100, y: starty + 100};
                    break;
                case "m":
                    letter = "MUMI";
                    coord = {x: startx + 100, y: starty + 100};
                    break;
                case "p":
                    letter = "PUPI";
                    coord = {x: startx + 100, y: starty + 100};
                    break;
            }
            
            if (e.key.length == 1) {
                drawLetter(coord, letter);
            } else {
                drawShape();
            }
        }

        function playAudio(url) {
            new Audio(url).play();
        }

        document.addEventListener('keydown', press);

        document.addEventListener('click', touch);
        
        document.addEventListener('contextmenu', function(e){

          // Stop the context menu
          e.preventDefault();
          e.stopPropagation();
          touch(e);
        });
    }

})();