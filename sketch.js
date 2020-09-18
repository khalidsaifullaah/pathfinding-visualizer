let started = false;
let algo = null
let startButton;
let screen;
let graph;
let rows;
let cols;
let resolution = 30;
let openSet = [];
let closedSet = [];
let source;
let destination;
let shortestPath = [];
let w;
let h;
srcORdstClicked = false

function Node(i, j) {
    this.i = i;
    this.j = j;
    this.x = this.i * resolution;
    this.y = this.j * resolution;
    this.r = resolution - 1;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.obstacle = false;
    this.parent = undefined;
    this.neighbors = []

    this.show = (color) => {
        console.log(color)
        let x = this.x;
        let y = this.y;
        let r = this.r;
        // if (this.obstacle) {
        //     fill(128, 128, 128);
        // }
        // else {
        //     fill(color);
        // }
        fill(color);
        stroke(244, 248, 252);
        strokeWeight(2);
        rect(x, y, r, r);
    }
    this.addNeighbor = () => {

        let i = this.i;
        let j = this.j;
        //Orthogonal neighbors
        if (i > 0) this.neighbors.push(graph[i - 1][j]);
        if (i < cols - 1) this.neighbors.push(graph[i + 1][j]);
        if (j > 0) this.neighbors.push(graph[i][j - 1]);
        if (j < rows - 1) this.neighbors.push(graph[i][j + 1]);
        //Diagonal Neighbors
        // if (i > 0 && j > 0) this.neighbors.push(graph[i - 1][j - 1]);
        // if (i < cols - 1 && j < rows - 1) this.neighbors.push(graph[i + 1][j + 1]);
        // if (i > 0 && j < rows - 1) this.neighbors.push(graph[i - 1][j + 1]);
        // if (i < cols - 1 && j > 0) this.neighbors.push(graph[i + 1][j - 1]);
    }
    this.clicked = () => {
        if(srcORdstClicked){
            this.show(color(87, 50, 168))
            srcORdstClicked = false
        }
        else if(!this.obstacle){
            this.obstacle = true;
            this.show(color(128, 128, 128));
        }
        // else{
        //     this.obstacle = false;
        //     this.show(color(255,255,255));
        // }

    }
}

function twoDArray(rows, cols) {
    let arrays = new Array(cols);
    for (let i = 0; i < arrays.length; i++) {
        arrays[i] = new Array(rows)
    }
    return arrays;
}

function windowResized() {
    centerCanvas();
}

function centerCanvas() {
    var x = ((windowWidth) - width) / 2;
    var y = ((windowHeight - (windowHeight * 0.15)) - height) / 2;
    screen.position(x, y);
}

function setup() {
    screen = createCanvas(windowWidth - (windowHeight * 0.05), windowHeight - (windowHeight * 0.15));
    screen.parent("sketch01");
    centerCanvas();
    rows = floor(height / resolution);
    cols = floor(width / resolution);
    w = width / cols;
    h = height / rows;
    graph = twoDArray(rows, cols);
    startButton = document.getElementById("startButton")
    startButton.onclick = start;
    // startButton.parent("sketch01");
    // creating the graph 
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            graph[i][j] = new Node(i, j);
        }
    }
    // determining neighbors of each vertices
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            graph[i][j].addNeighbor();
        }
    }
    // determining source and destination from the vertices
    source = graph[cols - 20][rows - 10];
    destination = graph[cols - 10][rows - 10];
    //making sure source and destination aren't obstacls;
    source.obstacle = false;
    destination.obstacle = false;

    BFS_initialize()

    background(255);
    // revealing the canvas on screen
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            graph[i][j].show(255);
        }
    }
    source.show(color(87, 50, 168));
    destination.show(color(140, 68, 20));
    noLoop();
    console.log(openSet)
}

function A_star_initialize() {
    openSet.push(source);
}

