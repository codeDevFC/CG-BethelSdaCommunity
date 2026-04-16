#!/bin/bash
OUTPUT="Project_Full_Analysis.txt"
echo "🚀 Generating Bethel SDA Project Analysis... please wait."
{
echo "========================================================="
echo "BETHEL SDA COMMUNITY PORTAL - FULL PROJECT ANALYSIS"
echo "Generated: $(date)"
echo "========================================================="
echo ""
echo "1. DIRECTORY STRUCTURE"
echo "---------------------------------------------------------"
tree -I 'node_modules|.next|.git|package-lock.json'
echo ""
echo "2. SOURCE CODE"
echo "---------------------------------------------------------"
Find files, excluding binaries and dependencies
find . -maxdepth 5 
-not -path '/.' 
-not -path './node_modules*' 
-not -path './.next*' 
-not -name 'package-lock.json' 
-not -name '.png' 
-not -name '.jpg' 
-not -name '.jpeg' 
-not -name '.ico' 
-not -name '.pdf' 
-type f ( -name ".ts" -o -name ".tsx" -o -name ".js" -o -name ".jsx" -o -name ".css" -o -name ".prisma" -o -name ".json" -o -name ".env.example" ) 
-exec echo "---------------------------------------------------------" ; 
-exec echo "FILE: {}" ; 
-exec echo "---------------------------------------------------------" ; 
-exec cat {} ; 
-exec echo -e "\n\n" ;
} > "$OUTPUT"
echo "✅ Done! Full analysis saved to: $OUTPUT"
