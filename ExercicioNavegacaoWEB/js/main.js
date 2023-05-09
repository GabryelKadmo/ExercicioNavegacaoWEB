//array de objetos
var list = [
  {"desc":"rice", "amount": "1", "value":"5.40"},
  {"desc":"beer", "amount": "12", "value":"1.99"},
  {"desc":"meat", "amount": "1", "value":"15.50"}
];

function getTotal(list){
  var total = 0;
  //faz o somomatorio de todos os itens do carrinho
  for (var key in list){
    total += list[key].value * list[key].amount;
  }
  document.getElementById('totalValue').innerHTML= formatValue(total);

}

function setList(list){
  var table = '<thead><tr><th>Descrição</th><th>Quantidade</th><th>Valor</th><th>Ações</th> </tr></thead><tbody>';
  for(var key in list){
    table += '<tr><td>'+ formatDesc(list[key].desc)+'</td><td>'+list[key].amount+'</td><td>'+formatValue(list[key].value)+'</td>'
              +'<td><i onclick="setUpdate('+key+');" class="glyphicon glyphicon-edit"></i> | <i onclick="deleteData('+key+');" class="glyphicon glyphicon-trash"></i></td></tr>';
  }
  table += '</tbody>';
  document.getElementById('listTable').innerHTML = table;
  getTotal(list);
  saveListStorage(list);
}

//tratando a descricao
function formatDesc(desc){
  var str = desc.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}
//tratando o valor
function formatValue(value){
  var str = parseFloat(value).toFixed(2)+"";
  str = str.replace(".", ",");
  str = "R$ "+str;
  return str;
}

function formatAmount(amount){
  return parseInt(amount);
}

function addData(){
  if(!validation()){
    return;
  }
  var desc = document.getElementById('desc').value;
  var amount = document.getElementById('amount').value;
  var value = document.getElementById('value').value;

  list.unshift({"desc":desc, "amount": amount, "value":value});
  setList(list);

}

function setUpdate(id){
  var obj = list[id];
  document.getElementById('desc').value = obj.desc;
  document.getElementById('amount').value = obj.amount;
  document.getElementById('value').value = obj.value;

  document.getElementById('btnUpdate').style.display="inline-block";
  document.getElementById('btnAdd').style.display="none";

  document.getElementById('inputIDUpdate').innerHTML = '<input type="hidden" id="idUpdate" name="idUpdate" value="'+id+'">';
}

function resetForm(){
  document.getElementById('errors').style.display="none";
  //apaga o conteudo de cada campo
  document.getElementById('desc').value = "";
  document.getElementById('amount').value = "";
  document.getElementById('value').value = "";
  //oculta os botoes de edicao e mostra o de adicao
  document.getElementById('btnUpdate').style.display="none";
  document.getElementById('btnAdd').style.display="inline-block";
  document.getElementById('inputIDUpdate').innerHTML="";
}

function updateData(){
  if(!validation()){
    return;
  }
  var id =document.getElementById('idUpdate').value;
  var desc = document.getElementById('desc').value;
  var amount = document.getElementById('amount').value;
  var value = document.getElementById('value').value;

  list[id] = {"desc": desc, "amount": amount, "value": value};
  resetForm();
  setList(list);
}

function deleteData(id){
  if(confirm("Tem certeza que pretende apagar este item #"+id+"?")){
    if(id === list.length - 1){
      list.pop();
    }else if (id === 0){
      list.shift();
    }else {
      var arrAuxIni = list.slice(0,id);
      var arrAuxEnd = list.slice(id + 1);
      list = arrAuxIni.concat(arrAuxEnd);
    }
    setList(list);
  }
}

function validation(){
  var desc = document.getElementById('desc').value;
  var amount = document.getElementById('amount').value;
  var value = document.getElementById('value').value;
  var errors = "";

  if(desc=== ""){
    errors += '<p>Fill out Description</p>';
  }
  if(amount=== ""){
    errors += '<p>Fill out amount</p>';
  }else if(amount != parseInt(amount)){
    errors += '<p>Fill invalid amount</p>';
  }
  if(value ===""){
    errors += '<p>Fill out value</p>';
  }else if(value != parseFloat(value) ){
    errors += '<p>Fill invalid value</p>';
  }

    if(errors != ""){
      document.getElementById('errors').style.display="inline-block";
      document.getElementById('errors').innerHTML = '<h3>Error: </h3>'+errors;
      return 0;
    }else {
      document.getElementById('errors').style.display="none";
      return 1;
    }
}

function deleteList(){
  if(confirm("Deseja apagar tudo?")){
    list = [];
    setList(list);
  }
}

function saveListStorage(list){
  var jsonStr = JSON.stringify(list);
  localStorage.setItem("list", jsonStr);
}

function initListStorage(){
  var testList = localStorage.getItem('list');
  if(testList){
    list = JSON.parse(testList);
  }
  setList(list);
}

initListStorage();