function BFS_initialize() {
    openSet.push(source);
    closedSet.push(source)

}
function draw() {
    if (started) {
        // Algorithm for A* Search
        if (algo == "A* Search") {
            if (openSet.length > 0) {
                current = lowestFscoreNode();
                if (current == destination) {
                    noLoop();
                    console.log("We're Done!")
                }
                //removing the "current" vertex from openSet and adding it to closedSet
                var removeIndex = openSet.map(function (item) { return item; }).indexOf(current);
                openSet.splice(removeIndex, 1);
                closedSet.push(current);

                for (neighbor of current.neighbors) {
                    if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
                        gScore = current.g + 1;
                        let isGbetter = false;
                        if (openSet.includes(neighbor)) {
                            if (gScore < neighbor.g) {
                                neighbor.g = gScore;
                                isGbetter = true;
                            }
                        }
                        else {
                            neighbor.g = gScore;
                            isGbetter = true;
                            openSet.push(neighbor);
                        }
                        if (isGbetter) {
                            neighbor.h = heuristic(neighbor, destination);
                            neighbor.f = neighbor.g + neighbor.h;
                            neighbor.parent = current;
                        }
                    }
                }

            }
            else {
                console.log('no solution');
                noLoop();
                return;
            }
        }

        // Algorithm for Breadth First Search
        if (algo == "Breadth First Search") {
            if (openSet.length > 0) {
                current = openSet[0]
                if (current == destination) {
                    noLoop();
                    console.log("We're Done!")
                }

                //removing the "current" vertex from openSet and adding it to closedSet
                var removeIndex = openSet.map(function (item) { return item; }).indexOf(current);
                openSet.splice(removeIndex, 1);
                console.log(openSet)
                for (neighbor of current.neighbors) {
                    if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
                        openSet.push(neighbor);
                        closedSet.push(neighbor);
                        neighbor.parent = current
                    }
                }

            }
            else {
                console.log('no solution');
                noLoop();
                return;
            }
        }

        // Algorithm for Depth First Search
        if (algo == "Depth First Search") {
            if (openSet.length > 0) {
                console.log(openSet)
                current = openSet[openSet.length - 1]
                if (current == destination) {
                    noLoop();
                    console.log("We're Done!")
                }

                //removing the "current" vertex from openSet and adding it to closedSet
                var removeIndex = openSet.map(function (item) { return item; }).indexOf(current);
                openSet.splice(removeIndex, 1);
                console.log(openSet)
                for (neighbor of current.neighbors) {
                    if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
                        openSet.push(neighbor);
                        closedSet.push(neighbor);
                        neighbor.parent = current
                    }
                }

            }
            else {
                console.log('no solution');
                noLoop();
                return;
            }
        }

        background(255);

        // revealing the canvas on screen
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                graph[i][j].show(255);
            }
        }

        //Coloring the visited, unvisited vertices and the shortest path
        for (Node of openSet) {
            Node.show(color(45, 196, 129));
        }
        for (Node of closedSet) {
            Node.show(color(255, 0, 0, 50));
        }
        //initialize shortestPath array first
        shortestPath = [];
        let temp = current;
        shortestPath.push(temp);
        while (temp.parent) {
            shortestPath.push(temp.parent);
            temp = temp.parent;
        }
        // for (Node of shortestPath) {
        //     Node.show(color(246, 196, 76));
        // }
        noFill();
        stroke(255, 0, 200);
        strokeWeight(4);
        beginShape();
        for (path of shortestPath) {
            vertex(path.i * resolution + resolution / 2, path.j * resolution + resolution / 2);
        }
        endShape();
        source.show(color(87, 50, 168));
        destination.show(color(140, 68, 20));
    }

}

function dropdown(event) {
    algo = event.target.text
    let startButton = document.getElementById('startButton')
    startButton.innerHTML = `Start ${algo}`
}

function start() {
    if (algo === null) {
        let startButton = document.getElementById('startButton')
        startButton.innerHTML = `Pick An Algorithm!`
        return
    }

    started = true;
    startButton.disabled = true
    loop();
}

function mouseDragged() {
    console.log("clicked");
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            //let d = dist(mouseX, mouseY, graph[i][j].x, graph[i][j].y);
            if (mouseX >= graph[i][j].x && mouseX <= graph[i][j].x + graph[i][j].r && mouseY >= graph[i][j].y && mouseY <= graph[i][j].y + graph[i][j].r) {
                console.log("in IF");
                if(graph[i][j] != source && graph[i][j] != destination){
                    graph[i][j].clicked();
                }
                else{
                    console.log("HERE")
                    srcORdstClicked = true
                    // change prev source's color
                    source.show(255)
                    source = graph[i][j]
                    // source.show(color(87, 50, 168))
                    graph[i][j].clicked();
                }
            }
        }
    }
}

function mousePressed() {
    console.log("clicked2");
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            //let d = dist(mouseX, mouseY, graph[i][j].x, graph[i][j].y);
            if (mouseX >= graph[i][j].x && mouseX <= graph[i][j].x + graph[i][j].r && mouseY >= graph[i][j].y && mouseY <= graph[i][j].y + graph[i][j].r) {
                console.log("in IF");
                if(graph[i][j] != source && graph[i][j] != destination){
                    graph[i][j].clicked();
                }
            }
        }
    }
}

function heuristic(node, goal) {
    //euclidean distance
    // dx = abs(node.x - goal.x);
    // dy = abs(node.y - goal.y);
    // return 1 * sqrt(dx * dx + dy * dy);

    //Manhattan distance
    dx = abs(node.x - goal.x);
    dy = abs(node.y - goal.y);
    return 1 * (dx + dy);


    // let d = dist(a.i, a.j, b.i, b.j);
    // let d = abs(a.i - b.i) + abs(a.j - b.j);
    // return d;
}

function lowestFscoreNode() {
    let minNode = openSet[0];
    for (Node of openSet) {
        if (Node.f < minNode.f) {
            minNode = Node;
        }
    }
    return minNode;
}

