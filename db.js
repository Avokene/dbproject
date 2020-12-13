import SQLite from 'react-native-sqlite-storage';
let db=SQLite.openDatabase({name: 'testDB.db'},(res)=>{console.log('good')},(error)=>{console.log(error)});

export default db;