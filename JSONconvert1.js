
var fs=require("fs");
var readline = require('readline');


var file1=fs.createWriteStream('mafe.json');
file1.readable=true;
file1.writable=true;


var file2=fs.createWriteStream('total.json');
file2.readable=true;
file2.writable=true;



var rl = readline.createInterface({
    input: fs.createReadStream('Indicators.csv')
  });


var Asian_C = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];

var countryIndex,IndicatorNameIndex,yearIndex;
var coloumnamearray=[];//storing headings
var finalarray=[];
    var i=0;


      var mf=[];//male and female
	  var tot=[];//total years

    rl.on('line', function (line) {

     /*---------------------------for frst line----------------------------------------------------*/
     if(i===0)
     {

       coloumnamearray=line.split(",");
        countryIndex=coloumnamearray.indexOf("CountryName");
        IndicatorNameIndex=coloumnamearray.indexOf("IndicatorName");
        yearIndex=coloumnamearray.indexOf("Year");
      // console.log(countryIndex);
      // console.log(IndicatorNameIndex);
       //console.log(yearIndex);


       i=i+1;


     }
     else {
    var line1=[];//for storing rows from 2

    var lineInfo=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);


    lineInfo.forEach(function(string)
     {

     line1.push(string.replace(/['"]+/g, ''));

    });


 var obj={};
  var obj1={};
  //console.log(line1[2]);
  for(var k=0;k<Asian_C.length;k++)
  {
    if(line1[countryIndex]===Asian_C[k])
    {
      if((line1[yearIndex]>=1960)&&(line1[yearIndex]<=2015))
      {


        if((line1[IndicatorNameIndex]==="Life expectancy at birth, male (years)")||(line1[IndicatorNameIndex]==="Life expectancy at birth, female (years)"))
        {

            for(var j=0;j<coloumnamearray.length;j++)
            {
              obj[coloumnamearray[j]]=line1[j];

            }

           mf.push(obj);
             //console.log(brr);

        }



    }
  }
}//end of for
for(var k=0;k<Asian_C.length;k++)
  {
    if(line1[countryIndex]===Asian_C[k])
    {
      if((line1[yearIndex]>=1960)&&(line1[yearIndex]<=2015))
      {


        if((line1[IndicatorNameIndex]==="Life expectancy at birth, total (years)"))
         {

           for(var j=0;j<coloumnamearray.length;j++)
            {
              obj1[coloumnamearray[j]]=line1[j];
            }
            tot.push(obj1);



      }
    }
  }

}//end of for
}//end of else
}//end of function
).on('close', () => {
var mf1=[];//male female values
for (var i =1960; i < 2016; i++)
{
  var male=0;
  var female=0;
  var ma=0;var fe=0;
  for(var z=0;z<mf.length;z++)
  {
    if(parseFloat(mf[z].Year)===i)
    {
      if(mf[z].IndicatorName=="Life expectancy at birth, female (years)")
      {
        female=female+parseFloat(mf[z].Value);
        fe++;
      }
      else
      {
        male=male+parseFloat(mf[z].Value);
        ma++;
      }
    }
  }//inner for
  //console.log("jiiiiiiiiiiiii");
  mf1.push({"year":i,"female":parseFloat(female/fe),"male":parseFloat(male/ma)});
}//end of for

//console.log(brr1);
file1.write(JSON.stringify(mf1));
//  console.log(brr1);
var tot1=[];//for total values of countries
for (var i = 0; i < Asian_C.length; i++)
{

  var name1=Asian_C[i];
  var c2=0;
  var c3=0;
  //console.log(arr.length);
  for (var k = 0; k < tot.length; k++)
   {
   if(name1===(tot[k].CountryName))
    {

      c2 += parseFloat(tot[k].Value);
      c3++;

  }
}

  tot1.push({"countryName":name1,"total":parseFloat(c2)/c3});


} //end of for
tot1.sort(function(obj1, obj2) {
	// Ascending: first age less than the previous
	return obj2.total - obj1.total;
});
var tot2=[];
for(var i=0;i<5;i++)
{
	tot2[i]=tot1[i];
}
file2.write(JSON.stringify(tot2));
// console.log(arr2);
});//end of close function
