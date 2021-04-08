const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');

const port = 5000;
const app = express();
const router = express.Router();

const isAuth = (req, res, next) => {
    console.log(req.session.cookie);
    if(req.session.isAuth) next();
    else res.status(404).send('Erro');
}

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
});

app.post('/login', async (req, res) => {
    const user = req.body;
    try{
        let conn = await pool.getConnection();
        const rows = await conn.query('SELECT email, role, password FROM usuarios WHERE email=? AND role=?', [user.email, user.role]);
        const isMatch = await bcrypt.compare(user.password, rows[0].password);
        if(isMatch){
            req.session.isAuth = true;
            req.session.role = rows[0].role;
            res.send({auth:'ok', role:rows[0].role});
        }else{
            res.send('Usuario não encontrado');    
        }
    }catch(e){
        res.send('Usuario não encontrado');
    }
});



app.listen(port, () => 
    console.log(`Server running on port: ${port}`));