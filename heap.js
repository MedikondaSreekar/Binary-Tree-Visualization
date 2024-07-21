let swaps = [];

function swap(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function parent(index){
    return Math.floor((index - 1) / 2);
}

function leftChild(index){
    return 2 * index + 1;
}

function rightChild(index){
    return 2 * index + 2;
}

function makeHeap(arr){
    let i;
    let k;

    for(i = 1; i < arr.length; ++i)
    {
        k = i;
        while(k > 0 && arr[k] > arr[parent(k)]){
            swap(arr, parent(k), k);
            k = parent(k);
        }
    }
    return arr;
}

function reHeapifyDown(arr, length) 
{
    let index = 0;
    let bigChildIndex;
    let isHeap = false;

    while(!isHeap && leftChild(index) < length){
        if(rightChild(index) >= length){
            bigChildIndex = leftChild(index);
        }
        else if(arr[leftChild(index)] > arr[rightChild(index)]){
            bigChildIndex = leftChild(index);
        }
        else {
            bigChildIndex = rightChild(index)
        }
        if(arr[index] < arr[bigChildIndex]){
            swap.push([index, bigChildIndex]);
            console.log('reHeapifying', index, bigChildIndex);
            swap(arr, index, bigChildIndex)
            index = bigChildIndex;
        }
        else {
            isHeap = true;
        }
    }
}