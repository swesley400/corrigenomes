//IMPORTANTANDO CONEXÃO
const conectadb = require('../models/conecta')

//FAZ O UPDATE
const fazUp = require('../models/update')

async function iniciaPrograma(){
    //PEGA O ULTIMO ID DO BANCO
    const con = conectadb
    const [pegaUltimo] = await con.query("SELECT MAX(ptts_code) as ultimoid FROM tb_ptts;") 
    const esperaUltimo = await pegaUltimo
    const ultimo = esperaUltimo[0].ultimoid
    
    //INICIA LOOP A PARTIR DO PRIMEIRO ID DO BANCO ATÉ O ULTIMO VALOR
    for (init = 1; init <= ultimo ; init++ ){
        async function nomeRetorna(){
        //RETORNA CADA PACIENTE NA ONDE O INDICE DESSE PACIENTE É O VALOR DE INICIO DO LOOP  
        const [result]  = await con.query(`select ptts_fnme, ptts_lnme, ptts_code from tb_ptts where ptts_code =${init}`)
        const nome = await result
        const nomesJson = nome
        let primeiroNome = nomesJson[0].ptts_fnme
        let ultimoNome = nomesJson[0].ptts_lnme
        var ptts_id = nomesJson[0].ptts_code
        console.log("Sou um test " +ptts_id)
        console.log("No banco de dados está: ", primeiroNome + ' '+ ultimoNome  )

            //PEGA O PRIMEIRO NOME E TRANSFORMA EM UM ARRAY SEPARANDO POR ESPAÇO

            let transformaemArray =  primeiroNome.split(" ")
            let retorna = transformaemArray

            let junta = ''
            let junta2 = ''
            let junta3 = ''
            let casoExtra= ''

            // INICIA O LOOP QUE VAI VERIFICAR SE ULTIMO NOME É COLADO

            for(i=0; i<retorna.length; i++){
                
                numero = retorna.length*1-1
                casoExtra = retorna[numero]

                //CASO ULTIMO NOME ESTEJA GENERICO
                if(ultimoNome == "Generic"){

                    let algo = primeiroNome.replace(retorna[numero],"")
                    fazUp(algo, casoExtra, ptts_id)

                }
                
                //CASO SÓ REPITA O ULTIMO NOME
                if (casoExtra == ultimoNome ){
                    let algo = primeiroNome.replace(retorna[numero],"")
                    fazUp(algo, casoExtra, ptts_id)
                }

                junta =  junta + retorna[i]
                if (retorna.length <= 3){
                    //EXECESSÃO CASO O  NOME TENHA SÓ TRÊS NOMES
                    junta2 = junta2 + retorna[i+1]
                    junta3 = junta3 + ' ' + retorna[i+1]
                }
                else{
                    ////EXECESSÃO CASO O  NOME TENHA 4 OU MAIS NOMES
                    junta2 = junta2 + retorna[i+2]
                    junta3 = junta3 + ' ' + retorna[i+2]
                }
              
               
                if(junta2 == ultimoNome){
               
                    console.log(`Sou igual: variavel junta: ${junta2} variavel: ${ultimoNome}` )
                    let result1 = primeiroNome.replace(junta3,"")
                    let result2 = junta3.replace(" ","")
                    //console.log("Sou um resultado :", init)
                    //MANDA PARA A FUNCAO OS PARAMETROS DE TROCA
                    fazUp(result1, result2, ptts_id)
                    break
                }
                else{
                    console.log("Nome não conferem")
                    return
                }

            }


        }

        nomeRetorna()

    }

}

iniciaPrograma()
