var a = [4,1,4,2,10,1,2,5,7,2,3,6,8,9,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
var n = a.length;

var b = a;
var s = 0;
var main_container = document.getElementById("main-container");

main_container.style.minHeight = window.innerHeight*0.8+"px";

function init(){
    s = 0
    b = a;
    for (var i = 0 ; i<n ; i++){
        s += b[i];
    }
    for (var i = 0 ; i<n ; i++){
        b[i] /= s;
    }
    
    main_container.innerHTML = "";
    for (var i = 0 ;  i<n ;i++){
        var mch = window.innerHeight*20;    
        main_container.innerHTML += "<div class='bar' style='height:"+(b[i]*mch)+"px;' ></div>";
    }
    
}

var sorting_speed = 300;

var stopping_condition = false;


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

///////// SELECTION SORT //////////

async function selection_sort(a,n){
    stopping_condition = false;
    var childs = main_container.children;
    for (var i = 0 ; i<n && stopping_condition==false ; i++){
        var min = i;
        var prev = i;
        childs[i].style.backgroundColor = "green";
        for (var j = i+1 ; j<n && stopping_condition==false ; j++){
            childs[j].style.backgroundColor = "blue";
            if (a[j]<a[min]){
                min = j;
                childs[j].style.backgroundColor = "red";
                if (prev!=i) childs[prev].style.backgroundColor = "aqua";
                prev = j;
            }
            await sleep(sorting_speed);
            if (childs[j].style.backgroundColor != "red"){
                childs[j].style.backgroundColor = "aqua";
            }
        }
        var tmp = a[i];
        a[i] = a[min];
        a[min] = tmp;
        childs[i].style.height = (a[i]*10000)+"px";
        childs[min].style.height = (a[min]*10000)+"px";
        childs[i].style.backgroundColor = "aqua";
        childs[min].style.backgroundColor = "aqua";
        var temp = a
    }
}

///////// BUBBLE SORT //////////

async function bubble_sort(a,n){
    stopping_condition = false;
    var childs = main_container.children;
    for (var i = 0 ; i<n && stopping_condition==false ; i++){
        var m = i;  // min element
        childs[m].style.backgroundColor = "red";
        for (var j = i+1; j<n && stopping_condition==false; j++){
            childs[j].style.backgroundColor = "green";
            childs[m].style.backgroundColor = "red";
            if (a[j]<a[m]){
                var tmp = a[j];
                a[j] = a[m];
                a[m] = tmp;
                childs[i].style.height = (a[i]*10000)+"px";
                childs[j].style.height = (a[j]*10000)+"px";
                
            }
            await sleep(sorting_speed);
            childs[j].style.backgroundColor = "aqua";
        }
        childs[i].style.backgroundColor = "aqua";
    }
}

///////// INSERTION SORT //////////

async function insertion_sort(a,n){
    var childs = main_container.children;
    stopping_condition = false;
    for (var i = n-2 ; i>=0 && stopping_condition==false ; i--){
        for (var j = i ; j<n-1 && stopping_condition==false ; j++){
            childs[j].style.backgroundColor = "green";
            childs[j+1].style.backgroundColor = "green";
            if (a[j]>a[j+1]){
                var tmp = a[j];
                a[j] = a[j+1];
                a[j+1] = tmp;
                tmp = childs[j].style.height;
                childs[j].style.height = childs[j+1].style.height;
                childs[j+1].style.height = tmp;
            }
            await sleep(sorting_speed);
            childs[j].style.backgroundColor = "aqua";
            childs[j+1].style.backgroundColor = "aqua";
        }
    }
}

///////// MERGE SORT //////////

function merge_sort(a,l,r){
    stopping_condition = false;
    

    async function _merge_sort(a,l, r){
        if (l >= r) return; 
        var n = r-l+1;
        var m = Math.floor(n/2);
        await _merge_sort(a,l, l+m-1);
        if (stopping_condition==true) return;
        await _merge_sort(a,l+m, r);
        if (stopping_condition==true) return;
        await sleep(100);
        await merge(a,l,l+m-1,l+m,r);
        if (stopping_condition==true) return;
    }
    
    async function merge(a,l1,r1,l2,r2){
        var n = r1-l1+1;
        var m = r2-l2+1;
        var i = l1;
        var j = l2;
        var k = []
        var childs = main_container.children;
        childs[l1].style.backgroundColor = "red";
        childs[l2].style.backgroundColor = "red";
        var x = l1;
        while (i<=r1 && j<=r2 && stopping_condition==false){
            if (a[i]<a[j]){
                k.push(a[i]);
                childs[i].style.backgroundColor = "green";
                childs[i+1].style.backgroundColor = "red";
                childs[x].style.height = childs[i].style.height;
                x++;
                i++;
            }
            else{
                k.push(a[j]);
                childs[j].style.backgroundColor = "green";
                if (j+1<=r2) childs[j+1].style.backgroundColor = "red";
                childs[x].style.height = childs[j].style.height;
                x++;
                j++;    
            }
            await sleep(sorting_speed);
            if (stopping_condition==true) return;
        }
        while (i<=r1 && stopping_condition==false){
            k.push(a[i]);
            childs[i].style.backgroundColor = "green";
            childs[i+1].style.backgroundColor = "red";
            childs[x].style.height = childs[i].style.height;
            x++ ;
            i++;
            await sleep(sorting_speed);
            if (stopping_condition==true) return;
        }
        while (j<=r2 && stopping_condition==false){
            k.push(a[j]);
            childs[j].style.backgroundColor = "green";
            if (j+1<=r2) childs[j+1].style.backgroundColor = "red";
            childs[x].style.height = childs[j].style.height;
            x++;
            j++;
            await sleep(sorting_speed);
            if (stopping_condition==true) return;
        }
        for (var i = l1 ; i<=r2 ; i++){
            a[i] = k[i-l1];
            childs[i].style.height = (a[i]*10000)+"px";
            childs[i].style.backgroundColor = "aqua";
            if (stopping_condition==true) return;
        }
        for (var i = l1 ; i<=r2 ; i++){
            childs[i].style.backgroundColor = "aqua";
            if (stopping_condition==true) return;
        }
        if (stopping_condition==true) return;
    }

    _merge_sort(a,l,r);

}




/////////// QUICK SORT ///////////

async function quick_sort(a,n){
    stopping_condition = false;
    await _quick_sort(a,0,n-1);
}

async function _quick_sort(a,l,r){
    if (l>=r) return;
    var childs = main_container.children;
    var pivot = r;
    var i = l;
    var j = r-1;
    childs[r].style.backgroundColor = "red";
    childs[i].style.backgroundColor = "green";
    // childs[j].style.backgroundColor = "green";
    
    while (i<=j && stopping_condition==false){
        childs[i].style.backgroundColor = "green";
        // childs[j].style.backgroundColor = "green";
        await sleep(sorting_speed);
        if (a[i]>=a[pivot]){
            var tmp = a[i];
            a[i] = a[pivot];
            a[pivot] = tmp;
            tmp = childs[i].style.height;
            childs[i].style.height = childs[pivot].style.height;
            childs[pivot].style.height = tmp;

            tmp = a[j];
            a[j] = a[i];
            a[i] = tmp;
            tmp = childs[j].style.height;
            childs[j].style.height = childs[i].style.height;
            childs[i].style.height = tmp;

            childs[pivot].style.backgroundColor = "aqua";
            pivot = j;
            j--;
            childs[pivot].style.backgroundColor = 'red';

        }
        else {
            childs[i].style.backgroundColor = "aqua";
            i++ ;
        }
        if (stopping_condition==true) return;
    }
    childs[pivot].style.backgroundColor = "aqua";
    await _quick_sort(a, l, pivot-1);
    if (stopping_condition==true) return;
    await _quick_sort(a, pivot+1, r);
}


/////////// HEAP SORT ///////////

async function heap_sort(a,n){

}

///////////////////////////////////////////////  UTILS  ///////////////////////////////////////////////////

function stop(){
    stopping_condition = true;
    for (var i = 0 ; i<n ; i++){
        main_container.children[i].style.backgroundColor = "aqua";
    }
}

function max(a,b){
    if (a>b) return a;
    return b;
}

function set_speed(){
    sorting_speed = max(10,parseInt(document.getElementById("speed").value)) ;
}

function generate_new_array(){
    a = [];
    n = 60;
    for (var i = 0 ; i<n ; i++){
        a.push(Math.floor((Math.random()+0.001)*100));
    }
    init();
}

generate_new_array();