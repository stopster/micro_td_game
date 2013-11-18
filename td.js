(function(ctx, width, height, size, A, B, maxTowers, maxCreeps, startGold, towerCost, creepBounty){
	var dx = (B[0] - A[0])/10, dy = (B[1] - A[1])/10, towers = [], toBuild = [], creeps = [], lastUpdated = 0, gameRunning = true;
	var tower = function(x, y){
		return {update: function(){
					var closerIndex = 0;
					var closer = creeps.reduce(function(p, c, i){
						if(Math.sqrt(Math.abs(x - c.x) + Math.abs(y - c.y)) > Math.sqrt(Math.abs(x - p.x) + Math.abs(y - p.y))){
							closerIndex = i;
							return p;
						} else {
							return c;
						}
					}, {x: A[0], y: A[1]});
					if(closer.x + size >x && closer.y + size > y){
						this.dead = true;
						return;
					}
					closer.hp -= 10;
					closer.dead = closer.hp - 1 <= 0? true: false;
					ctx.fillStyle = "red";
					ctx.fillRect(x, y, size, size);
					ctx.moveTo(x, y);
					ctx.stroke();
					ctx.lineTo(closer.x, closer.y);
				}};
	};
	var creep = function(x, y){
		return {hp: 200, x: x, y: y, update: function(){
			if(this.dead){
				return;
			}
			x = x + (Math.random()*size + (B[0] > x? size: -size)/100)/5; x = x>0? x: 1; x = x + size<width? x: width - size - 1;
			y = y + (Math.random()*size + (B[1] > y? size: -size)/100)/5; y = y>0? y: 1; y = y + size<height? y: height - size - 1;
			this.x = x;
			this.y = y;
			ctx.fillStyle = "green";
			ctx.fillRect(x, y, size, size);
		}};
	};
	// test creeps
	creeps.push(creep(A[0], A[1]));
	creeps.push(creep(A[0], A[1]));
	creeps.push(creep(A[0], A[1]));
	creeps.push(creep(A[0], A[1]));
	creeps.push(creep(A[0], A[1]));
	window.requestAnimationFrame(function gameLoop(time){

		if(time - lastUpdated > 100){
			ctx.clearRect(0, 0, width, height);
			for(i=0, ii = creeps.length; i<ii; i++){
				creeps[i].update();
				gameRunning = creeps[i].x + 1.2*size >= B[0] && creeps[i].y + 1.2*size >= B[1]? false: true;
			}
			for(var i=0, ii=toBuild.length; i<ii && ii<=maxTowers; i++){
				towers.push(tower(toBuild[i][0], toBuild[i][1]));
			}
			toBuild = [];
			for(i = 0, ii = towers.length; i<ii; i++){
				towers[i].update();
			}
			for(i=0, ii=towers.length; i<ii; i++){
				// towers[i].dead && towers = [].concat(towers.slice(0, i))
			}
			lastUpdated = time;
		}
		if(gameRunning){
			window.requestAnimationFrame(gameLoop);
		} else {
			alert("you lost");
		}
	});
	document.getElementById("canvas").addEventListener("click", function(e){
		toBuild.push([e.offsetX, e.offsetY]);
	});
})(document.getElementById("canvas").getContext("2d"), 300, 300, 20, [0, 0], [300, 300], 5, 20, 200, 100, 50);