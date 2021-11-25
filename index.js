const express = require("express");
const app = express();

var user = new Array(3);
var data = new Array(3);
var u = 0;

app.get("/", function(req,res){
    res.send("<h1>Bem-vindo ao Centro de Cadastros</h1> <p>Rotas: <br>1.Cadastrar Usuários: localhost:PORTA/cadastrar?user=NOME <br>2.Listar Usuários: localhost:PORTA/listar <br>3.Deletar Usuários: localhost:PORTA/deletar/NOME");
})

app.get("/cadastrar/", function(req,res){
    if(u < 3) {
        user[u] = req.query["user"];
        data[u] = Date();
        res.send("Usuario " + user[u] + " cadastrado as " + data[u]);
        u++;
    } else {
        res.send("Não a espaço para cadastros");
    }
})

app.get("/listar", function(req,res){
    let lista = "";
    for(let i = 0; i < 3; i++) {
        if(user[i] != undefined) {
            lista = lista + "Nome: " + user[i] + "<br>Data: " + data[i] + "<p>";
        }
    }
    res.send("Usuarios:<br>" + lista);
})

app.get("/deletar/:nome?", function(req,res){
    let nome = req.params.nome;
    for(let i = 0; i < 3; i++) {
        if(nome == user[i]) {
            res.send("Usuário " + user[i] + " foi deletado da lista de usuários")
            user[i] = undefined;
            data[i] = undefined;
            u--;
        } else if(i == 2) {
            res.send("Usuário Não Encontrado");
        }
    }
})

app.listen(process.env.PORT ?? 3000, function(erro){
    if(erro){
        console.log("Erro ao iniciar");
    } else {
        console.log("Servidor iniciado");
    }
})