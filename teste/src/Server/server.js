const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const port = 5000;
const app = express();
const router = express.Router();

const isAuth = (req, res, next) => {
    console.log(req.session.cookie);
    if(req.session.isAuth) next();
    else res.status(404).send('Erro');
}

var mailer = nodemailer.createTransport(sgTransport({
    auth:{api_key:""}
}));

const options = {
    host: '127.0.0.1', 
    user:'root', 
    password: 'beirute',
    database:'login',
    createDatabaseTable: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
};
const pool = mariadb.createPool({
    host: '127.0.0.1', 
    user:'root', 
    password: 'beirute',
    database:'login'
});
const chamadosPool = mariadb.createPool({
    host: '127.0.0.1', 
    user:'root', 
    password: 'beirute',
    database:'chamados'
})

const sessionStore = new MySQLStore(options);

app.use(session({
    secret:'key',
    resave:false,
    saveUninitialized: false,
    store:sessionStore
}));
app.use(bodyParser.json());

app.post('/user', async (req, res) => {
    const user = req.body
    const hashedPass = await bcrypt.hash(user.password, 12);
    let conn = await pool.getConnection();
    try{
        const qry = await conn.query("INSERT INTO usuarios (nome, email, password, telefone, role) values(?, ?, ?, ?, ?)", 
            [user.nome, user.email, hashedPass, user.telefone, user.role]);
        res.status(200).send('Cadastrado');
    }catch(e){
        console.log(e);
        res.status(200).json({erro:e.errno});
    }
    if(conn) await conn.end();
});

app.post('/login', async (req, res) => {
    const user = req.body;
    let conn = await pool.getConnection();
    try{
        const rows = await conn.query('SELECT email, role, password, nome FROM usuarios WHERE email=? AND role=?', [user.email, user.role]);
        const isMatch = await bcrypt.compare(user.password, rows[0].password);
        if(isMatch){
            // req.session.isAuth = true;
            // req.session.role = rows[0].role;
            res.send({
                auth:'ok', 
                role:rows[0].role, 
                email:rows[0].email, 
                nome:rows[0].nome
            });
        }else res.send('Usuario não encontrado');    
    }catch(e){ res.send('Usuario não encontrado'); }
    if(conn) await conn.end();
});

app.post('/recover', async(req, res) => {
    const mail = req.body.email;
    let conn = await pool.getConnection();
    try{
        let qry = await conn.query('SELECT email FROM usuarios WHERE email = "' +mail+ '"');
        const result = qry.splice(qry['meta'])[0].email 
        if(result == mail){
            const newPass = await bcrypt.hash("asdf", 12);
            qry = await conn.query('UPDATE usuarios set password = ? where email ="'+result+'"', [newPass]);
            mailer.sendMail({
                to:'',
                from:'',
                subject:'Reset de Senha',
                html:'<h1> Sua nova senha é <b>asdf</b> <br /> por favor altere após acessar </h1>'
            })
            .then(console.log('mail sent'))
            .catch(e => console.log(e));
        }}
    catch(e){console.log('err'+e)}
});

app.get('/chamados', async(req, res) => {
    let conn = await chamadosPool.getConnection();
    try{
        let qry = await conn.query('SELECT * FROM chamados');
        // console.log(qry);
        res.send(qry.splice(qry['meta']));
    }catch(e){ console.log(e) }
    if(conn) await conn.end();
});

app.post('/chamados', async(req, res) => {
    const chamado = req.body
    let conn = await chamadosPool.getConnection();
    try{
        //codigo, titulo, descritivo, prioridade, status
        let qry = await conn.query('INSERT INTO chamados (descricao, gravidade, tipo, emailUser) values(?,?,?,?)', 
        [chamado.desc, chamado.gravidade, chamado.tipo, chamado.email]);
    }catch(e){ console.log(e); }
    if(conn) await conn.end();
});

app.patch('/chamados', async(req, res) => {
    const chamado = req.body;
    let conn = await chamadosPool.getConnection();
    console.log(chamado);
    if(chamado.descricao){
        let qry = await conn.query('update chamados set descricao = ? where id = ?', [chamado.descricao, chamado.id]);
        console.log('update decricao');
        res.send('200 ok');
    }else{
    try{
        console.log('update status');
        let qry = await conn.query('update chamados set isCompleted = "true", atendidoPor=?, atendidoEm=CURRENT_TIMESTAMP() where id = ?', [chamado.analista, chamado.id]);
        res.send('200 ok');
    } catch(e){console.log(e);}
    }
});

app.post('/chamadosUser', async(req, res) => {
    const user = req.body
    let conn = await chamadosPool.getConnection();
    try{
        let qry = await conn.query('SELECT * FROM chamados where emailUser = ?', [user.id]);
        const chamados = qry.splice(qry['meta'])
        res.send(chamados);
    } catch(e){console.log(e);}
});

app.post('/updateDados', async(req, res) => {
    const email = req.body.email
    let conn = await pool.getConnection();
    try{
        if(req.body.password){
            const newPass = await bcrypt.hash(req.body.password, 12);
            let qry = await conn.query('UPDATE usuarios SET password = ? WHERE email="'+email+'"', [newPass]);
        }
        else{
            let qry = await conn.query('UPDATE usuarios SET nome = ?, telefone = ? WHERE email="'+email+'"', [req.body.nome, req.body.telefone]);
        }
    }catch(e) {console.log(e)}
});

app.listen(port, () => 
    console.log(`Server running on port: ${port}`));