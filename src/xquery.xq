let $df := "Ljubljana" 
let $dt := "Slovenska Bistrica" 
let $d := "2019-03-27" 
(:
  $df, $dt and $d will be pushed on top by the script.bat
:)

let $f := fn:encode-for-uri($df)
let $fc := "SI"
let $t := fn:encode-for-uri($dt)
let $tc := "SI"
let $exact := "false"
let $intl := "false"

let $request :=  ("?f=" || $f || "&amp;fc=" || $fc || "&amp;t=" || $t || "&amp;tc=" ||$tc || "&amp;d=" || $d || "&amp;exact=" || $exact || "&amp;intl=" || $intl)

let $response := http:send-request(<http:request method='get' status-only='false'/>,
                                   "https://prevoz.org/api/search/shares/" || $request)

let $prevozi := $response/json/*
let $prevozi := 
   for $prevoz at $i in $prevozi//_
   order by xs:time(substring(data($prevoz/time) || ":00", 4))
   return $prevoz
   
let $doctype := "<!DOCTYPE html>"
return  
        <html>
          
          <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" type="text/css" href="styles.css"/>
          </head>
          <body>
            <header>
              <from>{$df}</from>
              <to>{$dt}</to>
              <date>{$d}</date>
            </header>
            <data>
              {for $prevoz at $i in $prevozi
              return <div class = "prevoz" id = "{$i}">
                        <author>{data($prevoz/author)}</author>
                        <price>{data($prevoz/price)}💶</price>
                        <time>{substring(data($prevoz/date || " "), 6)} {substring(data($prevoz/time), 4)} 🕞 </time>
                        <route>{data($prevoz/from)} 🔜 {data($prevoz/to)}</route>
                        <tel>{data($prevoz/contact)}</tel>
                        {
                          let $car_data := data($prevoz/car__info)
                          return if($car_data = "") then ""
                                else <car_info>{$car_data}</car_info>
                        }
                        <comment>{data($prevoz/comment)}</comment>
                      </div>
              }
            </data>
         </body>
       </html>/*