let input;
let tree;

function reset() {
    d3.selectAll('svg').remove();
}

function TreeAndArray() {
    reset();
    let inputText = document.getElementById("array-input");
    if (inputText.value !== '') {
        input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
        tree = new Tree();
        tree.createTree(input);
        // CreateArray(input, 10, 10, 50, 50);
        document.getElementById('visual-title').innerHTML = "Binary Tree";
        document.getElementById('instructions').innerHTML = "Each node has at most two children, referred to as the left child and the right child.";
    }
}

function heapify(arr, n, i, isMaxHeap) {
    let extreme = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (isMaxHeap) {
        if (left < n && arr[left] > arr[extreme]) extreme = left;
        if (right < n && arr[right] > arr[extreme]) extreme = right;
    } else {
        if (left < n && arr[left] < arr[extreme]) extreme = left;
        if (right < n && arr[right] < arr[extreme]) extreme = right;
    }

    if (extreme !== i) {
        [arr[i], arr[extreme]] = [arr[extreme], arr[i]];
        heapify(arr, n, extreme, isMaxHeap);
    }
}

function makeHeap(arr, isMaxHeap = true) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i, isMaxHeap);
}

function maxHeap() {
    reset();
    let inputText = document.getElementById("array-input");
    if (inputText.value !== '') {
        input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
        makeHeap(input, true);
        tree = new Tree();
        tree.createHeap(input, true);
        CreateArray(input, 10, 10, 50, 50);
        document.getElementById('visual-title').innerHTML = "Max-Heap Binary Tree";
        document.getElementById('instructions').innerHTML = "Parent's value is always greater than or equal to the value of its children";
    }
}

function minHeap() {
    reset();
    let inputText = document.getElementById("array-input");
    if (inputText.value !== '') {
        input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
        makeHeap(input, false);
        tree = new Tree();
        tree.createHeap(input, false);
        CreateArray(input, 10, 10, 50, 50);
        document.getElementById('visual-title').innerHTML = "Min-Heap Binary Tree";
        document.getElementById('instructions').innerHTML = "Parent's value is always less than or equal to the value of its children";
    }
}

function createBinarySearchTree() {
    reset();
    let inputText = document.getElementById("array-input");
    if (inputText.value !== '') {
        input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
        input.sort((a, b) => a - b);
        tree = new Tree();
        tree.createBinarySearchTree(input);
        CreateArray(input, 10, 10, 50, 50);
        document.getElementById('visual-title').innerHTML = "Binary Search Tree";
        document.getElementById('instructions').innerHTML = "The input data sorted and arranged into a Binary Search Tree";
    }
}


input = [10, 20, 60, 30, 70, 40, 50];
document.getElementById("array-input").value = input.join(',');
TreeAndArray();