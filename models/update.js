const db = require('./conecta')

//FAZ O UPDATE DO RESULTADO

async function fazUpdate(resultFinalPrimeiroNome,resultFinalUltimoNome, id){
    const con = await db
    const [fazUp1] = await con.query(`update tb_ptts set ptts_fnme ="${resultFinalPrimeiroNome}" where ptts_code =${id};`) 
    const [fazUp2] = await con.query(`update tb_ptts set ptts_lnme ="${resultFinalUltimoNome}" where ptts_code =${id};`) 
    return console.log("Nomes Alterados com sucesso")
}

module.exports = fazUpdate

//update tb_ptts set ptts_fnme = "Wesley" where ptts_code = 379;
//update tb_ptts set ptts_lnme = "Vieira Santos" where ptts_code = 379; 