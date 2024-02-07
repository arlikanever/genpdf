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
    let styles={
        fontSize: 8,
        halign: 'center',
        valign: 'middle',
        lineWidth: 0.2,lineColor: [0, 0, 0]
    }
    for(let h=0;h<2;h++){
        for(let k=1;k<=31;k++){
            if(saldoantes===false&&data[i+h]["__EMPTY_4"]){
                contador=contador+Number(data[i+h]["__EMPTY_4"])
                table.push([{
                    content:numeracion,
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                }, {
                    content:"",
                    styles:styles,
                },{
                    content:contador.toFixed(2),
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                }])
                numeracion++;
                saldoantes=true;
            }
            if(data[i+h][`__EMPTY_6`]==="ENTRADA"&&data[i+h][`__EMPTY_${6+k}`]) {
                contador=contador+Number(data[i+h][`__EMPTY_${6+k}`])
                sentrada=(sentrada+Number(data[i+h][`__EMPTY_${6+k}`]))
                table.push([{
                    content:numeracion,
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:`${k}${fecha}`,
                    styles:styles,
                },{
                    content:data[i+h][`__EMPTY_${6+k}`],
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                }, {
                    content:"",
                    styles:styles,
                },{
                    content:contador.toFixed(2),
                    styles:styles,
                },{
                    content:formi.pedidopor||"",
                    styles:styles,
                },{
                    content:formi.cargo||"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                }])
                numeracion++;
            };
            if(data[i+h][`__EMPTY_6`]==="SALIDA"&&data[i+h][`__EMPTY_${6+k}`]){
                contador=contador-Number(data[i+h][`__EMPTY_${6+k}`])
                ssalida=(ssalida+Number(data[i+h][`__EMPTY_${6+k}`]))
                //table.push([numeracion, '',``, '', `${k}${fecha}`, data[i+h][`__EMPTY_${6+k}`], contador.toFixed(2), formi.pedidopor||"", formi.cargo||"", "", ""])
                table.push([{
                    content:numeracion,
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:`${k}${fecha}`,
                    styles:styles,
                }, {
                    content:data[i+h][`__EMPTY_${6+k}`],
                    styles:styles,
                },{
                    content:contador.toFixed(2),
                    styles:styles,
                },{
                    content:formi.pedidopor||"",
                    styles:styles,
                },{
                    content:formi.cargo||"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                },{
                    content:"",
                    styles:styles,
                }])
                numeracion++;
            };
        }
    }
    styles={
        fontStyle: 'bold',
        lineColor: [0, 0, 0],
        fillColor: '#AED6F1', 
        fontSize: 8,
        halign: 'center',
        valign: 'middle',
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
            styles:{...styles,lineWidth: 0.2,lineColor: [0, 0, 0]}
        },{
            content:"",
            styles:styles
        },{
            content:ssalida,
            styles:{...styles,lineWidth: 0.2,lineColor: [0, 0, 0]}
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