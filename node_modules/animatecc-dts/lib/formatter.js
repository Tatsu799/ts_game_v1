/**
 * Output a typed definition file from the simplified model (see model.js)
 */

var easeljs = { MovieClip:true, Sprite:true, Container:true, Shape:true, Bitmap:true, Rectangle:true, Text:true, Shadow:true };


function formatTypescript(model, options) {

  var out = "";
  var known = {};

  for(var i in model.classes) {
    var classDef = model.classes[i];
    var cname = classDef.name;
    known[cname] = true;
  }

  function safeType(cname, useNamespace) {
    cname = cname.split(".").pop();
    if (useNamespace && easeljs[cname]) return options.namespace + "." + cname;
    else return cname;
  }

  out += "\texport class properties implements Object {\n"
    + "\t\tstatic width: number;\n"
    + "\t\tstatic height: number;\n"
    + "\t\tstatic fps: number;\n"
    + "\t\tstatic color: string;\n"
    + "\t\tstatic manifest: Object[];\n"
    + "\t}\n\n";

  for(var i in model.classes) {
    var classDef = model.classes[i];

    var cname = safeType(classDef.name, false);
    var bname = safeType(classDef.base, true);
    if (easeljs[bname]) bname = options.namespace + "." + bname;

    out += "\texport class " + cname + " extends " + bname + " {\n";

    if (classDef.bounds) {
      out += "\t\tstatic nominalBounds: " + options.namespace + ".Rectangle;\n";
    }

    for(var j in classDef.children) {
      var child = classDef.children[j];
      var ctype = safeType(child.type, true);
      out += "\t\t" + child.name + ": " + ctype + ";\n";
    }
    out += "\t}\n\n";
  }

  out = "/// <reference path=\"" + options.reference + "\" />\n\n"
    + "declare module " + model.namespaces[0] + " {\n\n"
    + out
    + "}\n";
  return out;
}

module.exports = formatTypescript;
