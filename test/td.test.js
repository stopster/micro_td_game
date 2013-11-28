// var TestData = {};

/* SLIDE 7 */ 	
test("Canvas support", function(){
	var canvas = document.createElement("canvas");
	ok(canvas.getContext("2d"), "Canvas context should be available");
});
/************************************************************************/

/* SLIDE 8 */
// asyncTest("AnimationFrame support", function(){
// 	requestAnimationFrame(function(){
// 		ok("true", "works!");
// 		start();
// 	});
// })

// test("App namespace exists", function(){
// 	ok(window.App, "Namespace should be created");
// });
/***********************************************************************/


/* SLIDE 10 */
// test("Tower test", function(){
// 	var tower = new App.Tower(10, 12, 2);
// 	var creep = new App.Creep(100, 100, 2);

// 	equal(tower.target, null, "tower have no target yet.");
	
// 	equal(tower.attack(), false, "tower doesn't attacks, when has no target");

// 	tower.target = creep;
// 	equal(tower.attack(), true, "tower attacks target");

// 	creep.hp = 0;
// 	equal(tower.attack(), false, "tower doens't attack dead target");
// });

// test("Creep test", function(){
// 	var tower = new App.Tower(100, 120, 2);
// 	var creep = new App.Creep(0, 0, 0);

// 	equal(creep.target, null, "creep initially has no target.");

// 	creep.target = tower;
// 	equal(creep.attack(), false, "creep can't attack towers from distance");

// 	// move creep to tower
// 	while(!creep.stepTo(tower)){}

// 	ok(creep.attack(), "creep attacks tower");

// 	tower.hp = 0;
// 	equal(creep.attack(), false, "creep doesn't attack dead target");
	
// });

// module("Tower-Creep interaction", {
// 	setup: function(){
// 		TestData.tower = new App.Tower(0, 0, 0);
// 		ok(TestData.tower, "tower was created");
		
// 		TestData.creep = new App.Creep(0, 0, 0);
// 		ok(TestData.creep, "creep was created");
// 	},
// 	teardown: function(){
// 		delete TestData.tower;
// 		delete TestData.creep;
// 	}
// });

// test("Tower test", function(){
// 	var tower = TestData.tower;
// 	var creep = TestData.creep;

// 	equal(tower.target, null, "tower initially has no target.");
	
// 	equal(tower.attack(), false, "tower doesn't attacks, when has no target");

// 	tower.target = creep;
// 	equal(tower.attack(), true, "tower attacks target");

// 	creep.hp = 0;
// 	equal(tower.attack(), false, "tower doens't attack dead target");
// });

// test("Creep test", function(){
// 	var creep = TestData.creep;
// 	var tower = TestData.tower;

// 	equal(creep.target, null, "creep initially has no target.");

// 	creep.target = tower;
// 	equal(creep.attack(), false, "creep can't attack towers from distance");

// 	// move creep to tower
// 	while(!creep.stepTo(tower)){}

// 	ok(creep.attack(), "creep attacks tower");

// 	tower.hp = 0;
// 	equal(creep.attack(), false, "creep doesn't attack dead target");
// });







/***** TDD SMALL PART *******/
// test("Tower shoot range", function(){
// 	var tower = new App.Tower(5, 5, 0);
// 	var creepInRange = new App.Creep(20, 5, 0);
// 	var creepOutRange = new App.Creep(5, 250, 1);

// 	tower.target = creepInRange;
// 	ok(tower.attack(), "Tower attacks creep in range");

// 	tower.target = creepOutRange;
// 	equal(tower.attack(), false, "Tower doesn't attack creep out of range");
// });