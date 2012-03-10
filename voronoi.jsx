﻿//  voronoi.jsx//  draws voronoi diagrams in illustrator//  using the javascript port from//  gorhill --> https://github.com/gorhill //  you can find the code here://  https://github.com/gorhill/Javascript-Voronoi//  the illustrator usage can be found here://  https://github.com/fabiantheblind/Javascript-Voronoi//  the direct download is here: //  https://github.com/fabiantheblind/Javascript-Voronoi/zipball/master//~ Copyright (c)  2012 Fabian "fabiantheblind" Morón Zirfas//~ Permission is hereby granted, free of charge, to any person obtaining a copy of this//~ software and associated documentation files (the "Software"), to deal in the Software //~ without restriction, including without limitation the rights to use, copy, modify, //~ merge, publish, distribute, sublicense, and/or sell copies of the Software, and to //~ permit persons to whom the Software is furnished to do so, subject to the following //~ conditions://~ The above copyright notice and this permission notice shall be included in all copies //~ or substantial portions of the Software.//~ THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, //~ INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A //~ PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT //~ HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF //~ CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE //~ OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.//~ see also http://www.opensource.org/licenses/mit-license.php#include "rhill-voronoi-core.js"main();function main(){  var sites = [{x:300,y:300}, {x:100,y:100}, {x:200,y:500}, {x:250,y:450}, {x:500,y:150}];  // xl, xr means x left, x right  // yt, yb means y top, y bottom  var bbox = {xl:0, xr:800, yt:0, yb:600};  var voronoi = new Voronoi();  // pass an object which exhibits xl, xr, yt, yb properties. The bounding  // box will be used to connect unbound edges, and to close open cells  result = voronoi.compute(sites, bbox);  $.writeln (util_insepct_properties(result.cells[0].site));  // render, further analyze, etc.  //~  draw_cells (result);draw_edges (result);}function draw_edges(result){         var edges = new Array();for(var i in result.edges){     var pt = new Array();//~ var cell = result.cells[i];//~    //~     for(var j in cell.halfedges){//~         var halfedge = cell.halfedges[j];//~         //~ try{  var lSite = new Array(halfedge.edge.lSite.x,halfedge.edge.lSite.y);}catch(e){}//~ try{  var rSite = new Array(halfedge.edge.rSite.x,halfedge.edge.rSite.y);}catch(e){}//~  try{        var va = new Array(result.edges[i].va.x, result.edges[i].va.y);  var vb = new Array(result.edges[i].vb.x, result.edges[i].vb.y);    pt.push(new Array(va[0],va[1]));  pt.push(new Array(vb[0],vb[1]));  edges.push({"path":pt});//~ }catch(e){}//~   //~   pt.push(new Array(lSite[0],lSite[1]));//~   pt.push(new Array(rSite[0],rSite[1]));//~   }//~ cells.push({"path":pt});  }var docPreset = new DocumentPreset;docPreset.units = RulerUnits.Pixels;docPreset.width = 800;docPreset.height = 600;var doc = app.documents.addDocument("newFile",docPreset);//~   //~ var doc = app.documents.add(//~                 DocumentColorSpace.RGB,//~                 cm2pt (80),//~                 cm2pt (60),//~                 1,//~                 DocumentArtboardLayout.GridByRow,//~                 20.0,//~                 3);//~ alert(edges.length);for(var k in edges){var path = doc.pathItems.add();  path.setEntirePath(edges[k].path);  }var diam = 3;for(var l in result.cells){    var top = -result.cells[l].site.y;    var left = result.cells[l].site.x;        var ell = doc.pathItems.ellipse( -top + diam/2, left -diam/2, diam, diam, true,true );    }//~            }//~ function draw_cells(result){//~     var cells = new Array();//~ for(var i in result.cells){//~ var cell = result.cells[i];//~  var pt = new Array();//~    //~     for(var j in cell.halfedges){//~         var halfedge = cell.halfedges[j];        try{  var lSite = new Array(halfedge.edge.lSite.x,halfedge.edge.lSite.y);}catch(e){}try{  var rSite = new Array(halfedge.edge.rSite.x,halfedge.edge.rSite.y);}catch(e){}//~ try{  var va = new Array(halfedge.edge.va.x,halfedge.edge.va.y);}catch(e){}//~ try{  var vb = new Array(halfedge.edge.vb.x,halfedge.edge.vb.y);}catch(e){} //~     pt.push(new Array(lSite[0],lSite[1]));  pt.push(new Array(rSite[0],rSite[1]));//~   pt.push(new Array(va[0],Math.abs(va[1])));//~   pt.push(new Array(vb[0],Math.abs(vb[1])));//~   }//~ cells.push({"path":pt});//~   }//~   //~ var doc = app.activeDocument;//~ for(var k in cells){//~ var path = doc.pathItems.add();//~   path.setEntirePath(cells[k].path);//~   }//~     //~     }function cm2pt(val){    var result = val * 28.346;    return result;    }// the functions below are// by Peter the Magnificant Kahrel// http://www.kahrel.plus.com/indesign/scriptui.htmlfunction  util_insepct_properties (f) {$.writeln (f.reflect.name);var props = f.reflect.properties;var array = [];for (var i = 0; i < props.length; i++)try {array.push (props[i].name + ": " + f[props[i].name])} catch (_){} array.sort ();$.writeln (array.join ("\r"));}function util_inspect_methods (m) {var props = m.reflect.methods.sort(); $.writeln ("\rMethods");for (var i = 0; i < props.length; i++)$.writeln (props[i].name);}