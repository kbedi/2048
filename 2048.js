(function($) {
    var plugin = {
        addElement : function(elem){return document.createElement(elem)},
        tableau : [],
        t : [],
        nbr : 0,
        score : 0,
        scTab : [0],
        fin : false,
        final : 0,
        lose : false,
        lose2 : false,
        color : {" ": "#CECECE", 2: "#CECECE", 4:"#FFFF00", 8:"#EFD807", 16:"#DAB30A", 32:"#FF7F00", 64:"#F4661B", 128:"#E73E01", 256:"#C60800", 512:"#BB0B0B", 1024: "#E9383F", 2048:"#FF0000", 4096:"#000000"},

        init : function(){
            var title = plugin.addElement("h1");
            $("body")[0].appendChild(title);
            title.appendChild(document.createTextNode("Game 2048"));

            var divScore = plugin.addElement("div");
            divScore.setAttribute('id', 'divScore');
            divScore.appendChild(document.createTextNode("Votre score :"));

            a = plugin.addElement("a");
            a.setAttribute('href', 'index.html');
            a.setAttribute('id', 'a');
            a.setAttribute('class', 'btn btn-success');
            a.appendChild(document.createTextNode("Rejouer"));

            var donnees = plugin.addElement("div");
            donnees.setAttribute('id', 'donnees');

            var cadre = plugin.addElement("div");
            cadre.setAttribute('id', 'cadre');

            var myScore = plugin.addElement("div");
            myScore.setAttribute("id", "myScore");
            myScore.appendChild(document.createTextNode("O"));
            
            var message = plugin.addElement("div");
            message.setAttribute("id", "message");
            message.appendChild(document.createTextNode("?"));

            var tab = plugin.addElement("table"); 
            var tb = plugin.addElement("tbody"); 
            tab.appendChild(tb); 
            
            for(var i = 0; i < 4; i++){ 
                var tr = plugin.addElement("tr"); 
                for(var j = 0; j < 4; j++){ 
                    var td = plugin.addElement("td"); 
                    td.appendChild(document.createTextNode(" ")); 
                    tr.appendChild(td); 
                }
                tb.appendChild(tr); 
            }

            $("body")[0].appendChild(cadre);
            cadre.appendChild(divScore);
            cadre.appendChild(donnees);
            cadre.appendChild(tab);
            cadre.appendChild(message);
            cadre.appendChild(a);
            donnees.appendChild(myScore);
             
            for(i = 0; i < 16; i++){ 
                plugin.t.push(" ");
            }
            for(i = 0; i < 2; i++){ 
                plugin.nbr = Math.floor(Math.random()*16); 
                if(plugin.t[plugin.nbr] == " "){ 
                    plugin.t[plugin.nbr] = Math.random()>0.9 ? 4 : 2; 
                } 
                else{ 
                    i--;
                } 
            }

            //valeur/couleur des cases 
            for(i = 0; i < 16; i++){ 
                $("td")[i].firstChild.data = plugin.t[i]; 
                $("td")[i].style.backgroundColor = plugin.color[plugin.t[i]]; 
            } 
            document.onkeydown = plugin.keys; 
        },
        
        next : function(){
            plugin.scTab.push(plugin.score); 
             
            plugin.tableau = []; 
            for(i in plugin.t){ 
                if(plugin.t[i] == " "){ 
                    plugin.tableau.push(i) 
                } 
            }

            for(i in plugin.t){ 
                if(plugin.t[i] == 2048){
                    message.firstChild.data = "Bravo! Vous avez réussi!!"; 
                    message.style.visibility = "visible"; 
                    break;
                } 
            } 
            plugin.nbr = plugin.tableau[Math.floor(Math.random()*plugin.tableau.length)]; 
            plugin.t[plugin.nbr] = Math.random()>0.9 ? 4 : 2; 
            for(i in plugin.t){ 
                $("td")[i].firstChild.data = plugin.t[i]; 
                $("td")[i].style.backgroundColor = plugin.color[plugin.t[i]]; 
            }
        },

        space : function(keyCode){ 
            for(i = 4; i < 16; i++){ 
                if(keyCode == 38){ 
                    if(plugin.t[i] != " " && plugin.t[i-4] == " "){ 
                        plugin.t[i-4] = plugin.t[i]; 
                        plugin.t[i] = " ";	 
                        i = 4;					 
                    } 
                } 
                if(keyCode == 40){ 
                    if(plugin.t[i-4] != " " && plugin.t[i] == " "){ 
                        plugin.t[i] = plugin.t[i-4]; 
                        plugin.t[i-4] = " "; 
                        i = 4;						 
                    } 
                }
            } 
            for(i = 0; i < 16; i++){ 
                if(i % 4 != 0){ 
                    if(keyCode == 39){ 
                        if(plugin.t[i] == " "&& plugin.t[i-1] != " "){ 
                            plugin.t[i] = plugin.t[i-1];	 
                            plugin.t[i-1] = " ";	 
                            i = 0; 
                        } 
                    } 
                    if(keyCode == 37){ 
                        if(plugin.t[i-1] == " " && plugin.t[i] != " "){ 
                            plugin.t[i-1] = plugin.t[i];	 
                            plugin.t[i] = " ";	 
                            i = 0; 
                        } 
                    } 
                } 
            } 
        }, 

        keys : function(e){
            ev = (e) ? e.which : event.keyCode; 
            if(!plugin.fin){
                switch(ev){ 
                    default: 	break;
                    case 37:
                        var left; 
                        for(i in plugin.t){ 
                            if(i % 4 != 0){ 
                                if((plugin.t[i] != " " && plugin.t[i-1] == " ") || (plugin.t[i] != " " && plugin.t[i-1] == plugin.t[i])) { 
                                    left = true; 
                                    break;
                                } 
                            } 
                        } 
                        if(left == true){
                            plugin.space(37); 
                            for(i = 0; i < 16; i++){ 
                                if(i % 4 != 0){ 
                                    if(plugin.t[i] != " " && plugin.t[i] == plugin.t[i-1]){ 
                                        plugin.t[i-1] = parseInt(plugin.t[i])*2; 
                                        plugin.t[i] = " "; 
                                        plugin.score += parseInt(plugin.t[i-1]); 
                                        myScore.firstChild.data = plugin.score; 
                                    }
                                } 
                            }
                            plugin.space(37); 
                            plugin.next(); 
                        }
                        plugin.over(); 
                        return false;
                        
                    case 38: 
                        var top; 
                        for(i = 4; i < 16; i++){ 
                            if((plugin.t[i] != " " && plugin.t[i-4] == " ") || (plugin.t[i] != " " && plugin.t[i] == plugin.t[i-4])){ 
                                top = true; 
                                break;
                            } 
                        } 
                        if(top == true){ 
                            plugin.space(38);	 
                            for(i = 4; i < 16; i++){ 
                                if(plugin.t[i] != " " && plugin.t[i] == plugin.t[i-4]){ 
                                    plugin.t[i-4] = parseInt(plugin.t[i])*2; 
                                    plugin.t[i] = " "; 
                                    plugin.score += parseInt(plugin.t[i-4]);	 
                                    myScore.firstChild.data = plugin.score;					 
                                }; 
                            }; 
                            plugin.space(38); 
                            plugin.next();
                        }; 
                        plugin.over(); 
                        return false;

                    case 39: 
                        var right; 
                        for(i in plugin.t){ 
                            if(i % 4 != 0){ 
                                if((plugin.t[i-1] != " " && plugin.t[i] == " ") || (plugin.t[i-1] != " " && plugin.t[i-1] == plugin.t[i])) { 
                                    right = true; 
                                    break; 
                                } 
                            } 
                        } 
    
                        if(right == true){				 
                            plugin.space(39); 
                            for(i = 15; i > -1; i--){ 
                                if(i % 4 != 0){ 
                                    if( plugin.t[i-1] !=" " && plugin.t[i] == plugin.t[i-1]){ 
                                        plugin.t[i] = parseInt(plugin.t[i-1])*2; 
                                        plugin.t[i-1]=" "; 
                                        plugin.score += parseInt(plugin.t[i]); 
                                        myScore.firstChild.data = plugin.score; 
                                    }
                                } 
                            }
                            plugin.space(39); 
                            plugin.next(); 
                        }
                        plugin.over(); 
                        return false; 
    
                    case 40:  
                        var bottom; 
                        for(i = 4; i < 16; i++){ 
                            if((plugin.t[i-4] != " " && plugin.t[i] == " ") || (plugin.t[i] != " " && plugin.t[i] == plugin.t[i-4])){ 
                                bottom = true; 
                            } 
                        } 
                        if(bottom == true){	 
                            plugin.space(40); 
                            for(i = 15; i > 3; i--){ 
                                if(plugin.t[i] != " " && plugin.t[i] == plugin.t[i-4]){ 
                                    plugin.t[i] = parseInt(plugin.t[i-4])*2; 
                                    plugin.t[i-4] = " "; 
                                    plugin.score += parseInt(plugin.t[i]);	 
                                    myScore.firstChild.data = plugin.score;					 
                                }; 
                            }; 
                            plugin.space(40); 
                            plugin.next(); 
                        }; 
                        plugin.over(); 
                        return false;  
                } 
            } 
        },

        over : function(){  
                plugin.lose = false; 
                plugin.lose2 = false; 
                for(i in plugin.t){ 
                    if(plugin.t[i] == " "){ 
                        plugin.lose = true; 
                        break;
                    } 
                }
                if(!plugin.lose){ 
                    for(i = 0; i < 16; i++){ 
                        if(i % 4 != 0){ 
                            if(plugin.t[i] == plugin.t[i-1]){ 
                                plugin.lose2 = true; 
                                break;
                            }
                        } 
                    } 
                    for(i = 4; i < 16; i++){ 
                        if(plugin.t[i] == plugin.t[i-4]){ 
                            plugin.lose2 = true; 
                            break;
                        }
                    }
                    if(!plugin.lose2){  
                        plugin.fin = true; 
                        plugin.final++; 
                        for(i = 0; i < 16; i++) { 
                            if(plugin.final % 2 == 1){
                                a.style.visibility = "visible";
                            }
                        } 			 
                    }
                }
        }
    };

        
    $.fn.myPlugin = function(method) {
        if (plugin[method]) 
        {
            return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } 
        else if (typeof method === 'object' || ! method) 
        {
            return plugin.init.apply(this, arguments);
        } 
        else 
        {
            $.error('Method: ' +  method + ' introuvable dans votre plugin');
        }    
    };
}(jQuery));