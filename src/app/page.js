"use client"

import { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { arrayTable } from "@/Functions/pdf";
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default function Home() {
  const [data, setData] = useState([]);
  const [formi,setFormi]=useState({});

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames.find(sheet => sheet === "11.1.Mov_Alm");
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setData(jsonData.filter((object) =>  object.__EMPTY_6==="ENTRADA"||object.__EMPTY_6 === "SALIDA"))
    };
    reader.readAsArrayBuffer(file);
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(data,(data.length/2))
    if(data.length<1) return;
    if(data.length%2!==0) alert("Los datos son incorrectos....");
    const doc = new jsPDF('landscape');
    let page=1;
    const textoFecha = `DEL ${moment(formi.fechai).format('D')} AL ${moment(formi.fechaf).format('D [DE] MMMM [DEL] YYYY')}`.toUpperCase()
    for (let i = 0; i < (data.length); i=i+2) {
      let arr=arrayTable(i,data,formi)
      console.log(i)
      if(arr.length>0){
        if(page>1) doc.addPage();
        // Centrar el texto
        const text = "CONTROL DE MATERIALES / INSUMOS";        
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textX = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(text, textX, 10);
        let styles={fontStyle: 'bold' ,cellWidth: 50,fontSize: 8 }
        doc.autoTable({
          columnWidths: [20, 100],
          body:[
            [
              {
                content:"OBRA",
                styles:styles
              },{
                colSpan:2,
                content:formi.obra,
                styles:{fontSize: 8},
              }],
            [{
              content:"ENTIDAD EJECUTORA",
              styles: styles
            },{
              colSpan:2,
              content:formi.uejecutora,
              styles:{fontSize: 8},
            }],
            [{
              content:"MODALIDAD DE EJECUCION",
              styles: styles
            },{colSpan:2,content:formi.modejecucion,styles:{fontSize: 8},}],
            [{
              content:"ALMACENERO DE OBRA",
              styles: styles
            },{content:formi.almacenero,styles:{fontSize: 8},},{
              content:textoFecha || "",
              styles:{
                cellWidth:75,
                lineWidth: 0.5, // Grosor del borde
                lineColor: [0, 0, 0],
                halign: 'center',
                valign: 'middle',
                fontSize: 8,
              }
            }]
          ],
          fillColor: 'transparent',
        });
        styles={
          halign: 'center',
          valign: 'middle',
          fontSize: 8,
        }
        //console.log(data[i][1])
        doc.autoTable({
          body:[
            [ {
                rowSpan:2,
                content:"MATERIAL/INSUMO: "+data[i]["__EMPTY"],
                styles:{
                  fontStyle: 'bold',
                  lineWidth: 0.5, // Grosor del borde
                  lineColor: [0, 0, 0],
                  halign: 'center',
                  valign: 'middle',
                  fontSize: 8,
                }
              },
              {
                rowSpan:2,
                content:"",
                styles:{
                  cellWidth:15,
                }
              },
              {
                content:"UNIDAD",
                styles:{
                  fontStyle: 'bold',
                  lineWidth: 0.5, // Grosor del borde
                  lineColor: [0, 0, 0],
                  halign: 'center',
                  valign: 'middle',
                  fontSize: 8,
                }
              },
              {
                content:"CODIGO",
                styles:{
                  fontStyle: 'bold',
                  lineWidth: 0.5, // Grosor del borde
                  lineColor: [0, 0, 0],
                  halign: 'center',
                  valign: 'middle',
                  fontSize: 8,
                }
              }
            ],
            [{
              content:data[i]["__EMPTY_3"],
                styles:{
                  fontStyle: 'bold',
                  lineWidth: 0.5, // Grosor del borde
                  lineColor: [0, 0, 0],
                  halign: 'center',
                  valign: 'middle',
                  fontSize: 8,
                }
            },{
              content:data[i][Object.keys(data[i])[0]],
                styles:{
                  fontStyle: 'bold',
                  lineWidth: 0.5, // Grosor del borde
                  lineColor: [0, 0, 0],
                  halign: 'center',
                  valign: 'middle',
                  fontSize: 8,
                }
            }]
          ]
        })
        doc.autoTable({
          head: [
            [
              {
                rowSpan: 2,
                content: "N°",
                styles: styles
              }, 
              {
                rowSpan:2,
                content:"O/C",
                styles: styles
              }, 
              {
                colSpan:2,
                content:'ENTRADA',
                styles: styles
              },{
                colSpan:2,
                content:'SALIDA',
                styles: styles
              },{
                rowSpan:2,
                content:"STOCK",
                styles: styles
              }, {
                rowSpan:2,
                content:"PEDIDO POR",
                styles: styles
              }, {
                rowSpan:2,
                content:"CARGO",
                styles: {...styles,cellWidth:50}
              }, {
                rowSpan:2,
                content:"FIRMA",
                styles: styles
              },{
                rowSpan:2,
                content:"OBSERVACIONES",
                styles: styles
              }],
            [ 
              {
                content:"FECHA",
                styles: styles
              },{
                content:"CANTIDAD",
                styles: styles
              },{
                content:"FECHA",
                styles: styles
              },{
                content:"CANTIDAD",
                styles: styles
              }]
          ],
          body: arr,
          didDrawRow: function(data) {
            // Formatear la fila 5
            if (data.row.index === (arr.length-2)) {
              data.row.styles.fillColor = '#F1C40F';
              data.row.styles.textColor = '#F1C40F';
            }
          },
        
        });
        //final de hoja
        styles={
          halign: 'center',
          lineWidth: 0.5, // Grosor del borde
          lineColor: [0, 0, 0] // Color del borde (
        }
        let styles2={
          halign: 'center',
          lineWidth: 0.5, // Grosor del borde
          lineColor: [0, 0, 0], // Color del borde (
          cellHeight: 30
        }
        doc.autoTable({
          startY: doc.internal.pageSize.height - 50,
          head: [[
            {
              content:'RESIDENTE DE OBRA',
              styles:styles
            },{
              content:'SUPERVISOR DE OBRA',
              styles:styles
            },{
              content:'ALMACENERO DE OBRA',
              styles:styles
            },{
              content:'',
              styles:{...styles,cellWidth:65}
            }]],
          body: [[{
            content:'\n\n\n\n',
            styles:styles2
          },{
            content:'',
            styles:styles2
          },{
            content:'',
            styles:styles2
          } ,{
            content:'',
            styles:styles2
          }]]
        });
        page++;
      }
    }
    doc.save("formato.pdf");
  }

  const handleInput=(e)=>{
    const namei=
    setFormi({...formi,[e.target.name]:e.target.value})
  }
  return (
    <div className="max-h-fit max-w-fit">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto my-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Obra
          </label>
          <input name="obra" value={formi.obra || ""} onChange={handleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Entidad Ejecutora
          </label>
          <input name="uejecutora" value={formi.uejecutora || ""} onChange={handleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Modalidad de ejecución
          </label>
          <input name="modejecucion" value={formi.modejecucion || ""} onChange={handleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Almacenero de obra
          </label>
          <input name="almacenero" value={formi.almacenero || ""} onChange={handleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required/>
        </div>
        <div className="mb-4">
          <div className="flex flex-row">
            <div className="basis-1/2  mr-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Desde
              </label>
              <input name="fechai" value={formi.fechai || ""} onChange={handleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" required/>
            </div>
            <div className="basis-1/2 ml-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hasta
              </label>
              <input name="fechaf" value={formi.fechaf || ""} onChange={handleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" required/>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pedido por
          </label>
          <input name="pedidopor" value={formi.pedidopor || ""} onChange={handleInput}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cargo
          </label>
          <input name="cargo" value={formi.cargo || ""} onChange={handleInput} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Excel
          </label>
          <input
          id="file-upload"
          type="file"
          name="file"
          className="border rounded-md p-2 text-center"
          accept=".xlsx, .xls"
          onChange={handleChange}
          required
        />
        </div>
        {data.length>0?<button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">Generar</button>:""}
      </form>
    </div>
  );
}