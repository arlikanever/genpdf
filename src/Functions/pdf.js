import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
export function arrayTable(i,data,formi){
    let table=[]
    let contador=0;
    let numeracion=1;
    let sentrada=0;
    let ssalida=0;
    let saldoantes=false;
    const fecha=moment(formi.fechai).format("/MM/YYYY")
    for(let h=0;h<2;h++){
        for(let k=1;k<=31;k++){
            //console.log(`__EMPTY_${6+k}`)
            if(saldoantes===false&&data[i+h]["__EMPTY_4"]){
                contador=contador+Number(data[i+h]["__EMPTY_4"])
                table.push([numeracion, '',"","","", '', contador.toFixed(2), "", "", "", ""])
                numeracion++;
                saldoantes=true;
            }
            if(data[i+h][`__EMPTY_6`]==="ENTRADA"&&data[i+h][`__EMPTY_${6+k}`]) {
                contador=contador+Number(data[i+h][`__EMPTY_${6+k}`])
                sentrada=(sentrada+Number(data[i+h][`__EMPTY_${6+k}`]))
                table.push([numeracion, '',`${k}${fecha}`, data[i+h][`__EMPTY_${6+k}`], ``, '', contador.toFixed(2), formi.pedidopor||"", formi.cargo||"", "", ""])
                numeracion++;
            };
            if(data[i+h][`__EMPTY_6`]==="SALIDA"&&data[i+h][`__EMPTY_${6+k}`]){
                contador=contador-Number(data[i+h][`__EMPTY_${6+k}`])
                ssalida=(ssalida+Number(data[i+h][`__EMPTY_${6+k}`]))
                table.push([numeracion, '',``, '', `${k}${fecha}`, data[i+h][`__EMPTY_${6+k}`], contador.toFixed(2), formi.pedidopor||"", formi.cargo||"", "", ""])
                numeracion++;
            };
        }
    }
    let styles={
        fontStyle: 'bold',
        lineColor: [0, 0, 0],
        fillColor: '#AED6F1', 
    }
    table.push(
        [{
            content:"",
            styles:styles
        },{
            content:"",
            styles:styles
        },{
            content:"",
            styles:styles
        },{
            content:sentrada,
            styles:styles
        },{
            content:"",
            styles:styles
        },{
            content:ssalida,
            styles:styles
        },{
            content:"",
            styles:styles
        },{
            content:"",
            styles:styles
        },{
            content:"",
            styles:styles
        },{
            content:"",
            styles:styles
        },{
            content:"",
            styles:styles
        }]
    )
    return table;
}

export function page(){

}

function pdfTable(){

}