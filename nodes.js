const regFill = "#006400";
const highlightFill = "lightblue";
const regFillText = "white";
const highlightFillText = "black";
const xSpacing = 250;
const ySpacing = 120; 
const radius = 35;

function Node(value, index, depth, cx, cy) {
    this.value = value;
    this.index = index;
    this.depth = depth;
    this.radius = radius;
    this.cx = cx;
    this.cy = cy;
    this.left = null;
    this.right = null;
    this.fill = regFill;
    this.highlighted = false;
}

function Tree() {
    this.nodes = [];
    this.data = [];

    this.addNode = function(node) {
        this.data.push(node);
    }

    this.createTree = function(arr, isHeap = false, isMaxHeap = true) {
        let treeContainer = CreateContainer("binary-tree", arr);
        let start = treeContainer.attr("width") / 2;

        for (let i = 0; i < arr.length; i++) {
            let depth = Math.floor(Math.log2(i + 1));
            let node = new Node(arr[i], i, depth);
            
            if (i === 0) {
                node.cx = start;
                node.cy = radius + 20;
            } else {
                let parentIndex = Math.floor((i - 1) / 2);
                let parentNode = this.data[parentIndex];
                node.cy = parentNode.cy + ySpacing;
                
                if (i % 2 === 1) { // Left child
                    node.cx = parentNode.cx - xSpacing / (depth + 1);
                } else { // Right child
                    node.cx = parentNode.cx + xSpacing / (depth + 1);
                }

                treeContainer.append("line")
                    .attr("x1", parentNode.cx)
                    .attr("y1", parentNode.cy)
                    .attr("x2", node.cx)
                    .attr("y2", node.cy)
                    .attr("stroke", "black");
            }
            
            this.addNode(node);
        }

        let fillColor = regFill;
        if (isHeap) {
            fillColor = isMaxHeap ? "#FF6347" : "#4682B4";
        }

        treeContainer.selectAll("circle")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("cx", d => d.cx)
            .attr("cy", d => d.cy)
            .attr("r", radius)
            .attr("fill", fillColor);

        treeContainer.selectAll("text")
            .data(this.data)
            .enter()
            .append("text")
            .attr("x", d => d.cx)
            .attr("y", d => d.cy)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(d => d.value)
            .attr("fill", regFillText)
            .attr("font-size", "14px");
    }

    this.createBinarySearchTree = function(arr) {
        this.createTree(arr);
    }

    this.createHeap = function(arr, isMaxHeap) {
        this.createTree(arr, true, isMaxHeap);
    }
}

function CreateContainer(id, arr) {
    let depth = Math.ceil(Math.log2(arr.length + 1));
    let width = Math.max(arr.length * 100, Math.pow(2, depth) * 100);
    let height = depth * 150;

    d3.select(`#${id}`).select("svg").remove(); // Remove existing SVG

    return d3.select(`#${id}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
}

function CreateArray(arr, x, y, width, height) {
    let arrayContainer = d3.select("#array-visual")
        .append("svg")
        .attr("width", arr.length * 60)
        .attr("height", 100);

    let arrayData = arr.map((value, i) => ({
        x: x + i * 60,
        y: y,
        width: width,
        height: height,
        value: value
    }));

    arrayContainer.selectAll("rect")
        .data(arrayData)
        .enter()
        .append("rect")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("fill", regFill);

    arrayContainer.selectAll("text")
        .data(arrayData)
        .enter()
        .append("text")
        .attr("x", d => d.x + d.width / 2)
        .attr("y", d => d.y + d.height / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.value)
        .attr("fill", regFillText);
}