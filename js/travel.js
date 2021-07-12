let areaInfli = document.querySelector('.areaInfli');
let areaSelect = document.querySelector('.areaSelect');
let pageid = document.getElementById('pageid');
let hotArea1 = document.querySelector('.hotArea1');
let hotArea2 = document.querySelector('.hotArea2');
let hotArea3 = document.querySelector('.hotArea3');
let showData = [];
let originData = [];


//API
const data = new XMLHttpRequest();
data.open('GET','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json','true');
data.send(null);

data.onload =  function(){
    let str = JSON.parse(data.responseText);   
    showData =str.result.records;
    originData = showData;
    addselect();
    pagination(showData,1)
}

//製作選單
function addselect(){
    let str = '';
    let dataLen = showData.length;
    let selectList=[];
//將地區資料push進selectList
    for(let i=0;i<dataLen;i++){
        
        selectList.push(showData[i].Zone);
        //過濾重複的地區資料
        selectList = ([...new Set(selectList)]);
    }
    for(let i=0;i<selectList.length;i++){
        str+=`<option value=${selectList[i]}>${selectList[i]}</option>`
    }
    
    areaSelect.innerHTML+=str;
}

//製作分頁
function pagination(newData,nowPage) {
    //console.log(nowPage);
    //console.log(newData);
    // 取得資料長度
    const dataTotal = newData.length;
     // 要顯示在畫面上的資料數量，預設每一頁只顯示10筆資料。
    const perpage = 10;
    const pageTotal = Math.ceil(dataTotal / perpage);
    let currentPage = nowPage;
    console.log(`全部資料頁數:${pageTotal} 每一頁顯示:${perpage}筆`);
  
    if (currentPage>pageTotal){
      currentPage=pageTotal;
    }
    console.log(currentPage);
    const minData = (currentPage*perpage)-perpage;
    const maxData = (currentPage*perpage);
    const pageData=[];
    console.log(minData);
    console.log(maxData);
    //console.log(newData);

    for(i=0;i<newData.length;i++){
        console.log(newData.length)
        if ( i >= minData && i < maxData) {
            pageData.push(newData[i]);
        }
    }

    let page ={
        pageTotal,
        dataTotal,
        currentPage,
        hasPage: currentPage > 1,
        hasNext: currentPage < pageTotal,
    }
    console.log(pageData);
    //console.log(newData);
    addInf(pageData);
    pageBtn(page);



    }


function pageBtn(page) {
    let str = '';
    const total = page.pageTotal;
    //console.log(total);
    let currentPage = parseInt(page.currentPage);
    //console.log(currentPage);
    
    if(page.hasPage) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">Prev</a></li>`;
      } else {
        str += `<li class="page-item disabled"><span class="page-link"></span></li>`;
      }
      
    for(let i =1; i<= total; i++){
        if(currentPage === i) {
            str +=`<li class="page-item active">${i}</li>`;
          } else  {
            str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
          }
        };
      
        if(page.hasNext) {
          str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">Next</a></li>`;
        } else {
            str += `<li class="page-item disabled"><span class="page-link"></span></li>`
        }
  pageid.innerHTML = str;
}
 



//篩選地區
function chooseInf(e){
    e.preventDefault();
    let showData = [];
    let newData=[];
    //console.log(showData)
    if(e.target.nodeName==='SELECT'){
        document.querySelector('.areaTittle').textContent=e.target.value;
        for(i=0;i<originData.length;i++){
            showData.push(originData[i].Zone);
             if(e.target.value=="請選擇行政區"){
                newData.push(originData[i]);
                //console.log(originData);
                }else if(e.target.value==showData[i]){
                    newData.push(originData[i]);
                    }
        
        }
    //console.log(newData);
    
    }
    
    
    pagination(newData,1);
    
    
    
}

function switchPage(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A') return;
    const page = e.target.dataset.page;
    console.log(page);
    pagination(showData, page);
    scroll(0,0);
}

//顯示內容
function addInf(e){
    //console.log(e);
    let str = '';
    let dataLen = e.length;
    for(i = 0; i<dataLen;i++){
        str+=`<li class='formContent'>
                <div class="infimg" style="background-image:url(${e[i].Picture1})">
                <h4>${e[i].Name}</h4>
                <h5>${e[i].Zone}</h5>
                </div>
                <ul class='infLi'>
                    <li class='infli-time'>
                    <p><img src='https://upload.cc/i1/2021/04/20/xV4jSB.png'>${e[i].Opentime}</p>
                    </li>
                    <li class='infli-add'>
                    <p><img src='https://upload.cc/i1/2021/04/20/Cpk2M6.png'>${e[i].Add}</p>
                    </li>
                    <ul class='infli-tel'>
                    <li><img src='https://upload.cc/i1/2021/04/20/Qv19a2.png'>${e[i].Tel}</li>
                    <li><img src='https://upload.cc/i1/2021/04/20/ze4P1U.png'>${e[i].Ticketinfo}</li>
                    </ul>
                </ul>
                
            </li>`
    }
    areaInfli.innerHTML=str;
}

//監聽
areaSelect.addEventListener('change',chooseInf,false);
pageid.addEventListener('click',switchPage,false);
