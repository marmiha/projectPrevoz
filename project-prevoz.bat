@echo off
SET /P from=From: 
SET /P to=To: 
SET /P date=Date YYYY-MM-DD: 
SET htmlName=%from: =%-%to: =%-%date: =%
echo let $df := "%from%" > xquery.xq
echo let $dt := "%to%" >> xquery.xq
echo let $d := "%date%" >> xquery.xq
type template.xq >> xquery.xq
echo ^<!DOCTYPE html^> > %htmlName%.html
basex xquery.xq >> %htmlName%.html