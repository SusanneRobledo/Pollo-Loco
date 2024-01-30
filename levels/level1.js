let level1;

function initLevel() {
  level1 = new Level(
    generateEnemies(100),
    generateClouds(),
    [
      new CollectableCoin(860, 90),
      new CollectableCoin(930, 70),
      new CollectableCoin(1540, 70),
      new CollectableCoin(2150, 80),
      new CollectableCoin(2220, 55),
      new CollectableCoin(2820, 70),
      new CollectableCoin(3250, 65),
      new CollectableCoin(3320, 80),
      new CollectableCoin(3950, 75),
      new CollectableCoin(4025, 55),
    ],
    [
      new CollectableBottle(
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        750,
        358
      ),
      new CollectableBottle(
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
        1300,
        358
      ),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 1690, 90),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 1750, 110),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 2455, 95),

      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 2500, 130),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 2540, 105),
      new CollectableBottle(
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
        3200,
        358
      ),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 3710, 125),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 3760, 95),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 3815, 115),
      new CollectableBottle(
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        4000,
        358
      ),
      new CollectableBottle(
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
        4500,
        358
      ),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 5010, 90),
      new CollectableBottle("img/6_salsa_bottle/salsa_bottle.png", 5080, 110),

      new CollectableBottle(
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        6020,
        360
      ),
      new CollectableBottle(
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
        6100,
        355
      ),
    ],
    generateBackgroundObjects()
  );
}

function generateEnemies(numChickens) {
  const enemies = [];
  let startX = 500;

  for (let i = 0; i < numChickens; i++) {
    const chicken = new Chicken();
    chicken.x = startX;
    startX += generateRandomXDistance(50, 800);
    enemies.push(chicken);
  }

  enemies.push(new Endboss());
  return enemies;
}

function generateBackgroundObjects() {
  const backgroundObjects = [];
  const layers = ["air", "3_third_layer", "2_second_layer", "1_first_layer"];
  let startOffset = -719;

  for (let i = 0; i < layers.length; i++) {
    for (let j = 0; j < 11; j++) {
      const imageName = `img/5_background/layers/${layers[i]}/${
        (j % 2) + 1
      }.png`;
      const positionX = startOffset + 719 * j;
      backgroundObjects.push(new BackgroundObject(imageName, positionX));
    }
  }
  return backgroundObjects;
}

function generateClouds() {
  const clouds = [];
  let startX = 100; // Startposition auf der x-Achse
  setStoppableInterval(() => {
    const yPosition = Math.floor(Math.random() * (40 - 10 + 1)) + 10; // Zufällige y-Position zwischen 10 und 40
    const xDistance = generateRandomXDistance(900, 1200);
    const imageName = `img/5_background/layers/4_clouds/${
      (clouds.length % 2) + 1
    }.png`;
    clouds.push(new Cloud(startX, yPosition, imageName));
    startX += xDistance; // Erhöht die x-Position für die nächste Wolke
  }, 200);

  return clouds;
}

function generateRandomXDistance(min, max) {
  const minDistance = min;
  const maxDistance = max;
  return (
    Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance
  );
}
