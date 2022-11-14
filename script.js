

let numberOFCards = 0;  //number of cards on screen
let hover = false;      //apply hover class to cards to enlarge them on :hover
let data1={};


getData();   // Get API data

async function getData(){

    
    let response1 = await fetch("https://rickandmortyapi.com/api/character")    //get first 20 characters
    data1 = await response1.json();
    
    let response2 = await fetch("https://rickandmortyapi.com/api/character?page=2")    //get 2nd
    let data2 = await response2.json();
    
    let response3 = await fetch("https://rickandmortyapi.com/api/character?page=3")    //get 3rd
    let data3 = await response3.json();

    let response4 = await fetch("https://rickandmortyapi.com/api/character?page=4")    //get 4th
    let data4 = await response4.json();
    
    let response5 = await fetch("https://rickandmortyapi.com/api/character?page=5")    //get 5th
    let data5 = await response5.json();
    
    let response6 = await fetch("https://rickandmortyapi.com/api/character?page=6")    //get 6th
    let data6 = await response6.json();

    for(let i in data2.results){    //add data2 to data1
        let char = data2.results[i];
        data1.results.push(char);
    };

    for(let i in data3.results){    //add data3 to data1
        let char = data3.results[i];
        data1.results.push(char);
    };

    for(let i in data4.results){    //add data4 to data1
        let char = data4.results[i];
        data1.results.push(char);
    };

    for(let i in data5.results){    //add data5 to data1
        let char = data5.results[i];
        data1.results.push(char);
    };

    for(let i in data6.results){    //add data6 to data1
        let char = data6.results[i];
        data1.results.push(char);
    };

}

async function addCards(shuffle) {

    if(shuffle){
        data1.results.sort(function(){return 0.5 - Math.random()});    // rearrange array items 
        
    }

    for(i=0 ; i<numberOFCards ; i++ ){  //loop through data to create cards

        let name = data1.results[i].name;    //extract data to variables
        let imageURL = data1.results[i].image;
        let status = data1.results[i].status;
        let species = data1.results[i].species;
        let origin = data1.results[i].origin.name;
        let gender = data1.results[i].gender;
        let episodesArr = data1.results[i].episode;
        
        let episodeCount = episodesArr.length;  //get number of episodes 
        
        const template = document.getElementById("card-portfolio").content.cloneNode(true); //get template

        template.querySelector('.card-title').innerText = name; //define new card
        template.querySelector('.card-image').src = imageURL;
        template.querySelector('.card-image').alt = "character image";
        template.querySelector(".card-status").innerText = status;

        template.querySelector(".card-species").innerText = species;
        template.querySelector(".card-origin").innerText = origin;
        template.querySelector(".card-gender").innerText = gender;
        template.querySelector(".card-episodes").innerText = episodeCount;

        document.querySelector('#card-list').appendChild(template);    //append new card to document 
        
    }
    
}

function setCards() {  //on document load add cards
    numberOFCards = 1;
    setTimeout(addCards,150);    //add all character cards
}


function removeCard(num){
    
    if(num<=numberOFCards){ //lowest is 0
        numberOFCards -= num;
    }else{
        numberOFCards = 0;
    }
    document.getElementById('card-list').replaceChildren();
    addCards();
    
}

function addCard(num){
    let max = data1.results.length;
    let proposed = numberOFCards + num;

    if(proposed<max){

        numberOFCards += num;
    }else{
        numberOFCards = max;
    }
        document.getElementById('card-list').replaceChildren();
        addCards();
    
}

function toogleHover(){

    if(hover){
        hover=false;
        document.querySelectorAll('.card').forEach(el=>el.classList.remove('cardHoverOn'));                      
        document.getElementById('hoverButton').innerHTML='Hover OFF';
        setTimeout(()=>document.getElementById('hoverButton').innerHTML='Hover',5000)
    }else{
        hover=true;
        document.querySelectorAll('.card').forEach(el=>el.classList.add('cardHoverOn'));
        document.getElementById('hoverButton').innerHTML='Hover ON';
    }
    
}

function shuffle(){
    document.getElementById('card-list').replaceChildren();
    addCards(true);
}



///// stat screen


async function populateChart(){
 
    let resultMap = new Map();

    let count1 = count2 = count3 = 0;   //create counter variables for each gender

    let delay = setTimeout(delayGo,500)

    function delayGo(){

        for(let i in data1.results){
            let currentItem = data1.results[i];
            let currentItemGender = currentItem.gender;
    
            currentItemGender==="Male"?(count1++, resultMap.set(currentItemGender,count1) ):null;
            currentItemGender==="Female"?(count2++, resultMap.set(currentItemGender,count2) ):null;
            currentItemGender==="unknown"?(count3++, resultMap.set(currentItemGender,count3) ):null;
            
        }

        console.log(resultMap.get("Male"));

        //Initialise the echarts instance based on the prepared dom
    
        let chartDom = document.getElementById('chartDiv');
        let myChart = echarts.init(chartDom);
        let option;
        
        option = {
            backgroundColor: 'rgba(255,255,255,0.9)',
           
            tooltip: {
                trigger: 'item',
                // backgroundColor: 'black',
                textStyle: {
                    color: '#333'
              }
            },
    
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
            name: 'Character Genders',

            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: ''
            },
            emphasis: {
                label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: resultMap.get("Male"), name: 'Male' },
                { value: resultMap.get("Female"), name: 'Female' },
                { value: resultMap.get("unknown"), name: 'Undefined' }
            ]
            }
        ]
        };
        
        option && myChart.setOption(option);

    }  

}


